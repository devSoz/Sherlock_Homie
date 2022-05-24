import {action, makeObservable, observable, computed} from 'mobx';

class UserData {
  state = {
    userName: null,
    userType: null,
    userEmailID: null,
    name: null,
    profilePic: null,
    ID: null,
    phoneNo: null,
    dept: null,
    error: '',
    //unique ID (Android ID)
    uniqueID: null,
    splash: true,
  };

  reset = () => {
    this.state.userName = null;
    this.state.userType = null;
    this.state.userEmailID = null;
    this.state.phoneNo = null;
    this.state.ID = null;
    this.state.profilePic = null;
    this.state.name = null;
    this.state.error = '';
    //unique ID (Android ID)
    this.state.uniqueID = null;
    this.state.dept = null;
  };

  setUserName = val => {
    this.state.userName = val;
  };
  get getUserName() {
    return this.state.userName;
  }

  setDept = val => {
    this.state.dept = val;
  };

  get getDept() {
    return this.state.dept;
  }

  setPassword = val => {
    this.state.password = val;
  };

  get getPassword() {
    return this.state.password;
  }

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

  setError = val => {
    this.state.error = val;
  };

  get getError() {
    return this.state.error;
  }

  setName = val => {
    this.state.name = val;
  };

  get getName() {
    return this.state.name;
  }

  setID = val => {
    this.state.ID = val;
  };

  get getID() {
    return this.state.ID;
  }
  setEmail = val => {
    this.state.userEmailID = val;
  };

  get getEmail() {
    return this.state.userEmailID;
  }
  setProfilePic = val => {
    this.state.profilePic = val;
  };

  get getProfilePic() {
    return this.state.profilePic;
  }

  setPhoneNo = val => {
    this.state.phoneNo = val;
  };

  get getPhoneNo() {
    return this.state.phoneNo;
  }

  setSplash = val => {
    this.state.splash = val;
  };

  get getSplash() {
    return this.state.splash;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      getUserName: computed,
      setUserName: action,

      getPassword: computed,
      setPassword: action,

      setUserType: action,
      getUserType: computed,

      setName: action,
      getName: computed,

      setID: action,
      getID: computed,

      setProfilePic: action,
      getProfilePic: computed,

      setPhoneNo: action,
      getPhoneNo: computed,

      setUniqueId: action,
      getUniqueId: computed,

      setDept: action,
      getDept: computed,

      setEmail: action,
      getEmail: computed,

      setSplash: action,
      getSplash: computed,

      setError: action,
      getError: computed,
    });
  }
}

export const USER_STORE = new UserData();
