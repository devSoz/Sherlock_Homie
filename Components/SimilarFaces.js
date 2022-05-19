import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Linking,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import LoaderPage from '../Components/LoadingScreen';
import StartingPage from '../Components/StartingPage';
import {observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  FACELIST_NAME,
} from '../Utils/Constants';
import Line from '../Components/Line';
import React, {Component, useState} from 'react';
import {FACE_STORE} from '../Mobx/FACE_STORE';
import Requestor from '../Lib/Requestor';
import {launchCamera} from 'react-native-image-picker';
import * as colors from '../Utils/color';
import LoadingScreen from '../Components/LoadingScreen';

const SimilarFaces = observer(() => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [Similar_photo, setSimilar_photo] = useState('');
  //FACE_STORE.setIsStart(true);

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
      //FACE_STORE.setIsLoading(true);
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
        FACE_STORE.setIsLoading(false);
      }
    } catch (err) {
      alert(JSON.stringify(err));
      FACE_STORE.setIsLoading(false);
    }
  };

  const LaunchCam = async () => {
    launchCamera(options, res => {
      console.log('loading = ', FACE_STORE.getIsLoading);
      if (res.didCancel) {
        console.log('User cancelled image picker');
        FACE_STORE.setIsStart(true);
      } else if (res.error) {
        FACE_STORE.setIsStart(true);
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        FACE_STORE.setIsStart(true);
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        FACE_STORE.setName(name);
        FACE_STORE.setPhotoData(res.assets[0].base64);
        FACE_STORE.setURI({uri: res.assets[0].uri});
        FACE_STORE.setIsStart(false);
        FACE_STORE.setIsLoading(true);
        getSimilarFace();
      }
      //FACE_STORE.setIsLoading(false);
    });
  };

  const showMessage = message => {
    Alert.alert(
      'Sherlock-Homie',
      message,
      [
        {
          text: 'Ok',
          onPress: () => {
            FACE_STORE.setIsStart(true);
            FACE_STORE.setIsLoading(false);
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  const detectImage = () => {
    FACE_STORE.reset();
    console.log('start after btn', JSON.stringify(FACE_STORE.getIsStart));
    requestCameraPermission();
  };
  const getSimilarFace = async () => {
    Requestor.upload(
      API_BASE_URL + '/face/v1.0/detect',
      API_KEY,
      FACE_STORE.getPhotoData,
    ).then(facedetect_res => {
      console.log('response detect' + JSON.stringify(facedetect_res));
      if (JSON.stringify(facedetect_res) == '[]') {
        showMessage('No face detected');
      } else {
        let face_id = facedetect_res[0].faceId;

        let faceIdList = [face_id];
        let data = {
          personGroupId: 'persongrp_2', //PERSON_GRP_ID,
          faceIds: faceIdList,
          maxNumOfCandidatesReturned: 1,
        };
        console.log('faceid', JSON.stringify(data));
        Requestor.request(
          API_BASE_URL + '/face/v1.0/identify',
          'POST',
          API_KEY,
          JSON.stringify(data),
        )
          .then(similarfaces_res => {
            console.log('similar ', JSON.stringify(similarfaces_res));
            if (JSON.stringify(similarfaces_res[0].candidates) == '[]') {
              showMessage('Face not found in the criminal database');
            } else {
              let similar_face = similarfaces_res[0].candidates[0].personId;
              console.log('similar ', JSON.stringify(similar_face));
              Requestor.request(
                API_BASE_URL +
                  '/face/v1.0/persongroups/' +
                  'persongrp_2' +
                  '/persons/' +
                  similarfaces_res[0].candidates[0].personId,
                'GET',
                API_KEY,
              ).then(facelist_res => {
                console.log('info ', JSON.stringify(facelist_res.userData));
                FACE_STORE.setFaceData(JSON.parse(facelist_res.userData));
                FACE_STORE.setIsLoading(false);
              });
            }
          })
          .catch(function (error) {
            showMessage(JSON.stringify(error.message));
          });
      }
    });
    //FACE_STORE.setIsLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BackgroundColor,
      }}>
      <View>
        <TouchableOpacity
          style={[styles.SubmitButtonStyle, {width: '80%'}]}
          activeOpacity={0.5}
          onPress={detectImage}>
          <Text style={styles.TextStyle}>
            {' '}
            Detect Image + {JSON.stringify(FACE_STORE.getIsLoading)}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {FACE_STORE.getIsStart ? (
          <>
            <StartingPage />
          </>
        ) : FACE_STORE.getIsLoading ? (
          <LoadingScreen />
        ) : (
          <View style={styles.container}>
            <View style={[styles.viewRow, {marginTop: 10}]}>
              <View style={styles.viewColumn}>
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 15,
                  }}
                  source={FACE_STORE.getURI}
                  resizeMode={'contain'}
                />
                <Text style={styles.text}>
                  Crime Index : {FACE_STORE.getFaceData.sev}
                </Text>
              </View>
              <View style={[styles.viewColumn, {marginLeft: 10}]}>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>First Name: </Text>
                  <Text style={styles.text}>
                    dfdsfsdf {FACE_STORE.getFaceData.fn}
                  </Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>Last Name: </Text>
                  <Text style={styles.text}>
                    dfsdf {FACE_STORE.getFaceData.ln}
                  </Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>Alias: </Text>
                  <Text style={styles.text}>
                    {FACE_STORE.getFaceData.alias}
                  </Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>Age/Sex: </Text>
                  <Text style={styles.text}>
                    : {FACE_STORE.getFaceData.age}, {FACE_STORE.getFaceData.sex}
                  </Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>Nationality: </Text>
                  <Text style={styles.text}>
                    : {FACE_STORE.getFaceData.nat}
                  </Text>
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
            <Line head="Details" />
            <View style={styles.viewColumn}>
              <View style={styles.viewRow}>
                <Text style={styles.textHeader}>Identification Marks: </Text>
                <Text style={styles.text}>{FACE_STORE.getFaceData.marks}</Text>
              </View>
              <View style={styles.viewRow}>
                <View style={[styles.viewColumn, {width: '50%'}]}>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Height: </Text>
                    <Text style={styles.text}>
                      {FACE_STORE.getFaceData.height}
                    </Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Weight: </Text>
                    <Text style={styles.text}>
                      {FACE_STORE.getFaceData.weight}
                    </Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Eye Colour: </Text>
                    <Text style={styles.text}>
                      {FACE_STORE.getFaceData.eye}
                    </Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Complexion: </Text>
                    <Text style={styles.text}>
                      {FACE_STORE.getFaceData.com}
                    </Text>
                  </View>
                </View>
                <View style={[styles.viewColumn]}>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Charges: </Text>
                    <Text style={styles.text}>{FACE_STORE.getFaceData.ch}</Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Arrests: </Text>
                    <Text style={styles.text}>{FACE_STORE.getFaceData.ar}</Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Conviction: </Text>
                    <Text style={styles.text}>{FACE_STORE.getFaceData.co}</Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>
                      Outstanding Warrents:{' '}
                    </Text>
                    <Text style={styles.text}>{FACE_STORE.getFaceData.wa}</Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Flight Risk: </Text>
                    <Text style={styles.text}>
                      {' '}
                      {FACE_STORE.getFaceData.fl}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Line head="Sample" />
            <View
              style={[styles.viewRow, {alignItems: 'center', marginTop: 15}]}>
              <Image
                source={{uri: FACE_STORE.getFaceData.p2}}
                resizeMode={'contain'}
                style={{
                  height: 100,
                  width: 100,
                  marginRight: 10,
                  borderRadius: 15,
                  flex: 0.33,
                }}
              />
              <Image
                source={{uri: FACE_STORE.getFaceData.p2}}
                resizeMode={'contain'}
                style={{
                  height: 100,
                  width: 100,
                  marginRight: 10,
                  borderRadius: 15,
                  flex: 0.33,
                }}
              />
              <Image
                source={{uri: FACE_STORE.getFaceData.p3}}
                resizeMode={'contain'}
                style={{
                  height: 100,
                  width: 100,
                  marginRight: 10,
                  borderRadius: 15,
                  flex: 0.33,
                }}
              />
            </View>
            <View>
              <Text style={styles.text}></Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: colors.BackgroundColor,
    flex: 1,
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: colors.TextColor,
  },
  textHeader: {
    fontWeight: '500',
    fontSize: 12,
    marginTop: 5,
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
  viewColumn1: {
    flexDirection: 'column',
    borderColor: 'red',
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    marginTop: 0,
  },
  viewColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginTop: 2,
  },

  viewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    backgroundColor: '#00BCD4',
    borderRadius: 25,
    borderWidth: 1,
  },

  TextStyle: {
    color: colors.TextHeaderColor,
    textAlign: 'center',
  },
});
export default SimilarFaces;
//AppRegistry.registerComponent('SimilarFaces', () => SimilarFaces);
