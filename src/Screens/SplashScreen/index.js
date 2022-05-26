import React from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KEYS from '../../Utils/StorageKeys';
import LoadLottie from '../../Components/LottieFiles/LoadLottie';
import {USER_STORE} from '../../Mobx/USER_STORE';

import {observer} from 'mobx-react';
const SplashScreen = observer(() => {
  setTimeout(() => {
    update_userStore();
    console.log('type', USER_STORE.getUserType);
    console.log('name', USER_STORE.getUserName);
    USER_STORE.setSplash(false);
  }, 2000);

  const update_userStore = () => {
    AsyncStorage.getItem(KEYS.USER_TYPE).then(val => {
      if (val) USER_STORE.setUserType(val);
      else USER_STORE.setUserType(null);
    });
    AsyncStorage.getItem(KEYS.USER_KEY).then(val => {
      if (val) USER_STORE.setUserName(val);
      else USER_STORE.setUserName(null);
    });
    AsyncStorage.getItem(KEYS.USER_FULL_NAME).then(val => {
      if (val) USER_STORE.setName(val);
      else USER_STORE.setName(null);
    });
    AsyncStorage.getItem(KEYS.USER_EMAILID).then(val => {
      if (val) USER_STORE.setEmail(val);
      else USER_STORE.setEmail(null);
    });
    AsyncStorage.getItem(KEYS.USER_ID).then(val => {
      if (val) USER_STORE.setID(val);
      else USER_STORE.setID(null);
    });
    AsyncStorage.getItem(KEYS.USER_PROFILE).then(val => {
      if (val) USER_STORE.setProfilePic(val);
      else USER_STORE.setProfilePic(null);
    });
    AsyncStorage.getItem(KEYS.USER_PHONE).then(val => {
      if (val) USER_STORE.setPhoneNo(val);
      else USER_STORE.setPhoneNo(null);
    });
    AsyncStorage.getItem(KEYS.USER_DEPT).then(val => {
      if (val) USER_STORE.setDept(val);
      else USER_STORE.setDept(null);
    });
    AsyncStorage.getItem(KEYS.LOCATION).then(val => {
      if (val) USER_STORE.setLocation(val);
      else USER_STORE.setLocation(null);
    });
    AsyncStorage.getItem(KEYS.LOCATION_CATEGORY).then(val => {
      if (val) USER_STORE.setCategory(val);
      else USER_STORE.setCategory(null);
      AsyncStorage.getItem(KEYS.LOCATION_ID).then(val => {
        if (val) USER_STORE.setLocation_ID(val);
        else USER_STORE.setLocation_ID(null);
        AsyncStorage.getItem(KEYS.LOCATION_Name).then(val => {
          if (val) USER_STORE.setLocationName(val);
          else USER_STORE.setLocationName(null);
        });
      });
    });
  };

  return (
    <View>
      <LoadLottie lottieType="Splash" />
    </View>
  );
});

export default SplashScreen;
