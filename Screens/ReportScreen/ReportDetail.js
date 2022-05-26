import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import LoadLottie from '../../Components/Lottie/LoadLottie';
import {getReportDataAPI} from './ReportDetailAPI';
import {SUSPECT_STORE} from '../../Mobx/SUSPECT_STORE';
import {observer} from 'mobx-react';
import * as colors from '../../Utils/color';
import {scale, verticalScale} from 'react-native-size-matters';

import Icon from 'react-native-vector-icons/FontAwesome5';
const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View
      style={{
        flexDirection: 'row',

        justifyContent: 'flex-start',
      }}>
      <View>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 15,
          }}
          source={{uri: item.ProfileURL}}
          resizeMode={'contain'}
        />
      </View>
      <View>
        <Text style={[styles.text]}>
          {item.FullName} - {item.CrimeIndex}
        </Text>
        <Text style={[styles.subtext]}>{item.Alias}</Text>
        <Text style={[styles.subtext]}>
          {item.DateReported.substring(0, item.DateReported.search('GMT'))} - (
          {item.ConfLevel})
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ReportDetail = observer(() => {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    console.log('test');
    //SUSPECT_STORE.setIsMain(true);
    if (!SUSPECT_STORE.getIsDetailAPI) {
      getReportDataAPI();
      console.log('inside');

      SUSPECT_STORE.setIsDetailAPI(true);
    }
  });

  const goBack = () => {
    SUSPECT_STORE.setIsMain(true);
    SUSPECT_STORE.setIsMainAPI(false);
    SUSPECT_STORE.setIsLoading(true);
    console.log('main det', SUSPECT_STORE.getIsMainAPI);
  };
  FlatListFooter = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.title}>
          List of contacts from various department to report suspects.
        </Text>
        <Text style={styles.subtitle}>
          Note: Manage contacts will be available in Ver 2.0
        </Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.phone === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.phone === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        // onPress={() => setSelectedId(item.phone)}
        //backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}></View>
    );
  };

  FlatListHeader = () => {
    return (
      <View style={styles.header}>
        <Icon
          style={styles.iconFE}
          size={30}
          color={colors.Green}
          name="angle-double-left"
          onPress={goBack}
        />
        <Text style={styles.headerText}>Suspect List</Text>
      </View>
    );
  };
  return (
    <View containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
      {SUSPECT_STORE.getIsLoading ? (
        <LoadLottie lottieType="Loading" />
      ) : (
        <FlatList
          data={SUSPECT_STORE.getSuspectData}
          renderItem={renderItem}
          keyExtractor={item => item.phone}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListHeaderComponent={FlatListHeader}
          // ListFooterComponent={FlatListFooter}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 20,
    marginRight: 20,
    color: colors.TextHeaderColor,
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '500',
    color: colors.TextHeaderColor,
  },
  subtext: {
    fontSize: 12,
    marginLeft: 10,
    color: colors.TextColor,
  },
  iconFE: {
    height: 24,

    width: 24,
    marginLeft: 15,
    marginRight: 10,
    alignItems: 'center',
    color: 'red',
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
  header: {
    height: 55,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportDetail;
