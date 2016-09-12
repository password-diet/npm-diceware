const dwGen = require('diceware-generator');

const options = {
  language: 'en',
  wordcount: 6,
  format: 'string'
}
const pass = dwGen(options);
