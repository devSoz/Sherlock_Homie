import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
const RootStack = createNativeStackNavigator();
import {ADD_FACES_STORE} from '../Mobx/ADD_FACES_STORE';
import AddFace from '../Screens/Face_Collection';
import Admin from '../Screens/Admin/Admin';
import {observer} from 'mobx-react';

//Navigator for Admin screen (Add faces and train data)
const AdminNavigator = observer(() => {
  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator independent={true}>
        {ADD_FACES_STORE.getIsAdmin ? (
          <RootStack.Screen
            name="Admin"
            component={Admin}
            options={{
              headerShown: false,
            }}
          />
        ) : ADD_FACES_STORE.getIsMain ? (
          <RootStack.Screen
            name="Add"
            component={AddFace}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <></>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
});
export default AdminNavigator;
