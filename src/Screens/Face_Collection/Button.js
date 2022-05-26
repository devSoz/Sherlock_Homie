import React from 'react';
import {View, Button} from 'react-native';
import * as colors from '../../Utils/color';
import * as UI from '../../Utils/UIConstants';
import {ScaledSheet, s, vs} from 'react-native-size-matters';

export default function SubmitButton({AddFaceToFaceList}) {
  return (
    <View
      style={[
        styles.viewRow,
        {
          justifyContent: 'center',
          width: '100%',
          marginTop: vs(UI.marginMedium),
        },
      ]}>
      <Button
        onPress={AddFaceToFaceList}
        title="Submit"
        color={colors.ButtonColor}
        marginLeft={s(UI.marginMedium)}
      />
    </View>
  );
}
const styles = ScaledSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});
