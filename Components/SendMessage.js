import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../Utils/color';
import SendSMS from 'react-native-sms';

export default function SendMessage(bodySMS, mobileNumber) {
  //if (mobileNumber.length != 10) {
  //  alert('Please insert correct contact number');
  // return;
  //}

  SendSMS.send(
    {
      body: bodySMS,
      // Recipients Number
      recipients: [mobileNumber],
      // An array of types
      // "completed" response when using android
      successTypes: ['sent', 'queued'],
    },
    (completed, cancelled, error) => {
      if (completed) {
        console.log('SMS Sent Completed');
      } else if (cancelled) {
        console.log('SMS Sent Cancelled');
      } else if (error) {
        console.log('Some error occured');
      }
    },
  );
}
