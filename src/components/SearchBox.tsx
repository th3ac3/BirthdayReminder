import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors, Fonts } from '../styles';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#372F42',
    borderRadius: 13,
    height: 32,
    paddingHorizontal: 7,
  },
  searchText: {
    fontFamily: Fonts.SourceSansProRegular,
    height: 40, // Android needs this height higher otherwise it cuts off the text
    fontSize: 16,
    color: AppColors.white,
    opacity: 0.42,
  },
  searchIcon: {
    color: AppColors.white,
    fontSize: 19,
    opacity: 0.38,
    marginRight: 5,
  },
});

interface SearchBoxProps extends TextInputProps {}

export const SearchBox = ({
  style = {},
  ...otherProps
}: SearchBoxProps): JSX.Element => {
  const { t } = useTranslation('Search');

  return (
    <View style={[style, styles.searchRow]}>
      <Icon name="magnify" style={styles.searchIcon} />
      <TextInput
        style={styles.searchText}
        placeholder={t('search')}
        placeholderTextColor={AppColors.white}
        {...otherProps}
      />
    </View>
  );
};
