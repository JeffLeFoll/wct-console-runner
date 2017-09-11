/*Locales = require('../../locales');
y18n = new Locales();*/
ConfigResolver = require('../configResolver');
TestRunHandler = require('../handler/testRunHandler');

exports.command = 'run';

//exports.desc = y18n.localized('componentDesc');
exports.builder = {
  deployedTestsUrl: {
    alias: 'serverUrl'
    //describe: y18n.localized('ucDesc')
  },
  testToRun: {
    alias: 'test'
    //describe: y18n.localized('ucDesc')
  },
  watch: {
    boolean: true
    //describe: y18n.localized('ucDesc')
  }
};
exports.handler = function(argv) {
  let configResolver = new ConfigResolver();
  configResolver.updateWithConsoleArg(argv);

  let testRunHandler = new TestRunHandler(configResolver);

  return testRunHandler.handle();
};
