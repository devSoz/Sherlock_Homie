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
import Icon from 'react-native-vector-icons/FontAwesome5';

import Contact from '../SettingsScreen/Contacts';
import FaceRecognition from '../FaceRecognition';
import FaceDetails from '../Face_Collection';
import Profile from '../SettingsScreen/Profile';

import Report from '../ReportScreen';

const App: () => Node = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Detect"
        component={FaceRecognition}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Data"
        component={FaceDetails}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="View"
        component={Report}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="spinner" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contact}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="address-book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />

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
