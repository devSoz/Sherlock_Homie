import React from 'react';
import {ADD_FACES_STORE} from '../../Mobx/ADD_FACES_STORE';
import * as UI from '../../Utils/UIConstants';
import {TrainAPI} from '../Train/TrainAPI';
import {observer} from 'mobx-react';
import {View, Image, TouchableOpacity} from 'react-native';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';

const Admin = observer(() => {
  //Function to set the navigation by modifying state variables
  const onPressAdd = () => {
    ADD_FACES_STORE.setIsAdmin(false);
    ADD_FACES_STORE.setIsMain(true);
  };

  //Function to call the train data API
  const onPressTrain = () => {
    TrainAPI();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%', alignItems: 'center'}}
        onPress={onPressAdd}
        activeOpacity={0.5}>
        <Image
          style={styles.ImageDisplay}
          source={require('../../res/Images/Adddata.jpg')}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: '100%', alignItems: 'center'}}
        onPress={onPressTrain}
        activeOpacity={0.5}>
        <Image
          style={styles.ImageDisplay}
          source={require('../../res/Images/Traindata.jpg')}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ImageDisplay: {
    height: vs(150),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    width: '80%',
    marginRight: s(UI.marginMedium),
    borderRadius: ms(15),
  },
});

export default Admin;
