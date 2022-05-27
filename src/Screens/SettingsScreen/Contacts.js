import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import LoadLottie from '../../Components/LottieFiles/LoadLottie';
import getContactsAPI from './ContactsApi';
import {CONTACT_STORE} from '../../Mobx/CONTACT_STORE';
import {observer} from 'mobx-react';
import * as colors from '../../Utils/color';
import {scale, s, vs, ms, ScaledSheet} from 'react-native-size-matters';
import * as UI from '../../Utils/UIConstants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../Components/Header';
import * as H from '../../Utils/help';

//the Flatlist item
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
            borderRadius: ms(20),
            color: colors.ButtonColor,
            borderColor: 'red',
            height: scale(40),
            fontSize: ms(30),
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

  //Call contacts api if not loaded already
  useEffect(() => {
    if (CONTACT_STORE.getContactData == '') getContactsAPI();
  });

  //Footer for flatlist
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

  //LIne separator
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: vs(1),
          width: '100%',
          backgroundColor: '#000',
        }}></View>
    );
  };

  //Flat list header
  FlatListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Contact List</Text>
      </View>
    );
  };

  return (
    <View containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
      <Header headerText="Contact List" toolTip={H.CONTACT} />
      {CONTACT_STORE.getIsLoading ? ( //Load lottie until api is finished
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

const styles = ScaledSheet.create({
  item: {
    padding: s(UI.paddingMedium),
    marginVertical: vs(UI.marginMedium),
    marginHorizontal: s(UI.marginBig),
  },
  title: {
    fontSize: ms(UI.fontSizeMedium),
    fontWeight: '500',
    marginLeft: s(UI.marginBig),
    marginRight: s(UI.marginBig),
    color: colors.TextHeaderColor,
  },
  text: {
    fontSize: ms(UI.fontSizeMedium),
    marginLeft: s(UI.marginMedium),
    fontWeight: '500',
    color: colors.TextHeaderColor,
  },
  subtext: {
    fontSize: ms(UI.fontSizeSmall),
    marginLeft: s(UI.marginMedium),
    color: colors.TextColor,
  },
  subtitle: {
    fontSize: ms(UI.fontSizeSmall),
    marginLeft: s(UI.marginBig),
    color: colors.TextColor,
  },
  headerText: {
    color: colors.LightText,
    textShadowOffset: {width: 1, height: 3},
    fontSize: ms(UI.fontSizeBig),
    fontWeight: '500',
    flex: 1,
    alignSelf: 'center',
    paddingTop: vs(UI.paddingMedium),
    paddingBottom: s(UI.paddingMedium),
  },
  header: {
    height: vs(5),
    width: '100%',
    backgroundColor: colors.ProfileBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Contacts;
