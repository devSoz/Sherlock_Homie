import React from 'react';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddFaces from '../Components/AddFaces';
import AdminScreen from '../Components/AdminScreen';
//import * as color from '../../utils/colors';

//const AdminStack = createNativeStackNavigator();

function AdminNavigator() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{
          headerShown: true,
          header: props => <PageHeader title="Admin Screen" />,
        }}
      />
      <AdminStack.Screen
        name="AddFaces"
        component={AddFaces}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
        }}
      />
    </AdminStack.Navigator>
  );
}

export default AdminNavigator;
