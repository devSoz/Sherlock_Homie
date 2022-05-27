import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  NETWORK_ERROR,
  TRAIN_API,
} from '../../Utils/Constants';
import {Alert} from 'react-native';
import Requestor from '../../Lib/Requestor';
import NetInfo from '@react-native-community/netinfo';

//SHow alert message
const showMessage = message => {
  Alert.alert('Sherlock-Homie', message);
};

//API call to submit for training data
export const TrainAPI = async () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      Requestor.request(
        API_BASE_URL + TRAIN_API + PERSON_GRP_ID + '/train',
        'POST',
        API_KEY,
      )
        .then(res => {
          showMessage('Submitted for training');
        })
        .catch(function (error) {
          showMessage(JSON.stringify(error.message));
        });
    } else {
      showMessage(NETWORK_ERROR);
    }
  });
};
