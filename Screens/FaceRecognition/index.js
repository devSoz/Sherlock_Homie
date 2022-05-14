import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Button} from 'react-native';

import SimilarFaces from '../../Components/SimilarFaces';

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

const FaceRecognition = () => {
  return (
    <View style={styles.container}>
      <SimilarFaces
        imagePickerOptions={image_picker_options}
        apiKey={api_key}
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
