import React, {useEffect} from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from '../../Utils/color';
import {observer} from 'mobx-react';
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

const ReportScreen = observer(() => {
  useEffect(() => {
    ReportSummaryAPI();
  });
  return (
    <View style={styles.MainContainer}>
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
                  alert('test');
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
  },
  text: {
    color: colors.TextHeaderColor,
    fontSize: 15,
    fontWeight: '500',
  },
  mapStyle: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
