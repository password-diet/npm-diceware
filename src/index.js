'use strict';

const secureRandom = require('secure-random');

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

const range = max => Array.apply(null, Array(max)).map((_, i) => i);

const diceSeq = count => range(count).map(() => diceRoll()).join('');

const getDices = () => diceSeq(5);

const getRandomWord = language => language[getDices()];

const getRandomPassword = options => {
  options = Object.assign({
    'wordcount': 6,
    'format': 'string'
  }, options);
  if (typeof options.language !== 'object') {
    throw(new Error('Language empty'));
  }
  if (Object.keys(options.language).length !== 7776) {
    throw(new Error('Language length wrong'));
  }
  const words = range(options.wordcount).map(() => getRandomWord(options.language));
  return (options.format === 'array') ? words : words.join(' ');
};

module.exports = getRandomPassword;
