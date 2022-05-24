import {observer} from 'mobx-react';
import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  NETWORK_ERROR,
  TRAIN_API,
} from '../../Utils/Constants';
import {Alert} from 'react-native';
import {FACE_STORE} from '../../Mobx/FACE_STORE';
import Requestor from '../../Lib/Requestor';
import NetInfo from '@react-native-community/netinfo';
const showMessage = message => {
  Alert.alert('Sherlock-Homie', message);
};

export const TrainAPI = async () => {
  NetInfo.fetch().then(state => {
    console.log(API_BASE_URL + TRAIN_API + PERSON_GRP_ID + '/train');
    if (state.isConnected === true) {
      Requestor.request(
        API_BASE_URL + TRAIN_API + PERSON_GRP_ID + '/train',
        'POST',
        API_KEY,
      )
        .then(res => {
          console.log('train' + JSON.stringify(res));

          showMessage(JSON.stringify(res));
        })
        .catch(function (error) {
          showMessage(JSON.stringify(error.message));
        });
    } else {
      showMessage(NETWORK_ERROR);
    }
  });
};
