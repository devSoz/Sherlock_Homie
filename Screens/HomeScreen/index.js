import React from 'react';
import type {Node} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Contact from '../SettingsScreen/Contacts';
import FaceRecognition from '../FaceRecognition';
import FaceDetails from '../Face_Collection';
import Profile from '../SettingsScreen/Profile';
import Report from '../../Navigation/ReportNavigator';

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
    </Tab.Navigator>
  );
};

export default App;
