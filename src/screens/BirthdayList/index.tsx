import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { AppColors, Fonts } from '../../styles';
import { useContacts, Contact } from '../../services/contacts';
import { useTranslation } from 'react-i18next';
import { BirthdayListItem, BirthdaySeparator } from './BirthdayListItem';
import { SearchBox } from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.purple200,
  },
  title: {
    fontSize: 33,
    fontFamily: Fonts.SourceSansProSemiBold,
    marginHorizontal: 16,
    marginTop: 23,
    color: AppColors.white,
    marginBottom: 18,
  },
  search: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
    flex: 1,
  },
});

const AppContent = () => {
  const { t } = useTranslation('BirthdayList');
  const { canUseContacts, contacts } = useContacts();
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  const onSearchChange = (searchText: string) => {
    setFilteredContacts(
      contacts.filter((c) => c.name.search(searchText) !== -1),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('title')}</Text>
      {!canUseContacts && <Text>{t('cantUseContacts')}</Text>}
      <View style={styles.itemContainer}>
        <SearchBox style={styles.search} onChangeText={onSearchChange} />
        <FlatList
          data={filteredContacts}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }: { item: Contact }) => (
            <BirthdayListItem contact={item} />
          )}
          ItemSeparatorComponent={BirthdaySeparator}
        />
      </View>
    </View>
  );
};

export default AppContent;
