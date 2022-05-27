import {
  Text,
  View,
  Image,
  ScrollView,
  PermissionsAndroid,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StartingPage from '../../Components/LottieFiles/StartingPage';
import {observer} from 'mobx-react';
import Line from '../../Components/Line';
import React, {useState} from 'react';
import {FACE_STORE} from '../../Mobx/FACE_STORE';
import {SUSPECT_STORE} from '../../Mobx/SUSPECT_STORE';
import {launchCamera} from 'react-native-image-picker';
import * as colors from '../../Utils/color';
import LoadLottie from '../../Components/LottieFiles/LoadLottie';
import {getSimilarFacesAPI} from './SimilarFacesAPI';
import {OPTIONS} from '../../Utils/Util';
import * as UI from '../../Utils/UIConstants';
import {NATIONALITY, FLIGHT, GENDER} from '../../Utils/PickerList';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';

const SimilarFaces = observer(() => {
  const [name, setName] = useState('');

  //Function to reset IsLoading and IsIdentified mobx that controls the Loading Lottie
  const reset = () => {
    FACE_STORE.setIsLoading(false);
    FACE_STORE.setIsIdentified(false);
  };

  //Function to take user permission to access camera
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
        LaunchCam();
      } else {
        reset();
      }
    } catch (err) {
      alert(JSON.stringify(err));
      reset();
    }
  };

  //Function that lauches camera in user mobile and store the URI
  //and base64 photo image in the FACE_STORE
  //And set IsStart and Isloading to show Loading Lottie
  //And cals getSimilarFacesAPI to identify if any suspect from the azure database
  const LaunchCam = async () => {
    launchCamera(OPTIONS, res => {
      if (res.didCancel) {
        reset();
        FACE_STORE.setIsStart(true);
      } else if (res.error) {
        FACE_STORE.setIsStart(true);
      } else {
        FACE_STORE.setName(name);
        FACE_STORE.setPhotoData(res.assets[0].base64);
        FACE_STORE.setURI({uri: res.assets[0].uri});
        FACE_STORE.setIsStart(false);
        FACE_STORE.setIsLoading(true);
        SUSPECT_STORE.setIsMainAPI(false);
        getSimilarFacesAPI();
      }
    });
  };

  //Function to set color of the Crime Index value based on severity
  const getStyle = val => {
    if (val >= 8) {
      return {color: 'red'};
    } else if (val >= 5) {
      return {color: 'orange'};
    } else return {color: 'black'};
  };

  //Funtion called once user clicks Detect Image button
  const detectImage = () => {
    FACE_STORE.reset();
    requestCameraPermission();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BackgroundColor,
      }}>
      <View>
        <TouchableOpacity
          style={[styles.SubmitButtonStyle, {width: '80%'}]}
          activeOpacity={0.5}
          onPress={detectImage}>
          <Text style={styles.TextStyle}> Detect Image</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {FACE_STORE.getIsStart ? (
          <>
            <StartingPage />
          </>
        ) : FACE_STORE.getIsLoading ? (
          <LoadLottie lottieType="Face" />
        ) : (
          <View style={styles.container}>
            <View style={[styles.viewRow, {marginTop: vs(UI.marginMedium)}]}>
              <View style={styles.viewColumn}>
                <Image
                  style={{
                    height: vs(150),
                    width: s(150),
                    borderRadius: ms(15),
                  }}
                  source={FACE_STORE.getURI}
                  resizeMode={'contain'}
                />

                <Text
                  style={[
                    styles.textCrime,
                    getStyle(FACE_STORE.getFaceData.sev),
                  ]}>
                  Crime Index : {FACE_STORE.getFaceData.sev}
                </Text>
              </View>
              <View
                style={[styles.viewColumn, {marginLeft: s(UI.marginMedium)}]}>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>First Name: </Text>
                  <Text style={styles.text}>{FACE_STORE.getFaceData.fn}</Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>Last Name: </Text>
                  <Text style={styles.text}>{FACE_STORE.getFaceData.ln}</Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>Alias: </Text>
                  <Text style={styles.text}>
                    {FACE_STORE.getFaceData.alias}
                  </Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>Age/Sex: </Text>
                  <Text style={styles.text}>
                    {FACE_STORE.getFaceData.age}/
                    {GENDER[FACE_STORE.getFaceData.sex]}
                  </Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.textHeader}>Nationality: </Text>
                  <Text style={styles.text}>
                    {FACE_STORE.getFaceData.nat
                      ? NATIONALITY[FACE_STORE.getFaceData.nat]
                      : 'Indian'}
                  </Text>
                </View>
                <View style={styles.viewRow}>
                  <Icon
                    style={styles.iconFE}
                    size={ms(UI.iconSmall)}
                    name="link"
                  />

                  <Text
                    style={styles.text}
                    onPress={() => {
                      Linking.openURL(FACE_STORE.getFaceData.cs);
                    }}>
                    View Charge Sheet
                  </Text>
                </View>
              </View>
            </View>
            <Line head="Details" />
            <View style={styles.viewColumn}>
              <View style={styles.viewRow}>
                <Text style={styles.textHeader}>Identification Marks: </Text>
                <Text style={[styles.text, {flexWrap: 'wrap', width: s(200)}]}>
                  {FACE_STORE.getFaceData.marks}
                </Text>
              </View>
              <View style={styles.viewRow}>
                <View style={[styles.viewColumn]}>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Height: </Text>
                    <Text style={styles.text}>
                      {FACE_STORE.getFaceData.height}
                    </Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Weight: </Text>
                    <Text style={styles.text}>
                      {FACE_STORE.getFaceData.weight}
                    </Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Eye Colour: </Text>
                    <Text style={styles.text}>
                      {FACE_STORE.getFaceData.eye}
                    </Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Complexion: </Text>
                    <Text
                      style={[styles.text, {flexWrap: 'wrap', width: s(100)}]}>
                      {FACE_STORE.getFaceData.com}
                    </Text>
                  </View>
                </View>
                <View style={[styles.viewColumn]}>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Charges: </Text>
                    <Text style={styles.text}>{FACE_STORE.getFaceData.ch}</Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Arrests: </Text>
                    <Text style={styles.text}>{FACE_STORE.getFaceData.ar}</Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Conviction: </Text>
                    <Text style={styles.text}>{FACE_STORE.getFaceData.co}</Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>
                      Outstanding Warrents:{' '}
                    </Text>
                    <Text style={styles.text}>{FACE_STORE.getFaceData.wa}</Text>
                  </View>
                  <View style={styles.viewRow}>
                    <Text style={styles.textHeader}>Flight Risk: </Text>
                    <Text style={styles.text}>
                      {' '}
                      {FACE_STORE.getFaceData.fl == 1 ? 'Yes' : 'No'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Line head="Sample" />
            <View
              style={[
                styles.viewRow,
                {alignItems: 'center', marginTop: vs(UI.marginBig)},
              ]}>
              <Image
                source={{uri: FACE_STORE.getFaceData.p1}}
                resizeMode={'contain'}
                style={styles.ImageDisplay}
              />
              <Image
                source={{uri: FACE_STORE.getFaceData.p2}}
                resizeMode={'contain'}
                style={styles.ImageDisplay}
              />
              <Image
                source={{uri: FACE_STORE.getFaceData.p3}}
                resizeMode={'contain'}
                style={styles.ImageDisplay}
              />
            </View>
            <View>
              <Text style={styles.text}></Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    marginLeft: s(UI.marginMedium),
    marginRight: s(UI.marginMedium),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: colors.BackgroundColor,
    flex: 1,
  },

  button: {
    padding: 0,
    margin: s(UI.marginBig),
    height: vs(45),
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  text_input: {
    height: vs(40),
    borderColor: 'gray',
    borderWidth: ms(1),
    backgroundColor: colors.TextColor,
  },
  textHeader: {
    fontWeight: '500',
    fontSize: ms(UI.fontSizeSmall),
    marginTop: vs(UI.marginSmall),
    color: colors.TextHeaderColor,
  },
  text: {
    fontWeight: '500',
    fontSize: ms(UI.fontSizeSmall),
    marginTop: vs(UI.marginSmall),
    color: colors.TextColor,
    flexWrap: 'wrap',
  },
  textCrime: {
    fontWeight: '800',
    fontSize: ms(UI.fontSizeMedium),
    marginTop: vs(UI.marginSmall),

    color: colors.TextColor,
    flexWrap: 'wrap',
  },
  message: {
    fontSize: ms(UI.fontSizeBig),
    fontWeight: 'bold',
  },
  viewColumn1: {
    flexDirection: 'column',
    borderColor: 'red',
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    marginTop: 0,
  },
  viewColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginTop: vs(2),
  },

  viewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  SubmitButtonStyle: {
    marginTop: vs(UI.marginMedium),
    paddingTop: vs(UI.paddingMedium),
    paddingBottom: vs(UI.paddingMedium),
    marginLeft: s(30),
    marginRight: s(30),
    marginBottom: vs(UI.marginMedium),
    backgroundColor: colors.ButtonColor,
    borderRadius: vs(UI.borderRadiusLarge),
    borderWidth: 1,
  },

  TextStyle: {
    color: colors.TextHeaderColor,
    textAlign: 'center',
  },

  ImageDisplay: {
    height: vs(100),
    width: s(100),
    marginRight: s(UI.marginMedium),
    borderRadius: ms(15),
    flex: 0.33,
  },
  iconFE: {
    color: colors.Blue,
    marginTop: vs(UI.marginSmall),
    marginRight: s(UI.marginSmall),
  },
});
export default SimilarFaces;
