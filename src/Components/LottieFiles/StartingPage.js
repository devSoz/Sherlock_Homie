import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import LottieFile from '../../res/Lottie/Starting_RecognitionPage.json';

//Lottie for face recognition screen
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
