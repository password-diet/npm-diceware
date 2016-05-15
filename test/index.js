'use strict';

const expect = require('chai').expect;
const dwGen = require('../src');

describe('wordlist', () => {
  it('should return a string by default', () => {
    expect(dwGen()).to.be.a('string');
  });

  it('should return 6 words by default', () => {
    expect(dwGen().split(' ').length).to.equal(6);
  });

  it('should return an array if requested', () => {
    expect(dwGen({'format': 'array'})).to.be.a('array');
  });

  it('should return an 6 item array in array mode by default', () => {
    expect(dwGen({'format': 'array'}).length).to.equal(6);
  });

  it('should obey requested length in string mode', () => {
    expect(dwGen({'wordcount': 11}).split(' ').length).to.equal(11);
  });

  it('should obey requested length in array mode', () => {
    expect(dwGen({'format': 'array', 'wordcount': 11}).length).to.equal(11);
  });

  it('should support en', () => {
    expect(() => {
      dwGen({'language': 'en'});
    }).to.not.throw(Error);
  });

  it('should support jp', () => {
    expect(() => {
      dwGen({'language': 'jp'});
    }).to.not.throw(Error);
  });

  it('should support swe', () => {
    expect(() => {
      dwGen({'language': 'swe'});
    }).to.not.throw(Error);
  });

  it('should support sp', () => {
    expect(() => {
      dwGen({'language': 'sp'});
    }).to.not.throw(Error);
  });

  it('should throw an error if asked for an unsupported language', () => {
    expect(() => {
      dwGen({'language': 'bogusTalk'});
    }).to.throw(Error);
  });
});
