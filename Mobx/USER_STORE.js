import {action, makeObservable, observable, computed} from 'mobx';

class UserData {
  state = {
    userName: '',
    userType: '',
    userEmailID: '',
    name: '',
    profilePic: '',
    ID: '',
    phoneNo: '',
    dept: '',
    error: '',
    //unique ID (Android ID)
    uniqueID: '',
  };

  reset = () => {
    this.state.userName = '';
    this.state.userType = '';
    this.state.userEmailID = '';
    this.state.phoneNo = '';
    this.state.ID = '';
    this.state.profilePic = '';
    this.state.name = '';
    this.state.error = '';
    //unique ID (Android ID)
    this.state.uniqueID = '';
    this.state.dept = '';
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

      setError: action,
      getError: computed,
    });
  }
}

export const USER_STORE = new UserData();
