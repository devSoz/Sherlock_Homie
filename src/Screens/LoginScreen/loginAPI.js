import {USER_STORE} from '../../Mobx/USER_STORE';
import {
  BACKEND_API_BASE_URL,
  LOGIN_API,
  NETWORK_ERROR,
} from '../../Utils/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as U from '../../Utils/StorageKeys';
import NetInfo from '@react-native-community/netinfo';

//Login API file
export default function loginAPI(username, password) {
  USER_STORE.setIsLoading(true);
  NetInfo.fetch().then(state => {
    //Check if there is network connection
    if (state.isConnected === true) {
      axios
        .get(BACKEND_API_BASE_URL + LOGIN_API, {
          //Username and password is passed as
          //params to check the validity of the user and their role (admin or user)
          params: {
            username,
            password,
          },
        })
        .then(res => {
          if (JSON.stringify(res.data).length <= 5) {
            USER_STORE.setError('Invalid Username/Password');
            USER_STORE.setIsLoading(false);
          } else {
            setUserData(res.data[0], username);
            USER_STORE.setIsLoading(false);
          }
        })
        .catch(error => {
          USER_STORE.setIsLoading(false);
        });
    } else {
      SUSPECT_STORE.setIsLoading(false);
      showMessage(NETWORK_ERROR);
    }
  });
}

//Function to set USER_STORE and async storage
const setUserData = (userData, username) => {
  USER_STORE.reset;
  USER_STORE.setCategory(userData[0]);
  USER_STORE.setLocationName(userData[1]);
  USER_STORE.setLocation(userData[5]);
  USER_STORE.setName(userData[10] + ' ' + userData[9]);
  USER_STORE.setID(userData[12]);
  USER_STORE.setPhoneNo(userData[16]);
  USER_STORE.setProfilePic(userData[11]);
  USER_STORE.setUserType(userData[14]);
  USER_STORE.setDept(userData[17]);
  USER_STORE.setEmail(userData[15]);
  USER_STORE.setLocation_ID(userData[19].toString());

  AsyncStorage.setItem(U.USER_TYPE, USER_STORE.getUserType);
  AsyncStorage.setItem(U.USER_KEY, username);
  AsyncStorage.setItem(U.USER_FULL_NAME, USER_STORE.getName);
  AsyncStorage.setItem(U.USER_EMAILID, USER_STORE.getEmail);
  AsyncStorage.setItem(U.USER_PROFILE, USER_STORE.getProfilePic);
  AsyncStorage.setItem(U.USER_ID, USER_STORE.getID);
  AsyncStorage.setItem(U.USER_PHONE, USER_STORE.getPhoneNo);
  AsyncStorage.setItem(U.USER_DEPT, USER_STORE.getDept);
  AsyncStorage.setItem(U.LOCATION, USER_STORE.getLocation);
  AsyncStorage.setItem(U.LOCATION_CATEGORY, USER_STORE.getCategory);
  AsyncStorage.setItem(U.LOCATION_ID, USER_STORE.getLocation_ID);
  AsyncStorage.setItem(U.LOCATION_Name, USER_STORE.getLocationName);

  USER_STORE.setUserName(username);
};
