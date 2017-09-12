/*Locales = require('../../locales');
y18n = new Locales();*/
ConfigHandler = require('../handler/configHandler');
TestRunHandler = require('../handler/testRunHandler');

exports.command = 'run';

//exports.desc = y18n.localized('componentDesc');
exports.builder = {
  embededServerPort: {
    alias: 'serverPort'
  },
  testToRun: {
    alias: 'test'
    //describe: y18n.localized('ucDesc')
  },
  testPath: {
    alias: 'testFolder'
    //describe: y18n.localized('ucDesc')
  },
  chromePath: {
    alias: 'chromiumPath'
  },
  watch: {
    boolean: true
    //describe: y18n.localized('ucDesc')
  }
};
exports.handler = function(argv) {
  let configHandler = new ConfigHandler();
  configHandler.updateWithConsoleArg(argv);

  let testRunHandler = new TestRunHandler(configHandler);

  return testRunHandler.handle();
};
