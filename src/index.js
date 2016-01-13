import secureRandom from 'secure-random';
import {assign, includes, range} from 'lodash';

const dw = {
  en: require('diceware-wordlist-en'),
  swe: require('diceware-wordlist-swe'),
  jp: require('diceware-wordlist-jp'),
  sp: require('diceware-wordlist-sp')
};

const getRandomInt = (min, max) => {
  // Create byte array and fill with 1 random number
  const byteArray = secureRandom(1, {type: 'Uint8Array'});
  const r = max - min + 1;
  const maxRange = 256;
  if (byteArray[0] >= Math.floor(maxRange / r) * r)
    return getRandomInt(min, max);
  return min + (byteArray[0] % r);
};

const diceRoll = () => getRandomInt(1, 6);

const diceSeq = (count) => range(count).map(() => diceRoll()).join('');

const getDices = () => diceSeq(5);

const getRandomWord = (language) => dw[language][getDices()];

const getRandomPassword = (options) => {
  options = assign({
    'language': 'en',
    'wordcount': 6,
    'format': 'string'
  }, options);
  if (!includes(['en', 'swe', 'jp', 'sp'], options.language)) {
    throw(new Error(`Unsupported language: ${options.language}`));
  }
  const words = range(options.wordcount).map(() => getRandomWord(options.language));
  return (options.format === 'array') ? words : words.join(' ');
};

module.exports = getRandomPassword;
