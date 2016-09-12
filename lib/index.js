'use strict';

var secureRandom = require('secure-random');
var _ = require('lodash');

var dw = {
  en: require('diceware-wordlist-en'),
  swe: require('diceware-wordlist-swe'),
  jp: require('diceware-wordlist-jp'),
  sp: require('diceware-wordlist-sp'),
  enEFF: require('diceware-wordlist-en-eff')
};

var getRandomInt = function getRandomInt(min, max) {
  // Create byte array and fill with 1 random number
  var byteArray = secureRandom(1, { type: 'Uint8Array' });
  var r = max - min + 1;
  var maxRange = 256;
  if (byteArray[0] >= Math.floor(maxRange / r) * r) return getRandomInt(min, max);
  return min + byteArray[0] % r;
};

var diceRoll = function diceRoll() {
  return getRandomInt(1, 6);
};

var diceSeq = function diceSeq(count) {
  return _.range(count).map(function () {
    return diceRoll();
  }).join('');
};

var getDices = function getDices() {
  return diceSeq(5);
};

var getRandomWord = function getRandomWord(language) {
  return dw[language][getDices()];
};

var getRandomPassword = function getRandomPassword(options) {
  options = _.assign({
    'language': 'en',
    'wordcount': 6,
    'format': 'string'
  }, options);
  if (!_.includes(['en', 'swe', 'jp', 'sp', 'enEFF'], options.language)) {
    throw new Error('Unsupported language: ' + options.language);
  }
  var words = _.range(options.wordcount).map(function () {
    return getRandomWord(options.language);
  });
  return options.format === 'array' ? words : words.join(' ');
};

module.exports = getRandomPassword;