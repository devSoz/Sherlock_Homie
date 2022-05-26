import React, {useEffect} from 'react';
import MapView from 'react-native-maps';
import Header from '../../Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from '../../Utils/color';
import {observer} from 'mobx-react';
import * as H from '../../Utils/help';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Button,
} from 'react-native';
import {SUSPECT_STORE} from '../../Mobx/SUSPECT_STORE';
import {ReportSummaryAPI} from './ReportSummaryAPI';

const ReportScreen = observer(({navigation}) => {
  useEffect(() => {
    //SUSPECT_STORE.setIsDetailAPI(false);
    console.log('report', SUSPECT_STORE.getIsMainAPI);
    if (!SUSPECT_STORE.getIsMainAPI) {
      console.log('Main inside');
      ReportSummaryAPI();
    }
  });
  return (
    <View style={styles.MainContainer}>
      <Header headerText="Suspects Summary" toolTip={H.STAT} />
      <MapView
        style={styles.mapStyle}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 10.115,
          longitudeDelta: 10.1121,
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
                  console.log('data', SUSPECT_STORE.getSuspectData);
                  SUSPECT_STORE.setIsMain(false);
                }}
                title={marker.name}
                subtitle={marker.location}>
                <Icon
                  style={styles.iconFE}
                  size={30}
                  color={colors.Green}
                  name="map-marker"
                />
                <Text style={styles.text}>{marker.count}</Text>
              </MapView.Marker>
            );
          })}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    color: colors.TextHeaderColor,
    fontSize: 15,
    fontWeight: '500',
  },
  mapStyle: {
    width: '100%',
    height: '93%',
  },
  iconFE: {
    height: 24,
    marginTop: 8,
    width: 24,
    marginLeft: 15,
    marginRight: 10,
    alignItems: 'center',
    color: 'red',
  },
});

export default ReportScreen;
