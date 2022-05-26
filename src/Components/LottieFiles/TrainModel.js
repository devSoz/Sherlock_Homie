import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import LottieFile from './Starting_RecognitionPage.json';

const TrainModel = () => {
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

export default TrainModel;
