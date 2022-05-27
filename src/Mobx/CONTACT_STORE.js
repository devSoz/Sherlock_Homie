import {action, makeObservable, observable, computed} from 'mobx';

//Store for contacts screen
class contact {
  state = {
    contactData: [], //Contact details
    isLoading: false, //Storing state of loading of contact details
    //to display the status through lottie
  };

  reset = () => {
    this.state.contactData = [];
  };

  setContactData = val => {
    this.state.contactData = val;
  };

  get getContactData() {
    return this.state.contactData;
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
      setContactData: action,
      getContactData: computed,
      setIsLoading: action,
      getIsLoading: computed,
    });
  }
}

export const CONTACT_STORE = new contact();
