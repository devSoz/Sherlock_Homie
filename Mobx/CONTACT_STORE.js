import {action, makeObservable, observable, computed} from 'mobx';

class contact {
  state = {
    contactData: [],
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

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setContactData: action,
      getContactData: computed,
    });
  }
}

export const CONTACT_STORE = new contact();
