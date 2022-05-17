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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

//import HomeScreen from './Screen/HomeScreen.js';
//import ReportScreen from './Screen/ReportScreen.js';
import FaceCollection from './Screens/Face_Collection';
import FaceRecognition from './Screens/FaceRecognition';
import AdminNavigator from './Navigator/AdminNavigator';

const App: () => Node = () => {
  const Tab = createBottomTabNavigator();
  const actions = [
    {
      text: 'Add Face',
      icon: require('./Images/person.png'),
      name: 'bt_accessibility',
      position: 1,
    },
  ];
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Sherlockie" component={FaceRecognition} />
        <Tab.Screen name="Facie" component={FaceCollection} />
      </Tab.Navigator>
    </NavigationContainer>
  );
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

export default App;
