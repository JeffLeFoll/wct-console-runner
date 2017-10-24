ConfigHandler = require('../handler/configHandler');
TestRunHandler = require('../handler/testRunHandler');
Locales = require('../../locales');
y18n = new Locales();

exports.command = 'run';
exports.desc = y18n.localized('runDesc');
exports.builder = {
  embededServerPort: {
    alias: 'serverPort',
    describe: y18n.localized('embededServerPortDesc')
  },
  testToRun: {
    alias: 'test',
    describe: y18n.localized('testToRunDesc')
  },
  testPath: {
    alias: 'testFolder',
    describe: y18n.localized('testPathDesc')
  },
  chromePath: {
    alias: 'chromiumPath',
    describe: y18n.localized('chromePathDesc')
  },
  watch: {
    boolean: true,
    describe: y18n.localized('watchDesc')
  }
};
exports.handler = function(argv) {
  let configHandler = new ConfigHandler();
  configHandler.updateWithConsoleArg(argv);

  let testRunHandler = new TestRunHandler(configHandler);

  return testRunHandler.handle();
};
