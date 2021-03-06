import React, {useState} from 'react';
import {View, Text} from 'react-native';
import * as colors from '../Utils/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Tooltip from 'react-native-walkthrough-tooltip';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';

//Header component for all tabs
export default function Header({headerText, toolTip}) {
  //To display instructions for each tab on the right side of the header
  const [isToolTip, setIsToolTip] = useState(false);
  return (
    <View style={[styles.header, {flexDirection: 'row'}]}>
      <Text style={styles.headerText}>{headerText}</Text>
      <Tooltip
        isVisible={isToolTip}
        content={
          <View>
            <Text style={styles.text}> {toolTip} </Text>
          </View>
        }
        onClose={() => setIsToolTip(false)}
        placement="bottom">
        <Icon
          style={styles.iconFE}
          size={ms(20)}
          color={colors.Green}
          onPress={() => setIsToolTip(true)}
          name="info-circle"
        />
      </Tooltip>
    </View>
  );
}

const styles = ScaledSheet.create({
  headerText: {
    color: colors.LightText,
    textShadowOffset: {width: 1, height: 3},
    fontSize: ms(20),
    fontWeight: '500',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: vs(50),
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    alignItems: 'center',
    paddingLeft: s(10),
  },
  iconFE: {
    marginRight: s(20),
    color: colors.WHITE,
  },
  text: {
    fontWeight: '500',
    fontSize: s(12),
    marginTop: 5,

    color: colors.TextColor,
    flexWrap: 'wrap',
  },
});
