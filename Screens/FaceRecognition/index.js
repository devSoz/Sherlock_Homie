import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import * as colors from '../../Utils/color';
import SimilarFaces from './SimilarFaces';
import {FloatingAction} from 'react-native-floating-action';
import {APP_NAME, LOCATION} from '../../Utils/Constants';

import Share from 'react-native-share';
import {observer} from 'mobx-react';
import {FACE_STORE} from '../../Mobx/FACE_STORE';
import RNFetchBlob from 'rn-fetch-blob';

const actions = [
  {
    text: 'Share',
    icon: require('../../Images/person.png'),
    name: 'bt_share',
    position: 2,
  },
  {
    text: 'Report',
    icon: require('../../Images/person.png'),
    name: 'bt_report',
    position: 1,
  },
];

const FaceRecognition = observer(() => {
  const onPress = name => {
    if (name == 'bt_share') shareFile();
    else alert('This feature will be available in Ver 2.0');
  };
  const shareFile = () => {
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', FACE_STORE.getFaceData.p2)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async base64Data => {
        var base64Data = `data:image/png;base64,` + base64Data;

        let shareImage = {
          message:
            '*IMPORTANT*\n' +
            APP_NAME +
            ' ' +
            LOCATION +
            '\n\n*Identified suspect -* \n' +
            FACE_STORE.getFaceData.fn +
            ', ' +
            FACE_STORE.getFaceData.ln +
            '(' +
            FACE_STORE.getFaceData.alias +
            ')',

          url: base64Data,
        };

        // here's base64 encoded image
        await Share.open(shareImage);

        // remove the file from storage
        return fs.unlink(imagePath);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan Face</Text>
      </View>
      <SimilarFaces />
      {FACE_STORE.getIsIdentified && (
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            onPress(name);
          }}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },

  headerText: {
    color: colors.LightText,
    textShadowOffset: {width: 1, height: 3},
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    height: 55,
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FaceRecognition;
