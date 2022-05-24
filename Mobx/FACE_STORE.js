import {action, makeObservable, observable, computed} from 'mobx';

class FaceData {
  state = {
    faceid: '',
    photo_data: '',
    uri: '',
    name: '',
    redirectUpdate: false,
    face_Data: '',
    isLoading: false,
    isIdentified: false,
    isStart: true,
    isError: false,
    Message: '',
  };

  reset = () => {
    this.state.faceid = '';
    this.state.photo_data = '';
    this.state.uri = '';
    this.state.name = '';
    this.state.redirectUpdate = false;
    this.state.isLoading = false;
    this.state.isStart = true;
    this.isError = false;
    this.isIdentified = false;
    this.Message = '';
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

  setIsStart = val => {
    this.state.isStart = val;
  };

  get getIsStart() {
    return this.state.isStart;
  }
  setIsError = val => {
    this.state.isError = val;
  };

  get getIsError() {
    return this.state.isError;
  }
  setIsIdentified = val => {
    this.state.isIdentified = val;
  };

  get getIsIdentified() {
    return this.state.isIdentified;
  }

  setMessage = val => {
    this.state.Message = val;
  };

  get getMessage() {
    return this.state.Message;
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

      setIsStart: action,
      getIsStart: computed,
      setName: action,
      getName: computed,
      setIsError: action,
      getIsError: computed,
      setMessage: action,
      getMessage: computed,
    });
  }
}

export const FACE_STORE = new FaceData();
