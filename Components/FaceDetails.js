import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Button,
} from 'react-native';
import * as colors from '../Utils/color';
import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  FACELIST_NAME,
} from '../Utils/Constants';
import React, {Component, useState} from 'react';
import {ADD_FACES_STORE} from '../Mobx/ADD_FACES_STORE';

import Icon from 'react-native-vector-icons/FontAwesome';

import Line from '../Components/Line';
import Requestor from '../Lib/Requestor';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import PagerView from 'react-native-pager-view';
import {wrap} from 'lodash';

const FaceDetails = () => {
  const [user_data, setUserData] = useState({
    fn: '',
    ln: '',
    alias: '',
    age: '',
    sex: '',
    nat: '',
    //aID: '1200 1200 1200 1200',
    //pID: 'AYR346Q34K',
    marks: '',
    sev: 0,
    ch: 0,
    wa: 0, //Number of Outstanding Warrent
    co: 0, //Number of conviction
    ar: 0, //Number of arrests
    fl: '', //Has flight risk
    height: '',
    weight: '',
    com: '',
    eye: '',
    p1: 'https://www.filmibeat.com/img/popcorn/profile_photos/silambarasan-20210414152430-3748.jpg',
    p2: 'https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1645696154.jpg',
    p3: 'https://igimages.gumlet.io/tamil/home/simbu-11122021a.jpg?w=376&dpr=2.6',
    cs: 'https://coimages.sciencemuseumgroup.org.uk/images/155/194/medium_1991_5083_0004.jpg',
    pid: 0,
  });

  const updateState = (key, value) => {
    //alert(key);
    setUserData(oldState => ({
      ...oldState,
      [key]: value,
    }));
  };

  let options = {
    title: 'Select Photo',
    takePhotoButtonTitle: 'Take Photo...',
    chooseFromLibraryButtonTitle: 'Choose from Library...',
    cameraType: 'back',
    mediaType: 'photo',
    maxWidth: 480,
    quality: 1,
    noData: false,
    includeBase64: true,
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        LaunchCam();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const LaunchCam = async () => {
    launchCamera(options, res => {
      console.log('Response = ', JSON.stringify(res).substring(1, 200));
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        console.log('response uritest', res.assets[0].uri);
        console.log('test', JSON.stringify(res.assets[0]).substring(1, 200));

        FACE_STORE.setName(name);
        FACE_STORE.setPhotoData(res.assets[0].base64);
        FACE_STORE.setURI({uri: res.assets[0].uri});
        AddFaceToFaceList();
      }
    });
  };

  const createFaceList = () => {
    Requestor.request(
      API_BASE_URL + 'face/v1.0/facelists/' + PERSON_GRP_ID + '/persons',
      'POST',
      API_KEY,
      JSON.stringify(FACELIST_NAME),
    ).then(function (res) {
      alert('Face List Created!');
      console.log(JSON.stringify(res));
    });
  };

  const AddFaceToFaceList = () => {
    //parole officer id
    //filename: FACE_STORE.getURI,
    //photo_data: FACE_STORE.getPhotoData,

    let data = {
      name: user_data.fn + ' ' + user_data.ln,
      userData: JSON.stringify(user_data),
    };
    console.log('data sent:', JSON.stringify(data));
    Requestor.request(
      API_BASE_URL + '/face/v1.0/persongroups/' + PERSON_GRP_ID + '/persons',
      'POST',
      API_KEY,
      JSON.stringify(data),
    )
      .then(res => {
        console.log('response addface', JSON.stringify(res));
        // console.log('response last');
        let personId = res.personId;
        AddFace(personId, user_data.p1);
        AddFace(personId, user_data.p2);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  const AddFace = (personId, url) => {
    let data = {
      url: url,
    };

    Requestor.request(
      API_BASE_URL +
        '/face/v1.0/persongroups/' +
        PERSON_GRP_ID +
        '/persons/' +
        personId +
        '/persistedFaces',
      'POST',
      API_KEY,
      JSON.stringify(data),
    )
      .then(res_addFace => {
        console.log('response create face', JSON.stringify(res_addFace));
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.textPageHeader}>Personal Details</Text>
          </View>
          <View style={[styles.viewRow]}>
            <View style={[styles.viewColumn]}>
              <Text style={styles.textHeader}>First Name: </Text>
              <TextInput
                style={styles.text_input1}
                onChangeText={val => updateState('fn', val)}
              />
            </View>
            <View style={styles.viewColumn}>
              <Text style={styles.textHeader}>Last Name: </Text>
              <TextInput
                style={styles.text_input1}
                onChangeText={val => updateState('ln', val)}
              />
            </View>
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Alias: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('alias', val)}
            />
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Age/Sex: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('age', val)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.text_input1}
              onChangeText={val => updateState('sex', val)}
            />
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Nationality: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('nat', val)}
            />
          </View>
          <View style={styles.text_input}>
            <Text style={styles.textHeader}>Crime Index: </Text>
            <TextInput
              style={styles.text_inputNum}
              onChangeText={val => updateState('cr', val)}
              keyboardType="numeric"
            />
          </View>
          <Icon
            style={[styles.textHeader, {color: '#ffffff'}]}
            name="id-badge"
            onPress={() => {
              Linking.openURL(FACE_STORE.getFaceData.cs);
            }}>
            Charge sheet
          </Icon>
        </View>
      </View>
      <View key="2">
        <View style={[styles.viewColumn]}>
          <View style={styles.card}>
            <Text style={styles.textPageHeader}>Personal Details</Text>
          </View>
          <View style={[styles.viewRow]}>
            <Text style={styles.textHeader}>Identification Marks: </Text>
            <TextInput
              style={[styles.text_input, {height: 100}]}
              onChangeText={val => updateState('marks', val)}
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Height: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('height', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Weight: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('weight', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Eye Color: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('eye', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Complexion: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('Com', val)}
            />
          </View>
        </View>
      </View>
      <View key="3">
        <View style={[styles.viewColumn]}>
          <View style={styles.card}>
            <Text style={styles.textPageHeader}>Personal Details</Text>
          </View>
          <View style={[styles.viewRow]}>
            <Text style={styles.textHeader}>Charges: </Text>

            <TextInput
              style={styles.text_inputNum}
              onChangeText={val => updateState('cg', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Arrests: </Text>
            <TextInput
              style={styles.text_inputNum}
              onChangeText={val => updateState('ar', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Conviction: </Text>
            <TextInput
              style={styles.text_inputNum}
              onChangeText={val => updateState('co', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Outstanding Warrents: </Text>
            <TextInput
              style={styles.text_inputNum}
              onChangeText={val => updateState('wa', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Flight Risk: </Text>
            <TextInput
              style={styles.text_inputNum}
              onChangeText={val => updateState('fl', val)}
            />
          </View>
        </View>
      </View>
      <View key="4">
        <View style={[styles.viewColumn]}>
          <View style={styles.card}>
            <Text style={styles.textPageHeader}>URL of picture</Text>
          </View>
          <View style={[styles.viewRow]}>
            <Text style={styles.textHeader}>Picture 1: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('p1', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Picture 2: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('p2', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Picture 3: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('p3', val)}
            />
          </View>
        </View>
      </View>
      <View key="5">
        <View style={[styles.viewColumn]}>
          <View style={styles.card}>
            <Text style={styles.textPageHeader}>Charge Sheet</Text>
          </View>

          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Link: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('cs', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Button
              containerStyle={styles.button}
              onPress={AddFaceToFaceList}
              title="Submit"
            />
          </View>
          <View style={styles.viewRow}>
            <Button
              containerStyle={styles.button}
              onPress={AddFaceToFaceList}
              title="Submit"
            />
          </View>
          <View style={styles.viewRow}>
            <Button
              containerStyle={styles.button}
              onPress={AddFaceToFaceList}
              title="Train"
            />
          </View>
        </View>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 5,
  },
  image: {
    width: '100px',
    marginRight: '5',
    height: '200px',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  button: {
    padding: 0,
    margin: 20,
    height: 45,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  text_input: {
    marginLeft: 5,
    height: 30,
    margin: 7,
    borderWidth: 1,
    padding: 2,
    borderColor: colors.TextBoxColor,
    color: colors.TextBoxColor,
    borderRadius: 8,
    borderColor: 'gray',

    width: 150,
  },
  text_input1: {
    marginLeft: 5,
    height: 40,
    margin: 7,
    borderWidth: 1,
    padding: 2,
    borderColor: colors.TextBoxColor,
    color: colors.TextBoxColor,
    borderRadius: 8,
    width: '100%',
  },
  card: {
    marginVertical: 3,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.Card,
    borderRadius: 8,
    elevation: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },

  text_inputNum: {
    height: 30,
    margin: 7,
    borderWidth: 1,
    padding: 2,
    borderColor: 'gray',
    color: colors.TextHeaderColor,
    width: 70,
  },

  textPageHeader: {
    color: colors.TextHeaderColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
    width: 100,
    color: colors.TextHeaderColor,
  },
  textHeader: {
    fontWeight: '500',
    fontSize: 13,
    marginTop: 5,
    width: 100,
    color: colors.TextHeaderColor,
  },
  text: {
    fontWeight: '500',
    fontSize: 12,
    marginTop: 5,
    color: colors.TextColor,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  viewColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 5,
    paddingBottom: 5,
  },

  viewRow: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  pagerView: {
    flex: 1,
    backgroundColor: colors.BackgroundColor,
  },
});

export default FaceDetails;
//AppRegistry.registerComponent('RNSimilar', () => RNSimilar);
