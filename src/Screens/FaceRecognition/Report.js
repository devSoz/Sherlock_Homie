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

//Method to get current data as string
const getDate = () => {
  var date = new Date();
  return date.toString();
};

//Method to show alert
const showMessage = message => {
  Alert.alert('Sherlock-Homie', message);
};

//Function to report identified suspects to the database to store them
export const ReportAPI = async (locationid, personid, conf, reportedby) => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
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
