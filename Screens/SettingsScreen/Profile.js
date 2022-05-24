import React, {useReducer} from 'react';

import {USER_STORE} from '../../Mobx/USER_STORE';
import {observer} from 'mobx-react';
import * as colors from '../../Utils/color';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
const Profile = observer(() => {
  const logOut = () => {
    Alert.alert(
      'Logout?',
      'You will return to login screen',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            USER_STORE.setName('');
            USER_STORE.setUserName('');
            USER_STORE.setDept('');
            USER_STORE.setUserType('');
            USER_STORE.setUniqueId('');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.screenContainerJb}>
      <View style={styles.imageBackgroundNb} />
      <View style={styles.containerEA} elevation={0}>
        <Image
          style={StyleSheet.flatten([styles.imageA3, {borderRadius: 10}])}
          resizeMode="cover"
          source={{
            uri: USER_STORE.getProfilePic,
          }}
        />
        <Text style={StyleSheet.flatten([styles.textPr])}>
          {USER_STORE.getName}
        </Text>
        <Text style={[styles.textsub, {textAlign: 'center'}]}>
          {USER_STORE.getUserType == 'A' ? ' (Administrator)' : '(User)'}
        </Text>
      </View>
      <View elevation={0}>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.touchableOk,
            {borderColor: 'red'},
          ])}>
          <View style={styles.viewKs}>
            <Icon
              style={styles.iconFE}
              size={24}
              color={colors.Green}
              name="envelope"
            />
            <Text style={styles.text}>{USER_STORE.getEmail}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.touchableOk,
            {borderColor: 'red'},
          ])}>
          <View style={styles.viewKs}>
            <Icon
              style={styles.iconFE}
              size={24}
              color={colors.Green}
              name="phone"
            />
            <Text style={styles.text}>{USER_STORE.getPhoneNo}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.touchableOk,
            {borderColor: 'red'},
          ])}>
          <View style={styles.viewKs}>
            <Icon
              style={styles.iconFE}
              size={24}
              color={colors.Green}
              name="id-badge"
            />
            <Text style={styles.text}>{USER_STORE.getID}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.touchableOk,
            {borderColor: 'red'},
          ])}>
          <View style={[styles.viewKs, {marginLeft: 15}]}>
            <Text style={styles.text}>Department : {USER_STORE.getDept} </Text>
          </View>
        </TouchableOpacity>

        <View style={[{width: '100%', marginTop: 10, alignItems: 'center'}]}>
          <TouchableOpacity
            style={[styles.SubmitButtonStyle]}
            activeOpacity={0.5}
            onPress={logOut}>
            <Text style={styles.TextStyle}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>
            Note: Manage profile will be available in Ver 2.0
          </Text>
        </View>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  screenContainerJb: {
    justifyContent: 'space-evenly',
  },
  subtitle: {
    fontSize: 12,
    marginLeft: 20,
    color: colors.TextColor,
    marginTop: 5,
  },
  SubmitButtonStyle: {
    marginTop: 10,
    padding: 10,

    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    backgroundColor: colors.ButtonColor,
    borderRadius: 15,
    borderWidth: 1,
  },

  TextStyle: {
    color: colors.TextHeaderColor,
    textAlign: 'center',
  },
  viewKs: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewYR: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewS1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAl: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageBackgroundNb: {
    width: '100%',
    height: 150,
    backgroundColor: colors.ProfileBackgroundColor,
  },
  imageA3: {
    height: 120,
    width: 120,
  },
  containerEA: {
    alignItems: 'center',
    marginTop: -65,
  },

  textPr: {
    width: '100%',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 2,
    color: colors.TextHeaderColor,
    fontSize: 30,
    fontWeight: '500',
  },
  text: {
    width: '100%',
    textAlign: 'left',
    marginTop: 8,
    marginLeft: 3,
    color: colors.TextHeaderColor,
    fontSize: 15,
    fontWeight: '500',
  },
  textsub: {
    width: '100%',
    textAlign: 'left',
    marginTop: 2,
    marginLeft: 3,
    marginBottom: 10,
    color: colors.TextHeaderColor,
    fontSize: 15,
    fontWeight: '500',
  },
  touchableOk: {
    borderTopWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 15,
  },
  iconFE: {
    height: 24,
    marginTop: 8,
    width: 24,
    marginLeft: 15,
    marginRight: 10,
    alignItems: 'center',
  },

  touchableOm: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  touchableBp: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  touchableJg: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
});
export default Profile;
