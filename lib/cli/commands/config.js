/*Locales = require('../locales');
y18n = new Locales();*/
ConfigGenerator = require('../generator/configGenerator');

exports.command = 'config';
//exports.desc = y18n.localized('configDesc');
exports.builder = {};
exports.handler = function() {
  ConfigGenerator.writeDefaultConfigFile();
};
