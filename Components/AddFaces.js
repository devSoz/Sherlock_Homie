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
import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  FACELIST_NAME,
} from '../Utils/Constants';
import React, {Component, useState} from 'react';
import {FACE_STORE} from '../Mobx/FACE_STORE';

import Requestor from '../Lib/Requestor';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';

const AddFaces = () => {
  const [name, setName] = useState('');

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
    var user_data = {
      fn: 'Saddam',
      ln: 'hussein',
      alias: 'Sad-hus',
      age: '70',
      sex: 'M',
      nat: 'Pakistan',
      //aID: '1200 1200 1200 1200',
      //pID: 'AYR346Q34K',
      marks: 'Mole on left hand index finger, scar on the left cheek',
      sev: 9,
      ch: 2,
      wa: 1, //Number of Outstanding Warrent
      co: 1, //Number of conviction
      ar: 1, //Number of arrests
      fl: 1, //Has flight risk
      height: '5.11 ft',
      weight: '89 kg',
      com: 'wheatish -brown',
      eye: 'black',
      p1: 'https://cdn.britannica.com/30/126130-004-89F2E69C.jpg',
      p2: 'https://www.thefamouspeople.com/profiles/images/saddam-hussein-26.jpg',
      p3: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Saddam_Hussein_in_1998.png/411px-Saddam_Hussein_in_1998.png',
      cs: 'https://i.pinimg.com/736x/9d/08/b3/9d08b3076b91ccd3b9c4bf06fc017a89.jpg',
      pid: 101, //parole officer id
      //filename: FACE_STORE.getURI,
      //photo_data: FACE_STORE.getPhotoData,
    };
    let data = {
      name: user_data.fn + ' ' + user_data.ln,
      userData: JSON.stringify(user_data),
    };
    console.log('userdata:', JSON.stringify(data));
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
    <ScrollView>
      <View style={styles.container}>
        <Button
          containerStyle={styles.button}
          onPress={createFaceList}
          title="Create face list"
        />

        <Image source={FACE_STORE.getURI} resizeMode={'contain'} />

        <Button
          containerStyle={styles.button}
          onPress={requestCameraPermission}
          title="Add Face"
        />

        <TextInput
          style={styles.text_input}
          onChangeText={name => setName(name)}
          value={name}
          placeholder={'Name'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    margin: 20,
    height: 45,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  text_input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddFaces;
//AppRegistry.registerComponent('SimilarFaces', () => SimilarFaces);
