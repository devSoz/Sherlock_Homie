import React from 'react';
import type {Node} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Contact from '../SettingsScreen/Contacts';
import FaceRecognition from '../FaceRecognition';
import FaceDetails from '../../Navigation/AdminNavigator';
import Profile from '../SettingsScreen/Profile';
import Report from '../../Navigation/ReportNavigator';
import {USER_STORE} from '../../Mobx/USER_STORE';

const App: () => Node = () => {
  //Initializing the bottom tab navigator
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
      {
        //Displaying the admin tab (Add faces and train data)
        //only if the user is logged in as admin
        USER_STORE.getUserType == 'A' && (
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
        )
      }
      <Tab.Screen
        name="Summary"
        component={Report}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="globe" color={color} size={size} />
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
