import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as colors from '../../Utils/color';
import {observer} from 'mobx-react';
import {TrainAPI} from './TrainAPI';

const Train = observer(() => {
  const trainData = () => {
    TrainAPI();
  };
  //https://sherlock-homie.cognitiveservices.azure.com/face/v1.0/persongroups/persongrp_2/train
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.BackgroundColor,
      }}>
      <TouchableOpacity
        style={[styles.SubmitButtonStyle]}
        activeOpacity={0.5}
        onPress={trainData}>
        <Text style={styles.TextStyle}> Train Data</Text>
      </TouchableOpacity>
    </View>
  );
});
const styles = StyleSheet.create({
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    backgroundColor: colors.ButtonColor,
    borderRadius: 15,
    borderWidth: 1,
  },

  TextStyle: {
    color: colors.TextHeaderColor,
    textAlign: 'center',
  },
});

export default Train;
