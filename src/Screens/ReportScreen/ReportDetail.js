import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import LoadLottie from '../../Components/LottieFiles/LoadLottie';
import {getReportDataAPI} from './ReportDetailAPI';
import {SUSPECT_STORE} from '../../Mobx/SUSPECT_STORE';
import {observer} from 'mobx-react';
import * as colors from '../../Utils/color';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Screen to show details of the identified suspects
//as a flatlist of the selected locationf rom the map
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
          {item.FullName}, CI - {item.CrimeIndex}
        </Text>
        <Text style={[styles.subtext]}>{item.Alias}</Text>
        <Text style={[styles.subtext]}>
          {item.DateReported.substring(0, item.DateReported.search('GMT'))}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ReportDetail = observer(() => {
  const [selectedId, setSelectedId] = useState(null);
  const [isToolTip, setIsToolTip] = useState(false);
  useEffect(() => {
    if (!SUSPECT_STORE.getIsDetailAPI) {
      getReportDataAPI();
    }
  });

  const goBack = () => {
    SUSPECT_STORE.setIsMain(true);
    SUSPECT_STORE.setIsMainAPI(false);
    SUSPECT_STORE.setIsLoading(true);
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.phone === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.phone === selectedId ? 'white' : 'black';

    return <Item item={item} textColor={{color}} />;
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
      {
        //Displaying lottie until data is loaded into the SUSPECT_STORE
        SUSPECT_STORE.getIsLoading ? (
          <LoadLottie lottieType="Loading" />
        ) : (
          <FlatList
            data={SUSPECT_STORE.getSuspectData}
            renderItem={renderItem}
            keyExtractor={item => item.phone}
            ItemSeparatorComponent={FlatListItemSeparator}
            ListHeaderComponent={FlatListHeader}
          />
        )
      }
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
    marginLeft: 15,
    marginRight: 10,
    alignItems: 'center',
    color: colors.LightText,
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
