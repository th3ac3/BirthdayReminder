import React from 'react';
import { Thumbnail, CountDown } from '../../components';
import { AppColors, Fonts } from '../../styles';
import { StyleSheet, View, Text } from 'react-native';
import { Contact } from '../../services/contacts';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 13,
    marginHorizontal: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 9,
  },
  name: {
    flexShrink: 1,
    color: AppColors.white,
    opacity: 0.8,
    fontFamily: Fonts.TitilliumWebSemiBold,
    fontSize: 16,
  },
  description: {
    color: AppColors.white,
    fontFamily: Fonts.TitilliumWebRegular,
    opacity: 0.7,
    fontSize: 14,
  },
  separtor: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.purple800,
    opacity: 0.21,
    marginHorizontal: 16,
  },
});

export type BirthdayProps = {
  contact: Contact;
};
export const BirthdayListItem = ({ contact }: BirthdayProps): JSX.Element => {
  const { t } = useTranslation('BirthdayList');
  const { thumbnailPath, name, age, dateOfBirth, nextBirthday } = contact;

  return (
    <View style={styles.itemRow}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Thumbnail imagePath={thumbnailPath} size={52} />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.description}>
            {t('entry.description', { futureAge: age + 1, birthday: dateOfBirth })}
          </Text>
        </View>
      </View>
      <CountDown endDate={nextBirthday} style={{ marginLeft: 16 }} />
    </View>
  );
};

export const BirthdaySeparator = () => <View style={styles.separtor} />;
