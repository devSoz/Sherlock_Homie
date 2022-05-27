import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import * as colors from '../Utils/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Tooltip from 'react-native-walkthrough-tooltip';
import {ScaledSheet, s, ms, vs} from 'react-native-size-matters';
import {ADD_FACES_STORE} from '../Mobx/ADD_FACES_STORE';

//Header component for the Add faces tab along with the back button option
export default function HeaderBack({headerText, toolTip, back}) {
  const goBack = () => {
    Alert.alert(
      'Sherlock-Homie',
      'Do you want to go back?',
      [
        {
          text: 'Yes',
          //Set flag for showing the options in the tab
          onPress: () => {
            ADD_FACES_STORE.setIsMain(false);
            ADD_FACES_STORE.setIsMainAPI(false);
            ADD_FACES_STORE.setIsAdmin(true);
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const [isToolTip, setIsToolTip] = useState(false);
  return (
    <View style={[styles.header, {flexDirection: 'row'}]}>
      <Icon
        style={styles.iconFE}
        size={30}
        color={colors.Green}
        name="angle-left"
        onPress={goBack}
      />
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
