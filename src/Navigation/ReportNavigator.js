import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
const RootStack = createNativeStackNavigator();
import {SUSPECT_STORE} from '../Mobx/SUSPECT_STORE';
import ReportDetail from '../Screens/ReportScreen/ReportDetail';
import ReportScreen from '../Screens/ReportScreen';
import {observer} from 'mobx-react';

const ReportNavigator = observer(() => {
  //USER_STORE.setSplash(true);
  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator independent={true}>
        {SUSPECT_STORE.getIsMain ? (
          <RootStack.Screen
            name="Main"
            component={ReportScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <RootStack.Screen
              name="Detail"
              component={ReportDetail}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
});
export default ReportNavigator;
