import {action, makeObservable, observable, computed} from 'mobx';

//Store for AddFaces screen
class InputData {
  state = {
    //input data
    faceid: '',
    photo_data: '',
    uri: '',
    name: '',
    redirectUpdate: false,
    input_data: '',
    isMain: false, //If true, shows the Admin screen options
    isAdmin: true, //If true, navigates to add faces screen
    isTrainAPI: false, //Will be set true if API call is done
    isMainAPI: false, //Will be set true if API call is done
    isLoading: true,
  };

  reset = () => {
    this.state.faceid = '';
    this.state.photo_data = '';
    this.state.uri = '';
    this.state.name = '';
    this.state.redirectUpdate = false;
    this.state.isLoading = false;
    this.input_data = '';
    this.state.isTrainAPI = false;
    this.state.isMainAPI = false;
    this.state.isAdmin = true;
    this.state.isMain = false;
  };

  setFaceID = val => {
    this.state.faceid = val;
  };

  get getFaceID() {
    return this.state.faceid;
  }

  setPhotoData = val => {
    this.state.photo_data = val;
  };

  get getPhotoData() {
    return this.state.photo_data;
  }

  setInputData = val => {
    this.state.input_data = val;
  };

  get getInputData() {
    return this.state.input_data;
  }
  setURI = val => {
    this.state.uri = val;
  };

  get getURI() {
    return this.state.uri;
  }

  setName = val => {
    this.state.name = val;
  };

  get getName() {
    return this.state.name;
  }

  setRedirectUpdate = val => {
    this.state.redirectUpdate = val;
  };

  get getRedirectUpdate() {
    return this.state.redirectUpdate;
  }

  setIsLoading = val => {
    this.state.isLoading = val;
  };

  get getIsLoading() {
    return this.state.isLoading;
  }

  setIsMain = val => {
    this.state.isMain = val;
  };

  get getIsMain() {
    return this.state.isMain;
  }

  setIsMainAPI = val => {
    this.state.isMainAPI = val;
  };

  get getIsMainAPI() {
    return this.state.isMainAPI;
  }

  setIsTrainAPI = val => {
    this.state.isTrainAPI = val;
  };

  get getIsTrainAPI() {
    return this.state.isTrainAPI;
  }
  setIsAdmin = val => {
    this.state.isAdmin = val;
  };

  get getIsAdmin() {
    return this.state.isAdmin;
  }
  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setFaceID: action,
      getFaceID: computed,
      setInputData: action,
      getInputData: computed,
      setPhotoData: action,
      getPhotoData: computed,

      setURI: action,
      getURI: computed,
      setIsLoading: action,
      getIsLoading: computed,

      setName: action,
      getName: computed,
      setIsAdmin: action,
      getIsAdmin: computed,
      setIsMain: action,
      getIsMain: computed,
      setIsMainAPI: action,
      getIsMainAPI: computed,
      setIsTrainAPI: action,
      getIsTrainAPI: computed,
    });
  }
}

export const ADD_FACES_STORE = new InputData();
