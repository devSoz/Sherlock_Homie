import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../Utils/color';
import Icon from 'react-native-vector-icons/Entypo';
import * as UI from '../Utils/UIConstants';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';

//Component to show Error Message
export default function ErrorMessage({message}) {
  return (
    <View style={styles.viewError}>
      <Icon
        style={styles.iconFE}
        size={ms(UI.iconMedium)}
        name="circle-with-cross"
      />
      <Text style={styles.error}>{message}</Text>
    </View>
  );
}
const styles = ScaledSheet.create({
  viewError: {
    flexDirection: 'row',
    backgroundColor: colors.ErrorBackgroundColor,
    borderWidth: ms(1),
    width: '100%',
    padding: ms(UI.paddingMedium),
    borderColor: colors.Error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: colors.Error,
    fontSize: ms(UI.fontSizeSmall),
  },
  iconFE: {
    color: colors.Error,
    marginRight: s(UI.marginMedium),
  },
});
