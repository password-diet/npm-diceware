'use strict';

const secureRandom = require('secure-random');
const assign = require('lodash/assign');
const includes = require('lodash/includes');
const range = require('lodash/range');
const en = require('diceware-wordlist-en');
const swe = require('diceware-wordlist-swe');
const jp = require('diceware-wordlist-jp');
const sp = require('diceware-wordlist-sp');
const enEFF = require('diceware-wordlist-en-eff');

const dw = {
  en: en,
  swe: swe,
  jp: jp,
  sp: sp,
  enEFF: enEFF
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

const diceSeq = count => range(count).map(() => diceRoll()).join('');

const getDices = () => diceSeq(5);

const getRandomWord = language => dw[language][getDices()];

const getRandomPassword = options => {
  options = assign({
    'language': 'en',
    'wordcount': 6,
    'format': 'string'
  }, options);
  if (!includes(['en', 'swe', 'jp', 'sp', 'enEFF'], options.language)) {
    throw(new Error(`Unsupported language: ${options.language}`));
  }
  const words = range(options.wordcount).map(() => getRandomWord(options.language));
  return (options.format === 'array') ? words : words.join(' ');
};

module.exports = getRandomPassword;
