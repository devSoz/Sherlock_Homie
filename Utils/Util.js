import React, {Component} from 'react';
import RNFetchBlob from 'rn-fetch-blob';

export const OPTIONS = {
  title: 'Select Photo',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  cameraType: 'back',
  mediaType: 'photo',
  maxWidth: 480,
  quality: 1,
  noData: false,
  includeBase64: true,
};
export const URLtoBase64 = url => {
  let imagePath = null;
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', url)
    // the image is now dowloaded to device's storage
    .then(resp => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      return resp.readFile('base64');
    })
    .then(async base64Data => {
      var base64Data = `data:image/png;base64,` + base64Data;
      return base64Data;
    });
};
