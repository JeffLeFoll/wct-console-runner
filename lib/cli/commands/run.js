/*Locales = require('../../locales');
y18n = new Locales();
ComponentGenerator = require('../../../generator/componentGenerator');
RootIndexGenerator = require('../../../generator/rootIndexGenerator');*/
ConfigResolver = require('../configResolver');
EmbededServer = require('../../server');
TddRunner = require('../../server');

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
  }
};
exports.handler = function(argv) {
  let configResolver = new ConfigResolver();

  if (configResolver.useEmbededServer()) {
    let embededServer = new EmbededServer(
      configResolver.getEmbededServerPort()
    );
    embededServer.start();
  }
  let testToExec = getTestToRun();
  let runner = new TddRunner();
  runner.exec(configResolver.testToExec);
};
