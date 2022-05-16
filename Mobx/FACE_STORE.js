import {action, makeObservable, observable, computed} from 'mobx';

class FaceData {
  state = {
    faceid: '',
    photo_data: '',
    uri: '',
    name: '',
    redirectUpdate: false,
    face_Data: ''
  };

  reset = () => {
    this.state.faceid = '';
    this.state.photo_data = '';
    this.state.uri = '';
    this.state.name = '';
    this.state.redirectUpdate = false;
    this.face_Data='';
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

      setName: action,
      getName: computed,
    });
  }
}

export const FACE_STORE = new FaceData();
