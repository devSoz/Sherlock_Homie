import {observer} from 'mobx-react';
import {
  NETWORK_ERROR,
  SUSPECTDATA_API,
  BACKEND_API_BASE_URL,
  SUCCESS_MESSAGE,
} from '../../Utils/Constants';
import {Alert} from 'react-native';
import {SUSPECT_STORE} from '../../Mobx/SUSPECT_STORE';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
const getDate = () => {
  var date = new Date();
  console.log('date', date.toString());
  return date.toString();
};
const showMessage = message => {
  // Alert.alert('Sherlock-Homie', message);
  console.log(message);
};

export const getReportDataAPI = async () => {
  SUSPECT_STORE.setIsLoading(true);
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      // console.log(SUSPECT_STORE.getLocationID);
      axios
        .get(BACKEND_API_BASE_URL + SUSPECTDATA_API, {
          params: {
            Location_ID: SUSPECT_STORE.getLocationID,
          },
        })

        .then(res => {
          //showMessage(SUCCESS_MESSAGE);
          console.log(JSON.stringify(res.data[0]));
          JSontoList(res.data);
          SUSPECT_STORE.setIsLoading(false);
          SUSPECT_STORE.setIsDetailAPI(true);
          console.log(
            'response detect' + JSON.stringify(SUSPECT_STORE.getSuspectData),
          );
        })
        .catch(error => {
          SUSPECT_STORE.setIsLoading(false);
          showMessage(JSON.stringify(error));
        });
    } else {
      showMessage(NETWORK_ERROR);
      SUSPECT_STORE.setIsLoading(false);
    }
  });
};

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

    // text.push(item[0]);
    // name.push(item[4]);
    // pic.push(require('../Images/person.png'));
  });

  SUSPECT_STORE.setSuspectData(suspects);

  console.log('arrary', JSON.stringify(SUSPECT_STORE.getSuspectData));
};
