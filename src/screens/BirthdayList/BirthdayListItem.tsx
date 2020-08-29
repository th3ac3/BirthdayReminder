import React from 'react';
import moment from 'moment';
import { AppColors, Fonts } from '../../styles';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Contact } from '../../services/contacts';
import { useTranslation } from 'react-i18next';

const THUMBNAIL_SIZE = 52;
const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 13,
    marginHorizontal: 16,
  },
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: THUMBNAIL_SIZE / 2,
  },
  noImageThumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: THUMBNAIL_SIZE / 2,
    backgroundColor: AppColors.pink600,
    opacity: 0.93,
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
  countdownContainer: {
    width: 56,
    marginLeft: 16,
    alignItems: 'center',
  },
  countdownNumberBG: {
    backgroundColor: AppColors.pink600,
    opacity: 0.93,
    paddingVertical: 2,
    paddingHorizontal: 7,
    minWidth: 23,
    alignItems: 'center',
    borderRadius: 13,
  },
  countdownNumber: {
    fontSize: 15,
    fontFamily: Fonts.SourceSansProBold,
    color: AppColors.purple200,
  },
  countdownUnits: {
    marginTop: 3,
    fontSize: 14,
    fontFamily: Fonts.SourceSansProBold,
    textTransform: 'uppercase',
    color: AppColors.pink600,
    opacity: 0.93,
  },
  separtor: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.purple800,
    opacity: 0.21,
    marginHorizontal: 16,
  },
});

const NoImageThumbnail = () => <View style={styles.noImageThumbnail} />;

export type BirthdayProps = {
  contact: Contact;
};
type CountdownUnits = 'days' | 'weeks' | 'months';
export const BirthdayListItem = ({ contact }: BirthdayProps): JSX.Element => {
  const { t } = useTranslation('BirthdayList');
  const now = moment();
  const { thumbnailPath, name, age, dateOfBirth, nextBirthday } = contact;

  const ImageComponent = thumbnailPath ? (
    <Image source={{ uri: thumbnailPath }} style={styles.thumbnail} />
  ) : (
    <NoImageThumbnail />
  );

  let countdownUnits: CountdownUnits = 'days';
  if (nextBirthday.diff(now, 'weeks') < 10) {
    countdownUnits = 'weeks';
  } else {
    countdownUnits = 'months';
  }
  const countdownNumber = nextBirthday.diff(now, countdownUnits);

  return (
    <View style={styles.itemRow}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {ImageComponent}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.description}>
            {t('entry.description', { futureAge: age + 1, birthday: dateOfBirth })}
          </Text>
        </View>
      </View>
      <View style={styles.countdownContainer}>
        <View style={styles.countdownNumberBG}>
          <Text style={styles.countdownNumber}>{countdownNumber}</Text>
        </View>
        <Text style={styles.countdownUnits}>{t(`entry.timePeriods.${countdownUnits}`)}</Text>
      </View>
    </View>
  );
};

export const BirthdaySeparator = () => <View style={styles.separtor} />;
