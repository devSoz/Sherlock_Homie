/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//import HomeScreen from './Screen/HomeScreen.js';
//import ReportScreen from './Screen/ReportScreen.js';
import Contact from './Screens/SettingsScreen/Contacts';
import FaceRecognition from './Screens/FaceRecognition';
import FaceDetails from './Components/FaceDetails';
import LoginScreen from './Screens/LoginScreen';
import Navigator from './Navigation';

const App: () => Node = () => {
  return <Navigator />;
};

export default App;
