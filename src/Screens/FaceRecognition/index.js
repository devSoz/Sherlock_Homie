import React from 'react';
import {View} from 'react-native';
import * as colors from '../../Utils/color';
import SimilarFaces from './SimilarFaces';
import {FloatingAction} from 'react-native-floating-action';
import {APP_NAME, LOCATION} from '../../Utils/Constants';
import Header from '../../Components/Header';
import Share from 'react-native-share';
import {observer} from 'mobx-react';
import {FACE_STORE} from '../../Mobx/FACE_STORE';
import {USER_STORE} from '../../Mobx/USER_STORE';
import RNFetchBlob from 'rn-fetch-blob';
import {ReportAPI} from './Report';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';

const actions = [
  {
    text: 'Share',
    icon: require('../../res/Images/person.png'),
    name: 'bt_share',
    position: 2,
  },
  {
    text: 'Report',
    icon: require('../../res/Images/person.png'),
    name: 'bt_report',
    position: 1,
  },
];

const FaceRecognition = observer(() => {
  const onPress = name => {
    if (name == 'bt_share') shareFile();
    else {
      if (FACE_STORE.getIsReported) alert('Already reported');
      else ReportAPI(USER_STORE.getLocation_ID, '', 1, 1);
    }
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
            USER_STORE.getLocationName +
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
      <View style={[styles.header, {flexDirection: 'row'}]}>
        <Header headerText="Scan Face" toolTip="sample tool" />
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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.ContainerColor,
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  header: {
    height: vs(60),
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    alignItems: 'center',
  },
});

export default FaceRecognition;
