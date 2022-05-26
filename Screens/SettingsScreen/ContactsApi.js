import {CONTACT_STORE} from '../../Mobx/CONTACT_STORE';
import {BACKEND_API_BASE_URL, GET_CONTACT_API} from '../../Utils/Constants';
import axios from 'axios';
import {observer} from 'mobx-react';

export default function getContactsAPI() {
  CONTACT_STORE.setIsLoading(true);
  axios
    .get(BACKEND_API_BASE_URL + GET_CONTACT_API, {}, {timeout: 5000})

    .then(res => {
      console.log('response detect' + JSON.stringify(res.data));
      console.log('response detect test' + JSON.stringify(res.data[0][2]));
      JSontoList(res.data);
      CONTACT_STORE.setIsLoading(false);
      console.log('inside', CONTACT_STORE.getIsLoading);
    })
    .catch(error => {
      CONTACT_STORE.setIsLoading(false);
      console.log('error', CONTACT_STORE.getIsLoading);
    });
}

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
  console.log('arrary', JSON.stringify(CONTACT_STORE.getContactData));
};