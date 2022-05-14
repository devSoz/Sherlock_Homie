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

        /*var user_data = {
          name: FACE_STORE.getName,
          filename: FACE_STORE.getURI,
        };

        Requestor.upload(
          API_BASE_URL +
            '/face/v1.0/facelists/' +
            FACELIST_ID +
            '/persistedFaces',
          API_KEY,
          FACE_STORE.getPhotoData, //res.assets[0].base64,
          {
            userData: JSON.stringify(user_data),
          },
        )

          .then(res => {
            console.log('response test', JSON.stringify(res));
            console.log('response last');
            alert('Face was added to face list!');
          })
          .catch(error => {
            console.log(JSON.stringify(error)); //JSON.stringify(error));
          });*/
      }
    });
  };

  const createFaceList = () => {
    Requestor.request(
      API_BASE_URL + 'face/v1.0/facelists/' + FACELIST_ID,
      'PUT',
      API_KEY,
      JSON.stringify(FACELIST_NAME),
    ).then(function (res) {
      alert('Face List Created!');
      console.log(JSON.stringify(res));
    });
  };

  const AddFaceToFaceList = () => {
    var user_data = {
      name: FACE_STORE.getName,
      filename: FACE_STORE.getURI,
      photo_data: FACE_STORE.getPhotoData,
    };

    Requestor.upload(
      API_BASE_URL + '/face/v1.0/facelists/' + FACELIST_ID + '/persistedFaces',
      API_KEY,
      FACE_STORE.getPhotoData, //res.assets[0].base64,
      {
        userData: JSON.stringify(user_data),
      },
    )

      .then(res => {
        console.log('response test', JSON.stringify(res));
        console.log('response last');
        alert('Face was added to face list!');
      })
      .catch(error => {
        console.log(JSON.stringify(error)); //JSON.stringify(error));
      });
  };

  const AddFaceToFaceListtemp = () => {
    var user_data = {
      name: FACE_STORE.getName,
      filename: FACE_STORE.getURI,
    };
    console.log('response test', JSON.stringify(FACE_STORE.getPhotoData));
    console.log('response test', JSON.stringify(user_data));
    axios
      .post(
        API_BASE_URL + 'face/v1.0/facelists/' + FACELIST_ID + '/persistedFaces',

        FACE_STORE.getPhotoData,

        {
          userData: JSON.stringify(user_data),
        },
      )
      .then(res => {
        console.log('response test', JSON.stringify(res));
        alert('Face was added to face list!');
      })
      .catch(error => {
        /* if (error.response) {
      ACTIVITY_STORE.setErrorText(error.response.data.message);
    } else if (error.request) {
      ACTIVITY_STORE.setErrorText('Server Error');
    }
    CALENDAR_STORE.setError(true);
    CALENDAR_STORE.setLoading(false);*/
        console.log(JSON.stringify(error));
      });
  };

  const getSimilarFace = () => {
    Requestor.upload(
      API_BASE_URL + '/face/v1.0/detect',
      API_KEY,
      photo_data,
    ).then(facedetect_res => {
      let face_id = facedetect_res[0].faceId;

      let data = {
        faceId: face_id,
        faceListId: FACELIST_ID,
        maxNumOfCandidatesReturned: 2,
      };

      /*Requestor.request(
          API_BASE_URL + '/face/v1.0/findsimilars',
          'POST',
          API_KEY,
          JSON.stringify(data),
        ).then(similarfaces_res => {
          let similar_face = similarfaces_res[1];
  
          Requestor.request(
            API_BASE_URL + '/face/v1.0/facelists/' + facelist_id,
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
            });
          });
        });*/
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
