diceware-password-generator
=========

An diceware password generator

## Installation

  npm install diceware-password-generator --save

## Usage

  var dwGen = require('diceware-password-generator');  
  dwGen();		# 'stare too magog guess kirov grout'  

  dwGen(options)  
  default options:  
  {  
  	'language': 'en',	   // currently only en is supported  
  	'wordcount': 6,  
  	'format': 'string',    // one of [array, string]  
  }  
