import { FormatFunction } from 'i18next';
import moment from 'moment';
import numeral from 'numeral';

const formatFunction: FormatFunction = (
  value: any,
  format?: string,
): string => {
  if (format === undefined) return value as string;

  if (typeof value === 'string') {
    const f = format.toLowerCase();
    if (f === 'uppercase') return value.toUpperCase();
    if (f === 'lowercase') return value.toLowerCase();
  }

  if (typeof value === 'number') return numeral(value).format(format);
  if (moment.isMoment(value)) return value.format(format);
  if (value instanceof Date) return moment(value).format(format);

  return value as string;
};

export default formatFunction;
