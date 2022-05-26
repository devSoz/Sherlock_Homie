import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import * as colors from '../../Utils/color';
import {observer} from 'mobx-react';
import {TrainAPI} from './TrainAPI';

const Train = observer(() => {
  const trainData = () => {
    TrainAPI();
  };

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
    marginTop: vs(UI.marginMedium),
    paddingTop: vs(UI.paddingMedium),
    paddingBottom: vs(UI.paddingMedium),
    marginLeft: s(30),
    marginRight: s(30),
    marginBottom: vs(UI.marginMedium),
    backgroundColor: colors.ButtonColor,
    borderRadius: vs(UI.borderRadiusLarge),
    borderWidth: 1,
  },

  TextStyle: {
    color: colors.TextHeaderColor,
    textAlign: 'center',
  },
});

export default Train;
