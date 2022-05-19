/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

//import HomeScreen from './Screen/HomeScreen.js';
//import ReportScreen from './Screen/ReportScreen.js';
import Contact from '../SettingsScreen/Contacts';
import FaceRecognition from '../FaceRecognition';
import FaceDetails from '../../Components/FaceDetails';

const App: () => Node = () => {
  const Tab = createBottomTabNavigator();
  const actions = [
    {
      text: 'Add Face',
      //icon: require('../../Images/'),
      name: 'bt_accessibility',
      position: 1,
    },
  ];
  return (
    <Tab.Navigator>
      <Tab.Screen name="Detect" component={FaceRecognition} />
      <Tab.Screen name="Add criminal" component={FaceDetails} />
      <Tab.Screen name="Contact" component={Contact} />
      {
        //<Tab.Screen name="Login" component={LoginScreen} />
      }
    </Tab.Navigator>
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
