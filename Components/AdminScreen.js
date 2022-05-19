import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Linking,
  PermissionsAndroid,
  Button,
} from 'react-native';
import LoaderPage from '../Components/LoadingScreen';
import {ver} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  FACELIST_NAME,
} from '../Utils/Constants';
import Line from '../Components/Line';
import React, {Component, useState} from 'react';
import {FACE_STORE} from '../Mobx/FACE_STORE';
import Requestor from '../Lib/Requestor';
import {launchCamera} from 'react-native-image-picker';
import * as colors from '../Utils/color';
import {FloatingAction} from 'react-native-floating-action';
import ADD_FACES_STORE from '../Mobx/ADD_FACES_STORE';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const SimilarFaces = observer(() => {
  const actions = [
    {
      text: 'Add criminal',
      icon: require('../Images/person.png'),
      name: 'bt_accessibility',
      position: 2,
    },
  ];
  return (
    <View style={styles.container}>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          navigation.navigate('AddFaces');
          ADD_FACES_STORE.reset();
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '100px',
    marginRight: '5',
    height: '200px',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  button: {
    padding: 0,
    margin: 20,
    height: 45,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  text_input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: colors.TextColor,
  },
  textHeader: {
    fontWeight: '500',
    fontSize: 12,
    marginTop: 5,
    color: colors.TextHeaderColor,
  },
  text: {
    fontWeight: '500',
    fontSize: 12,
    marginTop: 5,
    color: colors.TextColor,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewColumn1: {
    flexDirection: 'column',
    borderColor: 'red',
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    marginTop: 0,
  },
  viewColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginTop: 2,
  },

  viewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});
export default SimilarFaces;
//AppRegistry.registerComponent('SimilarFaces', () => SimilarFaces);
