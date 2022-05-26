import React from 'react';
import {USER_STORE} from '../../Mobx/USER_STORE';
import {observer} from 'mobx-react';
import * as colors from '../../Utils/color';
import {s, vs, ms, ScaledSheet} from 'react-native-size-matters';
import * as UI from '../../Utils/UIConstants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
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
          style={[styles.imageA3, {borderRadius: 10}]}
          resizeMode="cover"
          source={{
            uri: USER_STORE.getProfilePic,
          }}
        />
        <Text style={styles.textPr}>{USER_STORE.getName}</Text>
        <Text style={[styles.textsub, {textAlign: 'center'}]}>
          {USER_STORE.getUserType == 'A' ? ' (Administrator)' : '(User)'}
        </Text>
      </View>
      <View elevation={0}>
        <TouchableOpacity style={[styles.touchableOk, {borderColor: 'red'}]}>
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
        <TouchableOpacity style={[styles.touchableOk, {borderColor: 'red'}]}>
          <View style={styles.viewKs}>
            <Icon
              style={styles.iconFE}
              size={ms(UI.iconMedium)}
              color={colors.Green}
              name="phone"
            />
            <Text style={styles.text}>{USER_STORE.getPhoneNo}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOk, {borderColor: 'red'}]}>
          <View style={styles.viewKs}>
            <Icon
              style={styles.iconFE}
              size={ms(UI.iconMedium)}
              color={colors.Green}
              name="id-badge"
            />
            <Text style={styles.text}>{USER_STORE.getID}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOk, {borderColor: 'red'}]}>
          <View style={[styles.viewKs, {marginLeft: 15}]}>
            <Text style={styles.text}>Department : {USER_STORE.getDept} </Text>
          </View>
        </TouchableOpacity>

        <View
          style={[
            {
              width: '100%',
              marginTop: vs(UI.marginMedium),
              alignItems: 'center',
            },
          ]}>
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
const styles = ScaledSheet.create({
  screenContainerJb: {
    justifyContent: 'space-evenly',
  },
  subtitle: {
    fontSize: ms(UI.fontSizeSmall),
    marginLeft: s(UI.marginBig),
    color: colors.TextColor,
    marginTop: vs(UI.marginSmall),
  },
  SubmitButtonStyle: {
    marginTop: vs(UI.marginMedium),
    padding: s(UI.paddingMedium),
    marginLeft: s(30),
    marginRight: s(30),
    marginBottom: vs(UI.marginMedium),
    backgroundColor: colors.ButtonColor,
    borderRadius: ms(UI.borderRadiusLarge),
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
    height: vs(150),
    backgroundColor: colors.ProfileBackgroundColor,
  },
  imageA3: {
    height: vs(120),
    width: s(120),
  },
  containerEA: {
    alignItems: 'center',
    marginTop: vs(-65),
  },

  textPr: {
    width: '100%',
    textAlign: 'center',
    marginTop: vs(UI.marginBig),
    marginBottom: vs(2),
    color: colors.TextHeaderColor,
    fontSize: ms(UI.fontSizeVeryLarge),
    fontWeight: '500',
  },
  text: {
    width: '100%',
    textAlign: 'left',
    marginTop: vs(UI.marginMedium),
    marginLeft: s(UI.marginSmall),
    color: colors.TextHeaderColor,
    fontSize: ms(UI.fontSizeMedium),
    fontWeight: '500',
  },
  textsub: {
    width: '100%',
    textAlign: 'left',
    marginTop: vs(2),
    marginLeft: s(UI.marginSmall),
    marginBottom: vs(UI.marginMedium),
    color: colors.TextHeaderColor,
    fontSize: ms(UI.fontSizeMedium),
    fontWeight: '500',
  },
  touchableOk: {
    borderTopWidth: 1,
    paddingTop: vs(2),
    paddingBottom: vs(2),
    marginTop: vs(UI.marginBig),
  },
  iconFE: {
    height: vs(24),
    marginTop: vs(UI.marginMedium),
    width: s(24),
    marginLeft: s(UI.marginBig),
    marginRight: s(UI.marginMedium),
    alignItems: 'center',
  },
});
export default Profile;
