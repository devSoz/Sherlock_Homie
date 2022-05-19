import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../Utils/color';
export default function ErrorMessage({message}) {
  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      <Text
        style={{
          alignSelf: 'center',
          paddingHorizontal: 5,
          fontSize: 10,
          color: colors.TextColor,
        }}>
        {message}
      </Text>
      <View
        style={{
          backgroundColor: 'black',
          height: 2,
          flex: 1,
          alignSelf: 'center',
        }}
      />
    </View>
  );
}
