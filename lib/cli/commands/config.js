ConfigGenerator = require('../generator/configGenerator');
Locales = require('../../locales');
y18n = new Locales();

exports.command = 'config';
exports.desc = y18n.localized('configDesc');
exports.builder = {};
exports.handler = function() {
  ConfigGenerator.writeDefaultConfigFile();
};
