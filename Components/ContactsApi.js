import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../Utils/color';
import {CONTACT_STORE} from '../Mobx/CONTACT_STORE';
import {BACKEND_API_BASE_URL, GET_CONTACT_API} from '../Utils/Constants';
import axios from 'axios';
import {observer} from 'mobx-react';

//export const getContactsAPI = async () => {
export default function getContactsAPI() {
  console.log(BACKEND_API_BASE_URL + GET_CONTACT_API);
  axios
    .get(BACKEND_API_BASE_URL + GET_CONTACT_API, {}, {timeout: 5000})

    .then(res => {
      console.log('response detect' + JSON.stringify(res.data));
      console.log('response detect test' + JSON.stringify(res.data[0][2]));
      JSontoList(res.data);
    })
    .catch(error => {
      console.log(JSON.stringify(error));
    });
  //FACE_STORE.setIsLoading(false);
}

const JSontoList = msg => {
  const contacts = [];
  msg.forEach(item => {
    const data = {
      name: item[4],
      text: item[3] + ' ' + item[2],
      icon: "require('../Images/person.png')",
    };
    contacts.push(data);

    // text.push(item[0]);
    // name.push(item[4]);
    // pic.push(require('../Images/person.png'));
  });
  CONTACT_STORE.setContactData(contacts);

  /* const data = {
    text: text,
    name: name,
    icon: pic,
  };*/

  console.log('arrary', JSON.stringify(CONTACT_STORE.getContactData));
};
