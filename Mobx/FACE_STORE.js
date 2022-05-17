import {action, makeObservable, observable, computed} from 'mobx';

class FaceData {
  state = {
    faceid: '',
    photo_data: '',
    uri: '',
    name: '',
    redirectUpdate: false,
    face_Data: '',
    isLoading: true,
    isVisible: false,
  };

  reset = () => {
    this.state.faceid = '';
    this.state.photo_data = '';
    this.state.uri = '';
    this.state.name = '';
    this.state.redirectUpdate = false;
    this.state.isLoading = false;
    this.state.isVisible = false;
    this.face_Data = '';
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

  setFaceData = val => {
    this.state.face_Data = val;
  };

  get getFaceData() {
    return this.state.face_Data;
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

  setIsVisbile = val => {
    this.state.isVisible = val;
  };

  get getIsVisible() {
    return this.state.isVisible;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setFaceID: action,
      getFaceID: computed,
      setFaceData: action,
      getFaceData: computed,
      setPhotoData: action,
      getPhotoData: computed,

      setURI: action,
      getURI: computed,
      setIsLoading: action,
      getIsLoading: computed,

      setIsVisbile: action,
      getIsVisible: computed,
      setName: action,
      getName: computed,
    });
  }
}

export const FACE_STORE = new FaceData();
