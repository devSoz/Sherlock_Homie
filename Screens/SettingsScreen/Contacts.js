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
import getContactsAPI from '../../Components/ContactsApi';
import {CONTACT_STORE} from '../../Mobx/CONTACT_STORE';
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
        <Icon
          style={{
            width: scale(40),
            borderRadius: 20,
            color: colors.ButtonColor,
            borderColor: 'red',

            height: scale(40),
            fontSize: 30,
          }}
          fill="black"
          name={
            item.dept == 'Police'
              ? 'user-ninja'
              : item.dept == 'Control Room'
              ? 'user-shield'
              : user - secret
          }
        />
      </View>
      <View>
        <Text style={[styles.text]}>
          {item.name} - {item.position}
        </Text>
        <Text style={[styles.subtext]}>{item.phone}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Contacts = observer(() => {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (CONTACT_STORE.getContactData == '') getContactsAPI();
  });

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
        <Text style={styles.headerText}>Contact List</Text>
      </View>
    );
  };
  return (
    <View containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
      {CONTACT_STORE.getIsLoading ? (
        <LoadLottie lottieType="Loading" />
      ) : (
        <FlatList
          data={CONTACT_STORE.getContactData}
          renderItem={renderItem}
          keyExtractor={item => item.phone}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListHeaderComponent={FlatListHeader}
          ListFooterComponent={FlatListFooter}
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
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Contacts;
