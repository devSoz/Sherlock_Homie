import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import splashLottie from '../../res/Lottie/SplashLottie.json';
import LoadingLottie from '../../res/Lottie/loading.json';
import DetectLoading from '../../res/Lottie/DetectLoading.json';

const LoadLottie = ({lottieType}) => {
  const getLottie = () => {
    if (lottieType === 'Splash') return splashLottie;
    else if (lottieType === 'Loading') return LoadingLottie;
    else if (lottieType === 'Face') return DetectLoading;
  };

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
        source={getLottie()}
        speed={1}
        resizeMode="contain"
        autoPlay={true}
        loop
      />
    </View>
  );
};

export default LoadLottie;
