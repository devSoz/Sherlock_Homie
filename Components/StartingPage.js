import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import LottieFile from '../Lottie/Starting_RecognitionPage.json';

//import {HeaderHeight} from '../../utils/UI_CONSTANTS';
//import {scale, verticalScale} from 'react-native-size-matters';

const LoadingScreen = () => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        style={{
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        source={LottieFile}
        speed={1}
        resizeMode="contain"
        autoPlay={true}
        loop
      />
    </View>
  );
};

export default LoadingScreen;