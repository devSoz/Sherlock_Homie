import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
const RootStack = createNativeStackNavigator();
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import {USER_STORE} from '../Mobx/USER_STORE';
import SplashScreen from '../Screens/SplashScreen';
import {observer} from 'mobx-react';

const Navigator = observer(() => {
  console.log('nav', USER_STORE.getUserName);
  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator independent={true}>
        {USER_STORE.getSplash ? (
          <RootStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : // ) : (token && name && rollNo && department) ? (
        !USER_STORE.getUserName ? ( //we're getting only token as of now
          <>
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Home"
              component={HomeScreen}
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
export default Navigator;
