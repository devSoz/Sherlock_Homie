import {
  NETWORK_ERROR,
  SUSPECT_API,
  BACKEND_API_BASE_URL,
} from '../../Utils/Constants';
import {Alert} from 'react-native';
import {SUSPECT_STORE} from '../../Mobx/SUSPECT_STORE';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

//Method to show alerts
const showMessage = message => {
  Alert.alert('Sherlock-Homie', message);
};

//Reset flags for loader and detailview
const reset = () => {
  SUSPECT_STORE.setIsLoading(false);
  SUSPECT_STORE.setIsDetailAPI(false);
};

//API call
export const ReportSummaryAPI = async () => {
  SUSPECT_STORE.setIsLoading(true);
  NetInfo.fetch().then(state => {
    //Check net connection
    if (state.isConnected === true) {
      //api call to get summary
      axios
        .get(BACKEND_API_BASE_URL + SUSPECT_API, {}, {timeout: 5000})
        .then(res => {
          JSontoList(res.data);
          reset();
          SUSPECT_STORE.setIsMainAPI(true);
        })
        .catch(error => {
          reset();
          showMessage(JSON.stringify(error));
        });
    } else {
      reset();
      showMessage(NETWORK_ERROR);
    }
  });
};

//Function to convert JSON to list
const JSontoList = msg => {
  const suspects = [];

  msg.forEach(item => {
    const data = {
      count: '#' + item[0],
      name: item[1],
      location: item[2],
      latitude: parseFloat(item[3].substring(0, item[3].search(' '))),
      longitude: parseFloat(item[3].substring(11, 18)),
      id: item[4],
    };
    suspects.push(data);
  });

  SUSPECT_STORE.setSuspectData(suspects);
};
