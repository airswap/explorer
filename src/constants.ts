import { TRADER_AFFILIATE_ADDRESS } from 'airswap.js/src/constants';

export const REACT_APP_ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || '';

export const GIT_SHA = process.env.REACT_APP_GIT_SHA1;

export const PRODUCTION_HOSTNAME = 'explorer.airswap.io';

// Airswap URL
export const AIRSWAP_FAQ_URL = 'https://support.airswap.io/en/collections/1334342-faq';
export const AIRSWAP_DOCS_URL = 'https://docs.airswap.io';
export const TERMS_OF_USE_URL = 'https://airswap.io/airswap-terms-of-use.pdf';
export const PRIVACY_POLICY_URL = 'https://airswap.io/airswap-privacy-policy.pdf';
export const AIRSWAP_INSTANT_URL = 'https://instant.airswap.io/swap';
export const AIRSWAP_TRADER_URL = 'https://trader.airswap.io/';
export const AIRSWAP_DISCORD_URL = 'https://chat.airswap.io/';
export const AIRSWAP_TWITTER_URL = 'https://twitter.com/airswap';

// Data
export const STABLECOIN_SYMBOLS = ['SAI', 'DAI', 'USDC', 'USDT', 'TUSD', 'PAX', 'KRWB', 'GUSD'];

// Styles
export const GRAPH_COLOR_PALLETE = ['#C58A80', '#DB6C33', '#304CD2', '#416A75'];

// Swap Sources
export const METASWAP_ADDRESS = '0x74de5d4fcbf63e00296fd95d33236b9794016631';
export const ONEINCH_EXCHANGE_ADDRESS = '0x11111254369792b2ca5d084ab5eea397ca8fa48b';
export const DEX_AG_ADDRESS = '0xa540fb50288cc31639305b1675c70763c334953b';
export const TOTLE_ADDRESS = '0x91f3935ed7a4ee8d15023c5df26895b26ae98015';

export const SwapSourceMap = {
  [METASWAP_ADDRESS]: 'MetaMask',
  [ONEINCH_EXCHANGE_ADDRESS]: '1Inch',
  [DEX_AG_ADDRESS]: 'Dex.ag',
  [TOTLE_ADDRESS]: 'Totle',
  [TRADER_AFFILIATE_ADDRESS]: 'AirSwap OTC',
};
