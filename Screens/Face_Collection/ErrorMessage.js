import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as colors from '../../Utils/color';
import Icon from 'react-native-vector-icons/Entypo';
export default function ErrorMessage({message}) {
  return (
    <View style={styles.viewError}>
      <Icon style={styles.iconFE} size={24} name="circle-with-cross" />
      <Text style={styles.error}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  viewError: {
    flexDirection: 'row',
    backgroundColor: colors.ErrorBackgroundColor,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderColor: colors.Error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: colors.Error,
    fontSize: 12,
  },
  iconFE: {
    color: colors.Error,
    marginRight: 10,
  },
});
