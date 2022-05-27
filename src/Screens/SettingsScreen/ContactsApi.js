import {CONTACT_STORE} from '../../Mobx/CONTACT_STORE';
import {
  BACKEND_API_BASE_URL,
  GET_CONTACT_API,
  NETWORK_ERROR,
} from '../../Utils/Constants';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

//Get contact data from database
export default function getContactsAPI() {
  CONTACT_STORE.setIsLoading(true);
  NetInfo.fetch().then(state => {
    //check if network
    if (state.isConnected === true) {
      //API call to get contact data
      axios
        .get(BACKEND_API_BASE_URL + GET_CONTACT_API, {}, {timeout: 5000})

        .then(res => {
          JSontoList(res.data);
          CONTACT_STORE.setIsLoading(false); //turn off loader
        })
        .catch(error => {
          CONTACT_STORE.setIsLoading(false);
        });
    } else {
      SUSPECT_STORE.setIsLoading(false);
      showMessage(NETWORK_ERROR);
    }
  });
}

//Function to convert JSON to list
const JSontoList = msg => {
  const contacts = [];
  msg.forEach(item => {
    const data = {
      id: item[0],
      dept: item[1],
      phone: item[4],
      position: item[5],
      name: item[3] + ' ' + item[2],
      icon: item[1],
    };
    contacts.push(data);
  });
  CONTACT_STORE.setContactData(contacts);
};
