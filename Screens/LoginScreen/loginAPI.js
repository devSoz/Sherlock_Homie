import {USER_STORE} from '../../Mobx/USER_STORE';
import {BACKEND_API_BASE_URL, LOGIN_API} from '../../Utils/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as U from '../../Utils/StorageKeys';

export default function loginAPI(username, password) {
  axios
    .get(BACKEND_API_BASE_URL + LOGIN_API, {
      params: {
        username,
        password,
      },
    })

    .then(res => {
      console.log('response xadetect' + JSON.stringify(res.data).length);
      if (JSON.stringify(res.data).length <= 5) {
        USER_STORE.setError('Invalid Username/Password');
      } else setUserData(res.data[0], username);
      //JSontoList(res.data);
    })
    .catch(error => {
      console.log(JSON.stringify(error));
    });
  //FACE_STORE.setIsLoading(false);
}

const setUserData = (userData, username) => {
  USER_STORE.reset;

  USER_STORE.setName(userData[3] + ' ' + userData[2]);
  USER_STORE.setUserName(username);
  USER_STORE.setID(userData[5]);
  USER_STORE.setPhoneNo(userData[9]);
  USER_STORE.setProfilePic(userData[4]);
  USER_STORE.setUserType(userData[7]);
  USER_STORE.setDept(userData[10]);
  USER_STORE.setEmail(userData[8]);
  AsyncStorage.setItem(U.USER_TYPE, USER_STORE.getName);
  AsyncStorage.setItem(U.USER_KEY, USER_STORE.getUserName);
  AsyncStorage.setItem(U.USER_FULL_NAME, USER_STORE.getName);
  AsyncStorage.setItem(U.USER_EMAILID, USER_STORE.getEmail);
  AsyncStorage.setItem(U.USER_PROFILE, USER_STORE.getProfilePic);
  AsyncStorage.setItem(U.USER_ID, USER_STORE.getID);
  AsyncStorage.setItem(U.USER_PHONE, USER_STORE.getPhoneNo);
  AsyncStorage.setItem(U.USER_DEPT, USER_STORE.getDept);

  console.log('check key', USER_STORE.getDept);

  console.log('check key', AsyncStorage.getItem(U.USER_KEY));
  console.log('img', AsyncStorage.getItem(U.USER_PROFILE));
};
