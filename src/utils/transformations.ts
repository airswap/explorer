import { distanceInWordsStrict } from 'date-fns';

export const willFormatNumber = (num: number, digits: number, decimals?: number) => {
  const amount = num.toString();
  return amount.length > digits || (amount.includes('.') && (decimals && amount.split('.')[1].length > decimals));
};

export const getFormattedNumberOld = (num: number, digits: number, decimals?: number, noEllipsis?: boolean) => {
  let amount = num.toString();
  if (!amount.includes('.') || (amount.length <= digits && (!decimals || amount.split('.')[1].length <= decimals))) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals || 0,
      maximumFractionDigits: decimals || digits,
    });
  }

  amount = num.toLocaleString(undefined, {
    minimumFractionDigits: decimals || 0,
    maximumFractionDigits: decimals || digits,
  });
  return `${amount.substring(0, digits)}${noEllipsis ? '' : '...'}`;
};

interface FormattedNumberConfig {
  num: number;
  digits: number;
  decimals?: number;
  minDecimals?: number;
  maxDecimals?: number;
  noEllipsis?: boolean;
}

export const getFormattedNumber = (config: FormattedNumberConfig) => {
  const { num, digits, minDecimals, maxDecimals, noEllipsis } = config;

  let amount = num.toString();
  // if (
  //   !amount.includes('.') ||
  //   (amount.length <= digits && (!minDecimals || amount.split('.')[1].length <= minDecimals))
  // ) {
  //   return num.toLocaleString(undefined, {
  //     minimumFractionDigits: minDecimals || 0,
  //     maximumFractionDigits: maxDecimals || digits,
  //   });
  // }

  amount = num.toLocaleString(undefined, {
    minimumFractionDigits: minDecimals || 0,
    maximumFractionDigits: maxDecimals || digits,
  });
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
    minutes: 'm',
    minute: 'm',
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
