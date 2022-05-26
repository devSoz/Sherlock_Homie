import {
  NETWORK_ERROR,
  REPORT_API,
  BACKEND_API_BASE_URL,
  SUCCESS_MESSAGE,
} from '../../Utils/Constants';
import {Alert} from 'react-native';
import {FACE_STORE} from '../../Mobx/FACE_STORE';
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

export const ReportAPI = async (locationid, personid, conf, reportedby) => {
  console.log('locaion', locationid);
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      //console.log(DETECT_API);
      axios
        .post(
          BACKEND_API_BASE_URL + REPORT_API,
          {
            Location_ID: locationid,
            Person_ID: personid,
            FullName:
              FACE_STORE.getFaceData.ln + ',' + FACE_STORE.getFaceData.fn,
            Alias: FACE_STORE.getFaceData.alias,
            ProfileUrl: FACE_STORE.getFaceData.p1,
            DateReported: getDate(),
            CrimeIndex: FACE_STORE.getFaceData.sev,
            Confidence: conf,
            ReportedBy: reportedby,
          },
          {timeout: 5000},
        )

        .then(res => {
          console.log('response detect' + JSON.stringify(res));
          showMessage(SUCCESS_MESSAGE);
          FACE_STORE.setIsReported(true);
        })
        .catch(error => {
          showMessage(JSON.stringify(error));
        });
    } else {
      showMessage(NETWORK_ERROR);
    }
  });
};
