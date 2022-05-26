import {
  API_BASE_URL,
  API_KEY,
  PERSON_GRP_ID,
  NETWORK_ERROR,
  PERSON_DETAIL_API,
  IDENTIFY_API,
  DETECT_API,
} from '../../Utils/Constants';
import {Alert} from 'react-native';
import {FACE_STORE} from '../../Mobx/FACE_STORE';
import Requestor from '../../Lib/Requestor';
import NetInfo from '@react-native-community/netinfo';

const showMessage = message => {
  Alert.alert(
    'Sherlock-Homie',
    message,
    [
      {
        text: 'Ok',
        onPress: () => {
          FACE_STORE.setIsStart(true);
          FACE_STORE.setIsLoading(false);
          FACE_STORE.setIsIdentified(false);
        },
        style: 'cancel',
      },
    ],
    {
      cancelable: false,
    },
  );
};

export const getSimilarFacesAPI = async () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      Requestor.upload(
        API_BASE_URL + DETECT_API,
        API_KEY,
        FACE_STORE.getPhotoData,
      )
        .then(facedetect_res => {
          console.log('response detect' + JSON.stringify(facedetect_res));
          if (JSON.stringify(facedetect_res) == '[]') {
            showMessage('No face detected');
          } else {
            let face_id = facedetect_res[0].faceId;

            let faceIdList = [face_id];
            let data = {
              personGroupId: PERSON_GRP_ID,
              faceIds: faceIdList,
              maxNumOfCandidatesReturned: 1,
            };
            console.log('faceid', JSON.stringify(data));
            Requestor.request(
              API_BASE_URL + IDENTIFY_API,
              'POST',
              API_KEY,
              JSON.stringify(data),
            )
              .then(similarfaces_res => {
                console.log('similar ', JSON.stringify(similarfaces_res));
                if (JSON.stringify(similarfaces_res[0].candidates) == '[]') {
                  showMessage('Face not found in the criminal database');
                } else {
                  let similar_face = similarfaces_res[0].candidates[0].personId;
                  console.log('similar ', JSON.stringify(similar_face));
                  Requestor.request(
                    API_BASE_URL +
                      PERSON_DETAIL_API +
                      PERSON_GRP_ID +
                      '/persons/' +
                      similarfaces_res[0].candidates[0].personId,
                    'GET',
                    API_KEY,
                  ).then(facelist_res => {
                    console.log('info ', JSON.stringify(facelist_res.userData));
                    FACE_STORE.setFaceData(JSON.parse(facelist_res.userData));
                    FACE_STORE.setIsIdentified(true);
                    FACE_STORE.setIsLoading(false);
                  });
                }
              })
              .catch(function (error) {
                showMessage(JSON.stringify(error.message));
              });
          }
        })
        .catch(function (error) {
          showMessage(JSON.stringify(error.message));
        });
    } else {
      showMessage(NETWORK_ERROR);
    }
  });
};
