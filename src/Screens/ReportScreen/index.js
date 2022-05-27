import React, {useEffect} from 'react';
import MapView from 'react-native-maps';
import Header from '../../Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from '../../Utils/color';
import {observer} from 'mobx-react';
import * as H from '../../Utils/help';
import LoadLottie from '../../Components/LottieFiles/LoadLottie';
import {Text, View} from 'react-native';
import * as UI from '../../Utils/UIConstants';
import {SUSPECT_STORE} from '../../Mobx/SUSPECT_STORE';
import {ReportSummaryAPI} from './ReportSummaryAPI';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';

//Report screen showing the map with summary of identified
//suspect in various locations where application is used
const ReportScreen = observer(({navigation}) => {
  //Call API to get suspect summary
  useEffect(() => {
    if (!SUSPECT_STORE.getIsMainAPI) {
      ReportSummaryAPI();
    }
  });
  return (
    <View style={styles.MainContainer}>
      <Header headerText="Suspects Summary" toolTip={H.STAT} />
      {SUSPECT_STORE.getIsLoading ? (
        <LoadLottie lottieType="Loading" />
      ) : (
        //Mapview to show the markers with summary count of suspect
        <MapView
          style={styles.mapStyle}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: 15.115,
            longitudeDelta: 15.1121,
          }}>
          {!SUSPECT_STORE.getIsLoading &&
            SUSPECT_STORE.getSuspectData.map(marker => {
              return (
                <MapView.Marker
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  onPress={e => {
                    e.stopPropagation();
                    SUSPECT_STORE.reset();
                    SUSPECT_STORE.setLocationID(marker.id);
                    SUSPECT_STORE.setIsMain(false);
                  }}
                  title={marker.name}
                  subtitle={marker.location}>
                  <Icon
                    style={styles.iconFE}
                    size={ms(30)}
                    color={colors.Green}
                    name="map-marker"
                  />
                  <Text style={styles.text}>{marker.count}</Text>
                </MapView.Marker>
              );
            })}
        </MapView>
      )}
    </View>
  );
});

const styles = ScaledSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.TextHeaderColor,
    fontSize: ms(UI.fontSizeMedium),
    fontWeight: '500',
  },
  mapStyle: {
    width: '100%',
    height: '92.5%',
  },
  iconFE: {
    height: vs(24),
    marginTop: vs(UI.marginMedium),
    width: s(24),
    marginLeft: s(15),
    marginRight: s(UI.marginMedium),
    alignItems: 'center',
    color: 'red',
  },
});

export default ReportScreen;
