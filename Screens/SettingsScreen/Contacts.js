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
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import axios from 'axios';
import {observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  FACELIST_NAME,
} from '../../Utils/Constants';
import Line from '../../Components/Line';
import React, {Component, useState} from 'react';
import {FACE_STORE} from '../../Mobx/FACE_STORE';
import Requestor from '../../Lib/Requestor';
import {launchCamera} from 'react-native-image-picker';
import * as colors from '../../Utils/color';
import LoadingScreen from '../../Components/LoadingScreen';

const Contacts = observer(() => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [Similar_photo, setSimilar_photo] = useState('');

  const showMessage = message => {
    Alert.alert(
      'Sherlock-Homie',
      message,
      [
        {
          text: 'Ok',
          onPress: () => {
            FACE_STORE.setIsStart(true);
            FACE_STORE.setIsLoading(false);
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const getContact = async () => {
    axios
      .get(
        'https://sherlock-homie-api.herokuapp.com/Contact',
        {},
        {timeout: 5000},
      )

      .then(res => {
        alert(JSON.stringify(res));
        console.log('response detect' + JSON.stringify(res));
      })
      .catch(error => {
        alert(JSON.stringify(error));
        console.log(JSON.stringify(error));
      });
    //FACE_STORE.setIsLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BackgroundColor,
      }}>
      <View>
        <TouchableOpacity
          style={[styles.SubmitButtonStyle, {width: '80%'}]}
          activeOpacity={0.5}
          onPress={getContact}>
          <Text style={styles.TextStyle}>
            {' '}
            Detect Image + {JSON.stringify(FACE_STORE.getIsLoading)}
          </Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.BackgroundColor,
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
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    backgroundColor: '#00BCD4',
    borderRadius: 25,
    borderWidth: 1,
  },

  TextStyle: {
    color: colors.TextHeaderColor,
    textAlign: 'center',
  },
});
export default Contacts;
//AppRegistry.registerComponent('SimilarFaces', () => SimilarFaces);
