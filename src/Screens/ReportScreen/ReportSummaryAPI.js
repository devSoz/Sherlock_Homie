import {observer} from 'mobx-react';
import {
  NETWORK_ERROR,
  SUSPECT_API,
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
  Alert.alert('Sherlock-Homie', message);
};

export const ReportSummaryAPI = async () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      //console.log(DETECT_API);
      axios
        .get(BACKEND_API_BASE_URL + SUSPECT_API, {}, {timeout: 5000})

        .then(res => {
          //showMessage(SUCCESS_MESSAGE);
          console.log(JSON.stringify(res.data[0]));
          JSontoList(res.data);
          SUSPECT_STORE.setIsLoading(false);
          SUSPECT_STORE.setIsMainAPI(true);
          console.log(
            'response detect' + JSON.stringify(SUSPECT_STORE.getSuspectData),
          );
        })
        .catch(error => {
          SUSPECT_STORE.setIsLoading(false);
          showMessage(JSON.stringify(error));
        });
    } else {
      SUSPECT_STORE.setIsLoading(false);
      showMessage(NETWORK_ERROR);
    }
  });
};

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

    // text.push(item[0]);
    // name.push(item[4]);
    // pic.push(require('../Images/person.png'));
  });

  SUSPECT_STORE.setSuspectData(suspects);

  console.log('arrary', JSON.stringify(SUSPECT_STORE.getSuspectData));
};
