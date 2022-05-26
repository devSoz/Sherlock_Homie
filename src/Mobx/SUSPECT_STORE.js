import {action, makeObservable, observable, computed} from 'mobx';

class suspect {
  state = {
    suspectData: [],
    isLoading: true,
    isMain: true,
    isDetailAPI: false,
    isMainAPI: false,
    locationID: '',
  };

  reset = () => {
    this.state.suspectData = [];
    this.state.isLoading = false;
    this.state.isDetailAPI = false;
    this.state.isMainAPI = false;
    this.state.locationID = null;
  };

  setSuspectData = val => {
    this.state.suspectData = val;
  };

  get getSuspectData() {
    return this.state.suspectData;
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

  setIsDetailAPI = val => {
    this.state.isDetailAPI = val;
  };

  get getIsDetailAPI() {
    return this.state.isDetailAPI;
  }

  setLocationID = val => {
    this.state.locationID = val;
  };

  get getLocationID() {
    return this.state.locationID;
  }
  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setSuspectData: action,
      getSuspectData: computed,
      setIsLoading: action,
      getIsLoading: computed,
      setIsMain: action,
      getIsMain: computed,
      setIsMainAPI: action,
      getIsMainAPI: computed,
      setIsDetailAPI: action,
      getIsDetailAPI: computed,
      setLocationID: action,
      getLocationID: computed,
    });
  }
}

export const SUSPECT_STORE = new suspect();
