import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Button} from 'react-native';

import AddFaces from '../../Components/AddFaces';

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

//the API Key that you got from Microsoft Azure
const api_key = '7b8131f86ba64d68bcc5fe806d44974c';

const RNSimilar = () => {
  return (
    <View style={styles.container}>
      <AddFaces imagePickerOptions={image_picker_options} apiKey={api_key} />
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

export default RNSimilar;
//AppRegistry.registerComponent('RNSimilar', () => RNSimilar);
