import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import splashLottie from '../../Lottie/text.json';
import LoadingLottie from '../../Lottie/loading.json';
const LoadLottie = ({lottieType}) => {
  const getLottie = () => {
    if (lottieType === 'Splash') return splashLottie;
    else if (lottieType === 'Loading') return LoadingLottie;
    else if (lottieType === 'Face') return LoadingLottie;
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
