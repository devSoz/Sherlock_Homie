import {
  NETWORK_ERROR,
  SUSPECTDATA_API,
  BACKEND_API_BASE_URL,
} from '../../Utils/Constants';
import {SUSPECT_STORE} from '../../Mobx/SUSPECT_STORE';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

//Function to show alerts
const showMessage = message => {
  Alert.alert('Sherlock-Homie', message);
};

//Method for API call to get details of the
//identified suspects in a selected location
export const getReportDataAPI = async () => {
  SUSPECT_STORE.setIsLoading(true);
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      axios
        .get(BACKEND_API_BASE_URL + SUSPECTDATA_API, {
          params: {
            location_ID: SUSPECT_STORE.getLocationID,
          },
        })

        .then(res => {
          JSontoList(res.data);
          SUSPECT_STORE.setIsLoading(false);
          SUSPECT_STORE.setIsDetailAPI(true);
        })
        .catch(error => {
          SUSPECT_STORE.setIsLoading(false);
          SUSPECT_STORE.setIsDetailAPI(true);
          showMessage(JSON.stringify(error));
        });
    } else {
      showMessage(NETWORK_ERROR);
      SUSPECT_STORE.setIsLoading(false);
      SUSPECT_STORE.setIsDetailAPI(true);
    }
  });
};

//Function to convert JSON data to list
const JSontoList = msg => {
  const suspects = [];

  msg.forEach(item => {
    const data = {
      FullName: item[3],
      Alias: item[4],
      ProfileURL: item[5],
      DateReported: item[6],
      CrimeIndex: item[7],
      ConfLevel: item[8],
    };
    suspects.push(data);
  });

  SUSPECT_STORE.setSuspectData(suspects);
};
