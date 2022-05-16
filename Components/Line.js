import React from 'react';
import {View, Text} from 'react-native';

export default function Line({head}) {
  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      <View
        style={{
          backgroundColor: 'black',
          height: 2,
          flex: 1,
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
          paddingHorizontal: 5,
          fontSize: 10,
        }}>
        {head}
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
