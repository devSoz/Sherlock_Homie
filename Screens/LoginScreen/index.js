import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import loginLottie from '../../Lottie/login.json';

//import LottieFile from '../loading.json';

import {
  FONT,
  fontSizeBig,
  fontSizeMedium,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../Utils/Constants';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from '../../Utils/color';
import {TextInput} from 'react-native-element-textinput';
import {USER_STORE} from '../../Mobx/USER_STORE';
import LinearGradient from 'react-native-linear-gradient';
import AutoScrolling from 'react-native-auto-scrolling';
import loginAPI from './loginAPI';
import {observer} from 'mobx-react';
const LoginScreen = observer(({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState();

  const login = () => {
    loginAPI(userName, password);

    navigation.push('Home');
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
            height: '95%',
            width: '90%',
            borderRadius: 20,
            marginLeft: 10,
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
              maxLength={9}
              // textError={rollNo.length === 0 ? 'Please enter' : ''}
            />

            <TextInput
              value={password}
              style={styles.input1}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              // textErrorStyle={styles.textErrorStyle}
              placeholder="Password"
              placeholderTextColor="gray"
              onChangeText={text => {
                setPassword(text);
              }}
              secureTextEntry
              focusColor="black"
              autoCapitalize="none"
              // textError={rollNo.length === 0 ? 'Please enter' : ''}
            />
            <View
              style={{
                height: verticalScale(30),
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 3,
              }}>
              <TouchableOpacity onPress={() => login()}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: scale(14),
                    fontFamily: FONT,
                    color: '#f13e4d',
                    fontWeight: 'bold',
                  }}>
                  LOGIN
                </Text>
              </TouchableOpacity>
              {/* <View style={{h}} /> */}
              <TouchableOpacity style={{marginTop: 3}}>
                <Text style={styles.text}>
                  Don't have an account?
                  <Text
                    style={{
                      color: '#f13e4d',
                      fontWeight: 'bold',
                      fontSize: scale(14),
                      fontFamily: FONT,
                    }}>
                    {' '}
                    SIGN UP
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>
              Note: Manage profile will be available in Ver 2.0
            </Text>
            <View
              style={{
                alignItems: 'flex-end',
              }}></View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.error}>{USER_STORE.getError}</Text>
            </View>
          </View>
        </View>
      </View>
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
  subtitle: {
    fontSize: 12,
    marginLeft: 20,
    color: colors.TextColor,
    marginTop: 15,
  },
  text: {
    color: colors.TextHeaderColor,

    textAlign: 'center',
    fontSize: scale(12),
    fontFamily: FONT,
  },
});

export default LoginScreen;
