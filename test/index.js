'use strict';

const expect = require('chai').expect;
const dwGen = require('../src');
const enEFF = require('diceware-wordlist-en-eff');

describe('wordlist', () => {
  it('should return a error', () => {
    const fn = () => dwGen();
    expect(fn).to.throw(/Language empty/);
  });

  it('should return a error by incorrect language', () => {
    const dummyLang = {'11111': 'hello'};
    const options = {
      language: dummyLang
    };
    const fn = () => dwGen(options);
    expect(fn).to.throw(/Language length wrong/);
  });

  it('should return a string with 6 words by default', () => {
    const options = {language: enEFF};
    const words = dwGen(options);
    expect(words).to.be.a('string');
    expect(words).match(/^\w+(\s\w+){5}$/);
  });

  it('should return an array with length 6 if requested', () => {
    const options = {
      language: enEFF,
      format: 'array'
    };
    const words = dwGen(options);
    expect(words).to.be.a('array');
    expect(words).to.have.length.of.at.least(6);
  });

  it('should obey requested length in string mode', () => {
    const options = {
      language: enEFF,
      wordcount: 11
    };
    const words = dwGen(options);
    expect(words).match(/^\w+(\s\w+){10}$/);
  });

  it('should obey requested length in array mode', () => {
    const options = {
      language: enEFF,
      format: 'array',
      wordcount: 11
    };
    const words = dwGen(options);
    expect(words).to.have.length.of.at.least(11);
  });
});
