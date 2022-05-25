import {action, makeObservable, observable, computed} from 'mobx';

class suspect {
  state = {
    suspectData: [],
    isLoading: false,
  };

  reset = () => {
    this.state.suspectData = [];
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
  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setSuspectData: action,
      getSuspectData: computed,
      setIsLoading: action,
      getIsLoading: computed,
    });
  }
}

export const SUSPECT_STORE = new suspect();
