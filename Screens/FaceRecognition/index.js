import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Button} from 'react-native';

import SimilarFaces from '../../Components/SimilarFaces';
import {FloatingAction} from 'react-native-floating-action';
import SendMessage from '../../Components/SendMessage';
import getContactsAPI from '../../Components/ContactsApi';
import {API_KEY} from '../..//Utils/Constants';
import {CONTACT_STORE} from '../../Mobx/CONTACT_STORE';
import {observer} from 'mobx-react';

const image_picker_options = {
  title: 'Select Photo',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  cameraType: 'back',
  mediaType: 'photo',
  maxWidth: 480,
  quality: 1,
  noData: false,
};
const FaceRecognition = () => {
  console.log('main');

  getContactsAPI();

  const actions = [
    {
      text: 'Devipriya',
      //  icon: require('../../Images/person.png'),
      name: '8778672223',
      //position: 2,
    },
    {
      text: 'Sumathi',
      // icon: require('../../Images/person.png'),
      name: '9884240366',
      // position: 2,
    },
  ];

  //console.log('arrary', JSON.stringify(actions));
  return (
    <View style={styles.container}>
      <SimilarFaces
        imagePickerOptions={image_picker_options}
        apiKey={API_KEY}
      />
      <FloatingAction
        actions={CONTACT_STORE.getContactData}
        onPressItem={name => {
          //  if (name == 'bt_share') {
          SendMessage('Share', name);
          // }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
});

export default FaceRecognition;
//AppRegistry.registerComponent('RNSimilar', () => RNSimilar);
