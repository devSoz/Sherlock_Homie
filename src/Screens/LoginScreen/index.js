import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import loginLottie from '../../res/Lottie/login.json';
import * as UI from '../../Utils/UIConstants';
import LottieView from 'lottie-react-native';
import * as colors from '../../Utils/color';
import {TextInput} from 'react-native-element-textinput';
import {USER_STORE} from '../../Mobx/USER_STORE';
import loginAPI from './loginAPI';
import {observer} from 'mobx-react';
import LoadingScreen from '../../Components/LottieFiles/LoadingScreen';

const LoginScreen = observer(({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState();

  //Function to check if the fields are not empty
  const validateData = () => {
    USER_STORE.setError('');
    if (userName == '') {
      USER_STORE.setError('Please enter UserName');
      return false;
    } else if (password == '') {
      USER_STORE.setError('Please enter Password');
      return false;
    } else return true;
  };

  //Method to valiate data and the API component to authenticate user
  const login = () => {
    if (validateData()) {
      loginAPI(userName, password);
      navigation.push('Home');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: '50%',
          width: '100%',
        }}>
        <View
          style={{
            height: verticalScale(390),
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            style={{
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            source={loginLottie}
            speed={1}
            resizeMode="contain"
            autoPlay={true}
            loop
          />
        </View>
      </View>
      <View
        style={{
          height: '50%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: '97%',
            width: '90%',
            borderRadius: moderateScale(UI.borderRadiusLarge),
            marginLeft: scale(UI.marginMedium),
            backgroundColor: colors.BackgroundColor,
          }}>
          <View
            style={{
              height: verticalScale(310),
              width: '100%',
            }}>
            <Text style={styles.title}>LOGIN</Text>
            <TextInput
              value={userName}
              style={styles.input1}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholder="User Name"
              placeholderTextColor="gray"
              onChangeText={text => {
                setUserName(text);
              }}
              focusColor="black"
              maxLength={30}
            />

            <TextInput
              value={password}
              style={styles.input1}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholder="Password"
              placeholderTextColor="gray"
              onChangeText={text => {
                setPassword(text);
              }}
              secureTextEntry
              focusColor="black"
              autoCapitalize="none"
              maxLength={30}
            />
            <View
              style={{
                height: verticalScale(30),
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: verticalScale(UI.marginMedium),
                marginBottom: verticalScale(3),
              }}>
              <TouchableOpacity onPress={() => login()}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: scale(UI.fontSizeBig),
                    fontFamily: UI.FONT,
                    color: colors.ButtonColor,
                    fontWeight: 'bold',
                  }}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: 3}}>
                <Text style={styles.text}>
                  Don't have an account?
                  <Text
                    style={{
                      color: colors.ButtonColor,
                      fontWeight: 'bold',
                      fontSize: scale(UI.fontSizeMedium),
                      fontFamily: UI.FONT,
                    }}>
                    {' '}
                    SIGN UP
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            {USER_STORE.getIsLoading ? (
              <LoadingScreen />
            ) : (
              <Text style={styles.error}>{USER_STORE.getError}</Text>
            )}
            <Text style={styles.subtitle}>
              Note: Sign Up will be available in Ver 2.0
            </Text>
            <View
              style={{
                alignItems: 'flex-end',
              }}></View>
            <View
              style={{
                alignItems: 'center',
              }}></View>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  input1: {
    marginHorizontal: UI.paddingMedium,
    marginTop: UI.paddingSmall,
    borderWidth: scale(1),
    height: verticalScale(55),
    paddingHorizontal: scale(UI.paddingMedium),
    borderRadius: scale(UI.borderRadiusMedium),
    fontFamily: UI.FONT,
  },
  inputStyle: {
    fontSize: scale(UI.fontSizeBig),
    color: 'black',
    fontFamily: UI.FONT,
  },
  labelStyle: {fontSize: scale(UI.fontSizeBig)},
  textErrorStyle: {fontSize: UI.fontSizeMedium},
  title: {
    marginTop: verticalScale(UI.paddingSmall),
    paddingVertical: scale(UI.paddingSmall),
    color: colors.BLACK,
    paddingLeft: scale(UI.paddingMedium),
    fontSize: scale(UI.fontSizeBig),
    fontWeight: 'bold',
    fontFamily: UI.FONT,
  },
  container: {
    backgroundColor: colors.Loginbackground,
  },
  error: {
    marginTop: verticalScale(UI.paddingSmall),
    paddingVertical: scale(UI.paddingSmall),
    color: colors.Error,
    paddingLeft: scale(UI.paddingMedium),
    fontSize: scale(UI.fontSizeMedium),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: UI.FONT,
  },
  subtitle: {
    fontSize: moderateScale(UI.fontSizeSmall),
    marginLeft: scale(UI.marginBig),
    color: colors.TextColor,
    textAlign: 'center',
    marginTop: verticalScale(UI.marginMedium),
  },
  text: {
    color: colors.TextHeaderColor,

    textAlign: 'center',
    fontSize: scale(UI.fontSizeSmall),
    fontFamily: UI.FONT,
  },
});

export default LoginScreen;
