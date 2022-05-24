import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../Utils/color';
import SubmitButton from '../Face_Collection/Button';
import ErrorCard from '../Face_Collection/ErrorMessage';
import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  FACELIST_NAME,
} from '../../Utils/Constants';
import React, {useState} from 'react';
import {FACE_STORE} from '../../Mobx/ADD_FACES_STORE';

import {NATIONALITY, GENDER, FLIGHT} from '../../Utils/PickerList';
import {Picker} from '@react-native-picker/picker';

import Requestor from '../../Lib/Requestor';
import {launchCamera} from 'react-native-image-picker';

import PagerView from 'react-native-pager-view';

const FaceDetails = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedGender, setSelectedGender] = useState(3);
  const [selectedFlight, setSelectedFlight] = useState(0);
  const [selectedNation, setSelectedNation] = useState();
  const [pageError, setpageError] = useState(0);
  const ref = React.useRef(PagerView);
  const [user_data, setUserData] = useState({
    fn: '',
    ln: '',
    alias: '',
    age: '',
    sex: '',
    nat: '',
    marks: '',
    sev: 0,
    ch: 0,
    wa: 0, //Number of Outstanding Warrent
    co: 0, //Number of conviction
    ar: 0, //Number of arrests
    fl: '', //Has flight risk
    height: '',
    weight: '',
    com: '',
    eye: '',
    p1: 'https://www.filmibeat.com/img/popcorn/profile_photos/silambarasan-20210414152430-3748.jpg',
    p2: 'https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1645696154.jpg',
    p3: 'https://igimages.gumlet.io/tamil/home/simbu-11122021a.jpg?w=376&dpr=2.6',
    cs: 'https://coimages.sciencemuseumgroup.org.uk/images/155/194/medium_1991_5083_0004.jpg',
    pid: 0,
  });

  const updateState = (key, value) => {
    setUserData(oldState => ({
      ...oldState,
      [key]: value,
    }));
  };

  let options = {
    title: 'Select Photo',
    takePhotoButtonTitle: 'Take Photo...',
    chooseFromLibraryButtonTitle: 'Choose from Library...',
    cameraType: 'back',
    mediaType: 'photo',
    maxWidth: 480,
    quality: 1,
    noData: false,
    includeBase64: true,
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        LaunchCam();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const LaunchCam = async () => {
    launchCamera(options, res => {
      console.log('Response = ', JSON.stringify(res).substring(1, 200));
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        console.log('response uritest', res.assets[0].uri);
        console.log('test', JSON.stringify(res.assets[0]).substring(1, 200));

        FACE_STORE.setName(name);
        FACE_STORE.setPhotoData(res.assets[0].base64);
        FACE_STORE.setURI({uri: res.assets[0].uri});
        AddFaceToFaceList();
      }
    });
  };

  const validatePersonalData = () => {
    if (user_data['fn'] == '') {
      setErrorMessage('Please enter First Name');
      return false;
    } else if (user_data['ln'] == '') {
      setErrorMessage('Please enter Last Name');
      return false;
    } else if (user_data['alias'] == '') {
      setErrorMessage('Please enter Alias');
      return false;
    }
    if (user_data['age'] == '') {
      setErrorMessage('Please enter age');
      return false;
    } else if (user_data['sev'] == '') {
      setErrorMessage('Please enter Crime Index');
      return false;
    } else return true;
  };

  const validateIdentifyData = () => {
    if (user_data['marks'] == '') {
      setErrorMessage('Please enter Identification marks');
      return false;
    } else if (user_data['height'] == '') {
      setErrorMessage('Please enter Height');
      return false;
    } else if (user_data['weight'] == '') {
      setErrorMessage('Please enter Weight');
      return false;
    } else if (user_data['eye'] == '') {
      setErrorMessage('Please enter Eye Color');
      return false;
    } else if (user_data['com'] == '') {
      setErrorMessage('Please enter Complexion');
      return false;
    }
    return true;
  };
  const resetValues = () => {
    setpageError('0');
    setErrorMessage('');
  };
  const validateAddlData = () => {
    if (user_data['ch'] == '') {
      setErrorMessage('Please enter No. of Charges');
      return false;
    } else if (user_data['ar'] == '') {
      setErrorMessage('Please enter No. of Arrest warrent');
      return false;
    } else if (user_data['co'] == '') {
      setErrorMessage('Please enter No. of Convicion');
      return false;
    } else if (user_data['wa'] == '') {
      setErrorMessage('Please enter No. of Outstanding Warrent');
      return false;
    }
    return true;
  };

  const validateImageData = () => {
    if (user_data['p1'] == '') {
      setErrorMessage('Please enter URL of picture 1');
      return false;
    } else if (user_data['p2'] == '') {
      setErrorMessage('Please enter URL of picture 2');
      return false;
    } else if (user_data['p3'] == '') {
      setErrorMessage('Please enter URL of picture 3');
      return false;
    }
    if (user_data['cs'] == '') {
      setErrorMessage('Please enter  URL of Charge Sheet');
      return false;
    } else return true;
  };

  const AddFaceToFaceList = () => {
    resetValues();
    if (!validatePersonalData()) {
      setpageError('1');
      console.log('page', pageError);
      ref.current.setPage(0);
    } else if (!validateIdentifyData()) {
      setpageError(2);
      ref.current.setPage(1);
    } else if (!validateAddlData()) {
      setpageError(3);
      ref.current.setPage(2);
    } else if (!validateImageData()) {
      setpageError(4);
      ref.current.setPage(3);
    } else {
      let data = {
        name: user_data.fn + ' ' + user_data.ln,
        userData: JSON.stringify(user_data),
      };
      console.log('data sent:', JSON.stringify(data));
      Requestor.request(
        API_BASE_URL + '/face/v1.0/persongroups/' + PERSON_GRP_ID + '/persons',
        'POST',
        API_KEY,
        JSON.stringify(data),
      )
        .then(res => {
          console.log('response addface', JSON.stringify(res));

          let personId = res.personId;
          AddFace(personId, user_data.p1);
          AddFace(personId, user_data.p2);
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    }
  };

  const AddFace = (personId, url) => {
    let data = {
      url: url,
    };

    Requestor.request(
      API_BASE_URL +
        '/face/v1.0/persongroups/' +
        PERSON_GRP_ID +
        '/persons/' +
        personId +
        '/persistedFaces',
      'POST',
      API_KEY,
      JSON.stringify(data),
    )
      .then(res_addFace => {
        console.log('response create face', JSON.stringify(res_addFace));
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <PagerView
      style={styles.pagerView}
      showPageIndicator={true}
      ref={ref}
      initialPage={0}>
      <View key="1">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Personal Details</Text>
          </View>
          <View style={[styles.viewRow]}>
            <View style={[styles.viewColumn]}>
              <Text style={styles.textHeader}>First Name: </Text>
              <TextInput
                style={styles.text_input}
                onChangeText={val => updateState('fn', val)}
              />
            </View>
            <View style={styles.viewColumn}>
              <Text style={styles.textHeader}>Last Name: </Text>
              <TextInput
                style={styles.text_input}
                onChangeText={val => updateState('ln', val)}
              />
            </View>
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Alias: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('alias', val)}
            />
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Age/Sex: </Text>
            <View style={styles.viewRow}>
              <TextInput
                style={styles.text_inputNum}
                onChangeText={val => updateState('age', val)}
                keyboardType="numeric"
              />
              <View style={styles.pickerView}>
                <Picker
                  selectedValue={selectedGender}
                  style={styles.picker}
                  itemStyle={{height: 50, width: 200}}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedGender(itemValue);
                    updateState('sex', itemValue);
                  }}>
                  {GENDER.map((item, index) => {
                    return (
                      <Picker.Item label={item} value={index} key={index} />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Nationality: </Text>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={selectedNation}
                style={styles.picker}
                itemStyle={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedNation(itemValue);
                  updateState('nat', itemValue);
                }}>
                {NATIONALITY.map((item, index) => {
                  return <Picker.Item label={item} value={index} key={index} />;
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Crime Index: </Text>
            <TextInput
              style={styles.text_inputNum}
              onChangeText={val => updateState('sev', val)}
              keyboardType="numeric"
            />
          </View>

          {pageError == '1' && <ErrorCard message={errorMessage} />}
          <SubmitButton AddFaceToFaceList={AddFaceToFaceList} />
          <View
            style={[styles.viewRow, {justifyContent: 'center', width: '100%'}]}>
            <Text style={styles.textDotBold}>.</Text>
            <Text style={styles.textDot}> . . .</Text>
          </View>
        </View>
      </View>
      <View key="2">
        <View style={[styles.viewColumn]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Identification Details</Text>
          </View>
          <View style={[styles.viewColumn]}>
            <Text style={styles.textHeader}>Identification Marks: </Text>
            <TextInput
              style={[styles.text_input, {width: 200, height: 100}]}
              onChangeText={val => updateState('marks', val)}
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Height: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('height', val)}
            />
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Weight: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={val => updateState('weight', val)}
            />
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Eye Color: </Text>
            <TextInput
              style={[styles.text_input, {width: 200}]}
              onChangeText={val => updateState('eye', val)}
            />
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Complexion: </Text>
            <TextInput
              style={[styles.text_input, {width: 200}]}
              onChangeText={val => updateState('com', val)}
            />
          </View>
          {pageError == '2' && (
            <View
              style={[
                styles.viewRow,
                {
                  justifyContent: 'center',
                  width: '100%',
                },
              ]}>
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
          )}
          <SubmitButton AddFaceToFaceList={AddFaceToFaceList} />
          <View
            style={[styles.viewRow, {justifyContent: 'center', width: '100%'}]}>
            <Text style={styles.textDot}>.</Text>
            <Text style={styles.textDotBold}> .</Text>
            <Text style={styles.textDot}> . .</Text>
          </View>
        </View>
      </View>
      <View key="3">
        <View style={[styles.viewColumn]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Additional Details</Text>
          </View>
          <View style={[styles.viewRow]}>
            <Text style={styles.textHeader}>Charges: </Text>

            <TextInput
              style={[styles.text_inputNum, {marginBottom: 10, marginTop: 10}]}
              onChangeText={val => updateState('ch', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Arrests: </Text>
            <TextInput
              style={[styles.text_inputNum, {marginBottom: 10}]}
              onChangeText={val => updateState('ar', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Conviction: </Text>
            <TextInput
              style={[styles.text_inputNum, {marginBottom: 10}]}
              onChangeText={val => updateState('co', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Outstanding Warrents: </Text>
            <TextInput
              style={[styles.text_inputNum, {marginBottom: 10}]}
              onChangeText={val => updateState('wa', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Flight Risk: </Text>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={selectedFlight}
                style={styles.picker}
                itemStyle={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedFlight(itemValue);
                  updateState('fl', itemValue);
                }}>
                {FLIGHT.map((item, index) => {
                  return <Picker.Item label={item} value={index} key={index} />;
                })}
              </Picker>
            </View>
          </View>
          {pageError == '3' && (
            <View
              style={[
                styles.viewRow,
                {
                  justifyContent: 'center',
                  width: '100%',
                },
              ]}>
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
          )}
          <SubmitButton AddFaceToFaceList={AddFaceToFaceList} />
          <View
            style={[styles.viewRow, {justifyContent: 'center', width: '100%'}]}>
            <Text style={styles.textDot}>. .</Text>
            <Text style={styles.textDotBold}> .</Text>
            <Text style={styles.textDot}> .</Text>
          </View>
        </View>
      </View>
      <View key="4">
        <View style={[styles.viewColumn]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Photo/Charge Sheet</Text>
          </View>
          <View style={[styles.viewRow]}>
            <Text style={styles.textHeader}>Picture 1: </Text>
            <TextInput
              style={[
                styles.text_input,
                {marginBottom: 10, width: 200, marginTop: 10},
              ]}
              onChangeText={val => updateState('p1', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Picture 2: </Text>
            <TextInput
              style={[styles.text_input, {marginBottom: 10, width: 200}]}
              onChangeText={val => updateState('p2', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Picture 3: </Text>
            <TextInput
              style={[styles.text_input, {marginBottom: 10, width: 200}]}
              onChangeText={val => updateState('p3', val)}
            />
          </View>

          <View style={styles.viewRow}>
            <Text style={styles.textHeader}>Charge Sheet: </Text>
            <TextInput
              style={[styles.text_input, {marginBottom: 10, width: 200}]}
              onChangeText={val => updateState('cs', val)}
            />
          </View>
          {pageError == '4' && (
            <View
              style={[
                styles.viewRow,
                {
                  justifyContent: 'center',
                  width: '100%',
                },
              ]}>
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
          )}
          <SubmitButton AddFaceToFaceList={AddFaceToFaceList} />
          <View
            style={[styles.viewRow, {justifyContent: 'center', width: '100%'}]}>
            <Text style={styles.textDot}>. . .</Text>
            <Text style={styles.textDotBold}> .</Text>
          </View>
        </View>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 5,
    BackgroundColor: colors.BackgroundColor,
  },
  image: {
    width: '100px',
    marginRight: '5',
    height: '200px',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  pickerView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    marginLeft: 15,
    borderRadius: 10,
    height: 40,
  },
  button: {
    padding: 10,
    margin: 20,
    height: 45,
    color: colors.ButtonColor,
    backgroundColor: 'white',
  },
  text_inputNum: {
    marginLeft: 5,
    height: 40,
    marginLeft: 15,
    borderWidth: 1,
    padding: 2,
    alignItems: 'center',
    color: colors.TextBoxColor,
    borderRadius: 8,
    borderColor: colors.BorderColor,
    width: 50,
  },
  picker: {
    height: 50,
    width: 200,
    padding: 2,
    borderRadius: 8,
    borderColor: colors.BorderColor,
    BackgroundColor: colors.BackgroundColor,
    color: 'black',
  },
  text_input: {
    height: 40,
    marginLeft: 15,
    borderWidth: 1,
    padding: 2,

    color: colors.TextBoxColor,
    borderRadius: 8,
    borderColor: colors.BorderColor,
    width: 150,
  },
  card: {
    marginVertical: 3,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.Card,
    borderRadius: 8,
    elevation: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },

  text_inputNum1: {
    height: 30,
    marginLeft: 15,
    margin: 7,
    borderWidth: 1,
    padding: 2,
    borderColor: 'gray',
    color: colors.TextHeaderColor,
    width: 70,
  },
  textDot: {
    color: colors.ButtonColor,
    fontSize: 50,
    fontWeight: '500',
    alignItems: 'center',
  },
  textDotBold: {
    color: colors.ButtonColorBold,
    fontSize: 50,
    fontWeight: '800',
  },
  textPageHeader: {
    color: colors.TextHeaderColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    color: colors.LightText,
    textShadowOffset: {width: 1, height: 3},
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  error: {
    color: colors.Error,
    fontSize: 12,
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
    width: 100,
    color: colors.TextHeaderColor,
  },
  textHeader: {
    fontWeight: '500',
    fontSize: 13,
    marginTop: 5,
    marginLeft: 15,
    width: 100,
    color: colors.TextHeaderColor,
  },
  text: {
    fontWeight: '500',
    fontSize: 12,
    marginTop: 5,
    color: colors.TextColor,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    height: 55,
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 5,
    paddingBottom: 5,
  },
  viewError: {
    flexDirection: 'row',
    backgroundColor: colors.ErrorBackgroundColor,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderColor: colors.Error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  pagerView: {
    flex: 1,
  },
  iconFE: {
    color: colors.Error,
    marginRight: 10,
  },
});

export default FaceDetails;
