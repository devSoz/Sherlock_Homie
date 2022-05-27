import {Text, View, TextInput} from 'react-native';
import * as colors from '../../Utils/color';
import SubmitButton from '../../Components/Button';
import ErrorCard from '../../Components/ErrorMessage';
import {API_BASE_URL, API_KEY, PERSON_GRP_ID} from '../../Utils/Constants';
import React, {useState} from 'react';
import * as UI from '../../Utils/UIConstants';
import {NATIONALITY, GENDER, FLIGHT} from '../../Utils/PickerList';
import {Picker} from '@react-native-picker/picker';
import Requestor from '../../Lib/Requestor';
import PagerView from 'react-native-pager-view';
import Header from '../../Components/HeaderBack';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';
import * as H from '../../Utils/help';
import {ADD_FACES_STORE} from '../../Mobx/ADD_FACES_STORE';

const FaceDetails = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedGender, setSelectedGender] = useState(3);
  const [selectedFlight, setSelectedFlight] = useState(0);
  const [selectedNation, setSelectedNation] = useState();
  const [pageError, setpageError] = useState(0);
  const ref = React.useRef(PagerView);

  //user_data collection holds the form data.
  //Name is given short form due to length restriction of user data in azure.
  const [user_data, setUserData] = useState({
    fn: '', //First Name
    ln: '', //Last Name
    alias: '', //Alias
    age: '',
    sex: '',
    nat: '', //Nationality
    marks: '', //Identification mark
    sev: 0, //Crime index
    ch: 0, //Charges
    wa: 0, //Number of Outstanding Warrent
    co: 0, //Number of conviction
    ar: 0, //Number of arrests
    fl: '', //Has flight risk
    height: '',
    weight: '',
    com: '', //Complexion
    eye: '', //Eye Color
    //Below fields hold url of the picture and the cs refers to charge sheet
    p1: '',
    p2: '',
    p3: '',
    cs: '',
    pid: 0,
  });

  //Update user_data state variable
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

  //Function to validate if user has entered all mandatory fields of Personal data
  //, else show warning message
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

  //Function to validate if user has entered all mandatory fields of Identification data
  //, else show warning message
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

  //Function to validate if user has entered all mandatory fields of additional data
  //, else show warning message
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

  //Function to validate if user has entered all mandatory fields of Image and Chargesheet details
  //, else show warning message
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

  //Function to check mandatory fields and upload data into Azure
  const AddFaceToFaceList = () => {
    resetValues();
    if (!validatePersonalData()) {
      setpageError('1');
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
      //construct to add person details
      let data = {
        name: user_data.fn + ' ' + user_data.ln,
        userData: JSON.stringify(user_data),
      };
      //API call to add person details
      Requestor.request(
        API_BASE_URL + '/face/v1.0/persongroups/' + PERSON_GRP_ID + '/persons',
        'POST',
        API_KEY,
        JSON.stringify(data),
      )
        .then(res => {
          let personId = res.personId;
          //Calls AddFace function to add picture1 of the person into Azure
          AddFace(personId, user_data.p1);
          //Calls AddFace function to add picture2 of the person into Azure
          AddFace(personId, user_data.p2);
          //Calls AddFace function to add picture3 of the person into Azure
          AddFace(personId, user_data.p3);
          alert('Added the data');
          ADD_FACES_STORE.setIsMain(false);
          ADD_FACES_STORE.setIsMainAPI(false);
          ADD_FACES_STORE.setIsAdmin(true);
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    }
  };

  //Function to add picture of the person for training
  const AddFace = async (personId, url) => {
    let data = {
      url: url,
    };

    //API calll to add face of the person
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
        console.log('create face', JSON.stringify(res_addFace));
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  //Function to reset Error Data
  const resetValues = () => {
    setpageError('0');
    setErrorMessage('');
  };

  return (
    <PagerView
      style={styles.pagerView}
      showPageIndicator={true}
      ref={ref}
      initialPage={0}>
      <View key="1">
        <View style={styles.container}>
          <Header headerText="Personal Details" toolTip={H.ADD_1} />
          <View style={[styles.viewRow]}>
            <View style={[styles.viewColumn]}>
              <Text style={styles.textHeader}>First Name: </Text>
              <TextInput
                maxLength={50}
                style={styles.text_input}
                onChangeText={val => updateState('fn', val)}
              />
            </View>
            <View style={styles.viewColumn}>
              <Text style={styles.textHeader}>Last Name: </Text>
              <TextInput
                maxLength={50}
                style={styles.text_input}
                onChangeText={val => updateState('ln', val)}
              />
            </View>
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Alias: </Text>
            <TextInput
              maxLength={50}
              style={styles.text_input}
              onChangeText={val => updateState('alias', val)}
            />
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.textHeader}>Age/Sex: </Text>
            <View style={styles.viewRow}>
              <TextInput
                maxLength={3}
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
            <Text style={styles.textHeader}>Crime Index(0-9) 9 is High: </Text>
            <TextInput
              style={styles.text_inputNum}
              maxLength={1}
              onChangeText={val => updateState('sev', val)}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.viewColumn, {width: '100%'}]}>
            {pageError == '1' && <ErrorCard message={errorMessage} />}
            <SubmitButton AddFaceToFaceList={AddFaceToFaceList} />
            <View
              style={[
                styles.viewRow,
                {
                  justifyContent: 'center',
                  width: '100%',
                  alignContent: 'flex-end',
                },
              ]}>
              <Text style={styles.textDotBold}>.</Text>
              <Text style={styles.textDot}> . . .</Text>
            </View>
          </View>
        </View>
      </View>
      <View key="2">
        <Header headerText="Identification Details" toolTip={H.ADD_2} />
        <View style={[styles.viewColumn]}>
          <Text style={styles.textHeader}>Identification Marks:</Text>
          <TextInput
            maxLength={150}
            style={[styles.text_input, {width: 200, height: 100}]}
            onChangeText={val => updateState('marks', val)}
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.viewColumn}>
          <Text style={styles.textHeader}>Height: </Text>
          <TextInput
            maxLength={50}
            style={styles.text_input}
            onChangeText={val => updateState('height', val)}
          />
        </View>
        <View style={styles.viewColumn}>
          <Text style={styles.textHeader}>Weight: </Text>
          <TextInput
            maxLength={50}
            style={styles.text_input}
            onChangeText={val => updateState('weight', val)}
          />
        </View>
        <View style={styles.viewColumn}>
          <Text style={styles.textHeader}>Eye Color: </Text>
          <TextInput
            maxLength={50}
            style={[styles.text_input, {width: 200}]}
            onChangeText={val => updateState('eye', val)}
          />
        </View>
        <View style={styles.viewColumn}>
          <Text style={styles.textHeader}>Complexion: </Text>
          <TextInput
            maxLength={50}
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
      <View key="3">
        <Header headerText="Additional Details" toolTip={H.ADD_3} />
        <View style={[styles.viewColumn]}>
          <View style={[styles.viewRow]}>
            <Text style={styles.textHeaderFixed}>Charges: </Text>

            <TextInput
              maxLength={3}
              style={[styles.text_inputNum, {marginBottom: 10, marginTop: 10}]}
              onChangeText={val => updateState('ch', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeaderFixed}>Arrests: </Text>
            <TextInput
              maxLength={3}
              style={[styles.text_inputNum, {marginBottom: 10}]}
              onChangeText={val => updateState('ar', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeaderFixed}>Conviction: </Text>
            <TextInput
              maxLength={3}
              style={[styles.text_inputNum, {marginBottom: 10}]}
              onChangeText={val => updateState('co', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeaderFixed}>Outstanding Warrents: </Text>
            <TextInput
              maxLength={3}
              style={[styles.text_inputNum, {marginBottom: 10}]}
              onChangeText={val => updateState('wa', val)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeaderFixed}>Flight Risk: </Text>
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
        <Header headerText="Photo/Charge Sheet" toolTip={H.ADD_4} />
        <View style={[styles.viewColumn]}>
          <View style={[styles.viewRow]}>
            <Text style={styles.textHeaderFixed}>Picture 1: </Text>
            <TextInput
              maxLength={150}
              style={[
                styles.text_input,
                {marginBottom: 10, width: 200, marginTop: 10},
              ]}
              onChangeText={val => updateState('p1', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeaderFixed}>Picture 2: </Text>
            <TextInput
              maxLength={150}
              style={[styles.text_input, {marginBottom: 10, width: 200}]}
              onChangeText={val => updateState('p2', val)}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textHeaderFixed}>Picture 3: </Text>
            <TextInput
              maxLength={150}
              style={[styles.text_input, {marginBottom: 10, width: 200}]}
              onChangeText={val => updateState('p3', val)}
            />
          </View>

          <View style={styles.viewRow}>
            <Text style={styles.textHeaderFixed}>Charge Sheet: </Text>
            <TextInput
              maxLength={150}
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

const styles = ScaledSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingBottom: vs(UI.paddingSmall),
    BackgroundColor: colors.BackgroundColor,
  },
  image: {
    width: '100px',
    marginRight: '5@s',
    height: '200px',
    borderRadius: ms(UI.borderRadiusMedium),
    backgroundColor: 'white',
  },
  pickerView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    marginLeft: s(UI.marginMedium),
    borderRadius: ms(UI.borderRadiusMedium),
    height: '40@vs',
  },
  button: {
    padding: s(UI.paddingSmall),
    margin: s(UI.marginMedium),
    height: '45@vs',
    color: colors.ButtonColor,
    backgroundColor: 'white',
  },
  text_inputNum: {
    marginLeft: s(UI.marginSmall),
    height: '40@vs',
    marginLeft: s(UI.marginMedium),
    borderWidth: 1,
    padding: 2,
    alignItems: 'center',
    color: colors.TextBoxColor,
    borderRadius: ms(UI.borderRadiusMedium),
    borderColor: colors.BorderColor,
    width: '50@s',
  },
  picker: {
    height: '50@vs',
    width: '200@s',
    borderRadius: ms(UI.borderRadiusMedium),
    borderColor: colors.BorderColor,
    BackgroundColor: colors.BackgroundColor,
    color: 'black',
  },
  text_input: {
    height: '40@vs',
    marginLeft: s(UI.marginMedium),
    borderWidth: 1,
    padding: 2,
    color: colors.TextBoxColor,
    borderRadius: ms(UI.borderRadiusMedium),
    borderColor: colors.BorderColor,
    width: '150@s',
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
    fontSize: ms(UI.fontSizeBig),
    fontWeight: 'bold',
  },
  headerText: {
    color: colors.LightText,
    textShadowOffset: {width: 1, height: 3},
    fontSize: ms(UI.fontSizeBig),
    fontWeight: '500',
    flex: 1,
    alignSelf: 'center',
    paddingTop: vs(UI.paddingMedium),
    paddingBottom: vs(UI.paddingMedium),
  },
  error: {
    color: colors.Error,
    fontSize: ms(UI.fontSizeSmall),
  },
  Title: {
    fontWeight: 'bold',
    fontSize: ms(UI.fontSizeBig),
    marginTop: vs(UI.marginSmall),
    width: 100,
    color: colors.TextHeaderColor,
  },
  textHeader: {
    fontWeight: '500',
    fontSize: ms(UI.fontSizeMedium),
    marginTop: vs(UI.marginSmall),
    marginLeft: s(UI.marginSmall),
    color: colors.TextHeaderColor,
  },
  textHeaderFixed: {
    fontWeight: '500',
    fontSize: ms(UI.fontSizeMedium),
    marginTop: vs(UI.marginSmall),
    marginLeft: s(UI.marginMedium),
    width: s(100),
    color: colors.TextHeaderColor,
  },
  text: {
    fontWeight: '500',
    fontSize: ms(UI.fontSizeSmall),
    marginTop: vs(UI.marginSmall),
    color: colors.TextColor,
  },
  message: {
    fontSize: ms(UI.fontSizeBig),
    fontWeight: 'bold',
  },
  header: {
    height: vs(55),
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: s(UI.marginSmall),
    paddingBottom: vs(UI.paddingSmall),
  },
  viewError: {
    flexDirection: 'row',
    backgroundColor: colors.ErrorBackgroundColor,
    borderWidth: ms(1),
    width: '100%',
    padding: s(UI.paddingSmall),
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
    marginRight: UI.marginSmall,
  },
});

export default FaceDetails;
