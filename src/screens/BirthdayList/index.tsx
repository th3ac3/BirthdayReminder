import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { AppColors, Fonts } from '../../styles';
import { useContacts, Contact } from '../../services/contacts';
import { useTranslation } from 'react-i18next';
import { BirthdayListItem, BirthdaySeparator } from './BirthdayListItem';

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
  },
  titleUnderline: {
    backgroundColor: AppColors.pink600,
    opacity: 0.85,
    height: 3,
    maxWidth: 80,
    marginHorizontal: 16,
    marginTop: 5,
    marginBottom: 28,
  },
  birthdayList: {
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
  },
});

const AppContent = () => {
  const { t } = useTranslation('BirthdayList');
  const { canUseContacts, contacts } = useContacts();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('title')}</Text>
      <View style={styles.titleUnderline} />
      {!canUseContacts && <Text>{t('cantUseContacts')}</Text>}
      <FlatList
        style={styles.birthdayList}
        data={contacts}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }: { item: Contact }) => <BirthdayListItem contact={item} />}
        ItemSeparatorComponent={BirthdaySeparator}
      />
    </View>
  );
};

export default AppContent;
