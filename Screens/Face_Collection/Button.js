import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import * as colors from '../../Utils/color';
export default function SubmitButton({AddFaceToFaceList}) {
  return (
    <View
      style={[
        styles.viewRow,
        {justifyContent: 'center', width: '100%', marginTop: 10},
      ]}>
      <Button
        onPress={AddFaceToFaceList}
        title="Submit"
        color={colors.ButtonColor}
        marginLeft="10"
      />
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

  viewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});
