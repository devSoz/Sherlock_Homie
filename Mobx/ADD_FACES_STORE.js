import {action, makeObservable, observable, computed} from 'mobx';

class InputData {
  state = {
    faceid: '',
    photo_data: '',
    uri: '',
    name: '',
    redirectUpdate: false,
    input_data: '',
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
    });
  }
}

export const FACE_STORE = new InputData();
