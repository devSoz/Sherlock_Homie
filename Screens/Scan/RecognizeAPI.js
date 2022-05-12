import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import _ from 'lodash';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//import HomeScreen from './Screen/HomeScreen.js';
//import ReportScreen from './Screen/ReportScreen.js';

const RecognizeAPI = imageURL => {
  //const axios = require('axios');
  const formData = new FormData();
  formData.append('file', imageURL);
  //https://sherlock-homie.cognitiveservices.azure.com/
  const detectFaces = () => {
    RNFetchBlob.fetch(
      'POST',
      'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender',
      {
        Accept: 'application/json',
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': this.props.apiKey,
      },
      this.state.photo_data,
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.length) {
          this.setState({
            face_data: json,
          });
        } else {
          alert("Sorry, I can't see any faces in there.");
        }

        return json;
      })
      .catch(function (error) {
        console.log(error);
        alert(
          'Sorry, the request failed. Please try again.' +
            JSON.stringify(error),
        );
      });
  };
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      // ACTIVITY_STORE.setLoading(true);
      console.log('response inside', JSON.stringify(formData));
      axios
        .post(
          /*API_STORE.getBaseUrl + API_CIRCULAR_CREATION*/
          //'https://ea344334ac.to.intercept.rest/',
          'http://localhost:5000/image',
          formData,
        )
        .then(response => {
          if (response.status == 200) {
            //ACTIVITY_STORE.setActivityData(response.data.notifications);
            //ACTIVITY_STORE.setSuccess(true);
            console.log('response', JSON.stringify(response));
            console.log('Success');
          }
          //ACTIVITY_STORE.setLoading(false);
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
    } else {
      /* CALENDAR_STORE.setSuccess(false);
      CALENDAR_STORE.setLoading(false);
      CALENDAR_STORE.setErrorText(NO_NETWORK);
      CALENDAR_STORE.setError(true);*/
      console.log('No network');
    }
  });
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default RecognizeAPI;
