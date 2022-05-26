import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as colors from '../Utils/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Tooltip from 'react-native-walkthrough-tooltip';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';

export default function Header({headerText, toolTip}) {
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
        placement="bottom"
        // below is for the status bar of react navigation bar
      >
        <Icon
          style={styles.iconFE}
          size={25}
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
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: s(50),
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    padding: 0,
    margin: 0,
    alignItems: 'center',
    marginLeft: 10,
  },
  iconFE: {
    paddingTop: 0,
    marginTop: 0,

    marginRight: 20,

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
