import {expect} from 'chai';
import dwGen from '../src';

describe('wordlist', function() {
  it('should return a string by default', function() {
    expect(dwGen()).to.be.a('string');
  });

  it('should return 6 words by default', function() {
    expect(dwGen().split(' ').length).to.equal(6);
  });

  it('should return an array if requested', function() {
    expect(dwGen({'format': 'array'})).to.be.a('array');
  });

  it('should return an 6 item array in array mode by default', function() {
    expect(dwGen({'format': 'array'}).length).to.equal(6);
  });

  it('should obey requested length in string mode', function() {
    expect(dwGen({'wordcount': 11}).split(' ').length).to.equal(11);
  });

  it('should obey requested length in array mode', function() {
    expect(dwGen({'format': 'array', 'wordcount': 11}).length).to.equal(11);
  });

  it('should support en', function() {
    expect(function() {
      dwGen({'language': 'en'});
    }).to.not.throw(Error);
  });

  it('should support jp', function() {
    expect(function() {
      dwGen({'language': 'jp'});
    }).to.not.throw(Error);
  });

  it('should support swe', function() {
    expect(function() {
      dwGen({'language': 'swe'});
    }).to.not.throw(Error);
  });

  it('should support sp', function() {
    expect(function() {
      dwGen({'language': 'sp'});
    }).to.not.throw(Error);
  });

  it('should throw an error if asked for an unsupported language', function() {
    expect(function() {
      dwGen({'language': 'bogusTalk'});
    }).to.throw(Error);
  });
});
