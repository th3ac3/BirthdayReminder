import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { Contact } from 'react-native-contacts';
import moment from 'moment';
import { getCanAccessContacts, requestAccessContacts, getContacts } from './services/contacts';

const ThumbBGColors = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  nameIconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 19,
    color: '#202E39',
  },
  birthday: {
    fontSize: 17,
    color: '#505E69',
  },
  separator: {
    backgroundColor: '#ccc',
    height: 1,
    width: '100%',
  },
});

const AppContent = () => {
  const [canUseContacts, setCanUseContacts] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  let colorIndex = 0;

  useEffect((): void => {
    getCanAccessContacts()
      .then((response) => {
        if (response) return true;
        else return requestAccessContacts();
      })
      .then(setCanUseContacts)
      .then(getContacts)
      .then(setContacts)
      .catch((): void => setCanUseContacts(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Birthdays!</Text>
      {!canUseContacts && <Text>Cannot access contacts</Text>}
      <FlatList
        data={contacts}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item: { birthday, givenName, thumbnailPath } }) => {
          const bdString = moment(birthday).format('MMM Do');
          const backgroundColor = ThumbBGColors[colorIndex];
          let ProfileImage: JSX.Element;
          if (thumbnailPath !== '') {
            ProfileImage = <Image source={{ uri: thumbnailPath }} style={styles.thumbnail} />;
          } else {
            colorIndex = (colorIndex + 1) % ThumbBGColors.length;
            ProfileImage = <View style={[styles.thumbnail, { backgroundColor }]} />;
          }

          return (
            <View style={styles.row}>
              <View style={styles.nameIconGroup}>
                {ProfileImage}
                <Text style={styles.name}>{givenName}</Text>
              </View>
              <View>
                <Text style={styles.birthday}>{bdString}</Text>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default AppContent;
