import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FONT,
  fontSizeBig,
  fontSizeMedium,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../Utils/UIConstants';
import * as KEYS from '../../Utils/StorageKeys';
import * as colors from '../../Utils/color';
import LoadLottie from '../../Components/Lottie/LoadLottie';
import {USER_STORE} from '../../Mobx/USER_STORE';

import {observer} from 'mobx-react';
const SplashScreen = observer(() => {
  setTimeout(() => {
    console.log(USER_STORE.getSplash);
    update_userStore();
    USER_STORE.setSplash(false);
  }, 1000);

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
      console.log('namedf', val);
      console.log('user store', USER_STORE.getUserName);
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
  };

  return (
    <View style={styles.container}>
      <LoadLottie lottieType="Splash" />
    </View>
  );
});

const styles = StyleSheet.create({
  input1: {
    marginHorizontal: paddingMedium,
    marginTop: paddingSmall,
    borderWidth: scale(1),
    height: verticalScale(55),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
    fontFamily: FONT,
  },
  inputStyle: {fontSize: scale(fontSizeBig), color: 'black', fontFamily: FONT},
  labelStyle: {fontSize: scale(fontSizeBig)},
  textErrorStyle: {fontSize: 16},
  title: {
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
    color: colors.BLACK,
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: 'bold',
    fontFamily: FONT,
  },
  container: {
    backgroundColor: colors.Loginbackground,
  },
  error: {
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
    color: colors.Error,
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeMedium),
    fontWeight: 'bold',
    fontFamily: FONT,
  },

  text: {
    color: colors.TextHeaderColor,

    textAlign: 'center',
    fontSize: scale(12),
    fontFamily: FONT,
  },
});

export default SplashScreen;
