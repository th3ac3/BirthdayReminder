import React, { useState, useEffect } from 'react';
import { View, ViewProps, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { AppColors, Fonts } from '../styles';

const styles = StyleSheet.create({
  countDownContainer: {
    width: 56,
    alignItems: 'center',
  },
  countDownNumberBG: {
    backgroundColor: AppColors.pink600,
    opacity: 0.93,
    paddingVertical: 2,
    paddingHorizontal: 7,
    minWidth: 23,
    alignItems: 'center',
    borderRadius: 13,
  },
  countDownNumber: {
    fontSize: 15,
    fontFamily: Fonts.SourceSansProBold,
    color: AppColors.purple200,
  },
  countDownUnits: {
    marginTop: 3,
    fontSize: 14,
    fontFamily: Fonts.SourceSansProBold,
    textTransform: 'uppercase',
    color: AppColors.pink600,
    opacity: 0.93,
  },
});

export type CountDownUnits = 'days' | 'weeks' | 'months';
export interface CountDownProps extends ViewProps {
  startDate?: moment.Moment;
  endDate: moment.Moment;
  unitOverride?: CountDownUnits;
}

export const CountDown = ({
  startDate = moment(),
  endDate,
  unitOverride,
  style = {},
  ...otherProps
}: CountDownProps): JSX.Element => {
  const { t } = useTranslation('CountDown');
  const [countDownNumber, setCountDownNumber] = useState(0);
  const [countDownUnit, setCountDownUnit] = useState<CountDownUnits>(
    unitOverride ?? 'days',
  );

  useEffect(() => {
    const daysDiff = endDate.diff(startDate, 'days');

    if (unitOverride) {
      setCountDownUnit(unitOverride);
    } else if (daysDiff < 10) {
      setCountDownUnit('days');
    } else if (daysDiff < 70) {
      setCountDownUnit('weeks');
    } else {
      setCountDownUnit('months');
    }
  }, [startDate, endDate, unitOverride]);

  useEffect(() => {
    setCountDownNumber(endDate.diff(startDate, countDownUnit));
  }, [startDate, endDate, countDownUnit]);

  return (
    <View style={[style, styles.countDownContainer]} {...otherProps}>
      <View style={styles.countDownNumberBG}>
        <Text style={styles.countDownNumber}>{countDownNumber}</Text>
      </View>
      <Text style={styles.countDownUnits}>
        {t('timePeriod', { context: countDownUnit })}
      </Text>
    </View>
  );
};
