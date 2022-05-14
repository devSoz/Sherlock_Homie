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
  FACELIST_ID,
  FACELIST_NAME,
} from '../Utils/Constants';
import React, {Component, useState} from 'react';
import {FACE_STORE} from '../Mobx/FACE_STORE';
import Requestor from '../Lib/Requestor';
import {launchCamera} from 'react-native-image-picker';

const SimilarFaces = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [Similar_photo, setSimilar_photo] = useState('');
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
      // console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        console.log('response uri', res.assets[0].uri);
        FACE_STORE.setName(name);
        FACE_STORE.setPhotoData(res.assets[0].base64);
        FACE_STORE.setURI({uri: res.assets[0].uri});
        getSimilarFace();
        // setURI(res.uri);
        /*this.setState({
        photo_style: {
          width: res.width,
          height: res.height,
        },
        photo: source,
        photo_data: res.data,
      });*/
        //recognizeAPI(res.assets[0].uri);
        //this.setState({
        // filePath: res,
        //  fileData: res.data,
        //  fileUri: res.uri,
        //});
      }
    });
  };

  const getSimilarFace = async () => {
    Requestor.upload(
      API_BASE_URL + '/face/v1.0/detect',
      API_KEY,
      FACE_STORE.getPhotoData,
    ).then(facedetect_res => {
      console.log('response detect' + JSON.stringify(facedetect_res));
      let face_id = facedetect_res[0].faceId;

      let data = {
        faceId: face_id,
        faceListId: FACELIST_ID,
        maxNumOfCandidatesReturned: 2,
      };
      console.log('faceid', JSON.stringify(data));
      Requestor.request(
        API_BASE_URL + '/face/v1.0/findsimilars',
        'POST',
        API_KEY,
        JSON.stringify(data),
      ).then(similarfaces_res => {
        let similar_face = similarfaces_res[0];
        console.log('similar ', JSON.stringify(similar_face));
        Requestor.request(
          API_BASE_URL + '/face/v1.0/facelists/' + FACELIST_ID,
          'GET',
          API_KEY,
        ).then(facelist_res => {
          let user_data = {};
          facelist_res['persistedFaces'].forEach(face => {
            if (face.persistedFaceId == similar_face.persistedFaceId) {
              user_data = JSON.parse(face.userData);
            }
          });
          setSimilar_photo(user_data.filename);
          setMessage(
            'Similar to:' +
              user_data.name +
              ' with confidence of ' +
              similar_face.confidence,
          );
          /* this.setState({
          similar_photo: {uri: user_data.filename},
          message:
            'Similar to: ' +
            user_data.name +
            ' with confidence of ' +
            similar_face.confidence,
        });*/
        });
      });
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button
          containerStyle={styles.button}
          onPress={requestCameraPermission}
          title="ar Face"
        />

        <Image source={FACE_STORE.getURI} resizeMode={'contain'} />

        <Text style={styles.message}>{message}</Text>
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
export default SimilarFaces;
//AppRegistry.registerComponent('SimilarFaces', () => SimilarFaces);
