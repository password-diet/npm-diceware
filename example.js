const dwGen = require('diceware-generator');
const enEFF = require('diceware-wordlist-en-eff');

const options = {
  language: enEFF,
  wordcount: 6,
  format: 'string'
}
const pass = dwGen(options);
