import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { Contact } from 'react-native-contacts';
import moment from 'moment';
import { getCanAccessContacts, requestAccessContacts, getContacts } from './services/contacts';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
    backgroundColor: '#ccc',
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
  },
  birthday: {
    fontSize: 16,
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
          return (
            <View style={styles.row}>
              <View style={styles.nameIconGroup}>
                {thumbnailPath !== '' && <Image source={{ uri: thumbnailPath }} style={styles.thumbnail} />}
                {thumbnailPath === '' && <View style={styles.thumbnail} />}
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
