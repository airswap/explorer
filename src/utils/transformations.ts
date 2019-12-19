import { distanceInWordsStrict } from 'date-fns';

export const willFormatNumber = (num: number, digits: number, decimals?: number) => {
  const amount = num.toString();
  return amount.length > digits || (amount.includes('.') && (decimals && amount.split('.')[1].length > decimals));
};

export const getFormattedNumber = (num: number, digits: number, decimals?: number, noEllipsis?: boolean) => {
  let amount = num.toString();
  if (!amount.includes('.')) return amount;
  if (amount.length <= digits && (!decimals || amount.split('.')[1].length <= decimals)) return amount;

  amount = num.toFixed(decimals).toString();
  return `${amount.substring(0, digits)}${noEllipsis ? '' : '...'}`;
};

export const calculateDifferenceInTrade = (timestamp: string | number) => {
  const now = Date.now();
  const t = parseInt(`${timestamp}`, 10);

  const distanceInWords = distanceInWordsStrict(now, t);
  const distanceInWordsArr = distanceInWords.split(' ');

  const localMap = {
    seconds: 's',
    second: 's',
    minutes: 'min',
    minute: 'min',
    hours: 'h',
    hour: 'h',
    days: 'd',
    day: 'd',
    months: 'M',
    month: 'M',
    years: 'y',
    year: 'y',
  };

  const key = distanceInWordsArr[1];

  if (key in localMap) {
    distanceInWordsArr[1] = localMap[key];
  }
  return `${distanceInWordsArr.join('')} ago`;
};
