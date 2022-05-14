import {action, makeObservable, observable, computed} from 'mobx';

class UserData {
  state = {
    userName: '',
    userType: '',
    userEmailID: '',
    userToken: '',
    redirectUpdate: false,
    //unique ID (Android ID)
    uniqueID: '',
  };

  reset = () => {
    this.state.userName = '';
    this.state.userType = '';
    this.state.userEmailID = '';
    this.state.userToken = '';
    this.state.redirectUpdate = false;
    //unique ID (Android ID)
    this.state.uniqueID = '';
  };

  setUniqueId = val => {
    this.state.uniqueID = val;
  };

  get getUniqueId() {
    return this.state.uniqueID;
  }

  setUserType = type => {
    if (this.state.userType === '') this.state.userType = type;
  };

  get getUserType() {
    return this.state.userType;
  }

  setUserToken = token => {
    this.state.userToken = token;
  };

  get getUserToken() {
    return this.state.userToken;
  }

  setRedirectUpdate = val => {
    this.state.redirectUpdate = val;
  };

  get getRedirectUpdate() {
    return this.state.redirectUpdate;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setUserToken: action,
      getUserToken: computed,

      setUniqueId: action,
      getUniqueId: computed,

      setRedirectUpdate: action,
      getRedirectUpdate: computed,
    });
  }
}

export const USER_STORE = new UserData();
