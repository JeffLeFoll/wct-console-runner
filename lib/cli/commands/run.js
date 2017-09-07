/*Locales = require('../../locales');
y18n = new Locales();
ComponentGenerator = require('../../../generator/componentGenerator');
RootIndexGenerator = require('../../../generator/rootIndexGenerator');*/
ConfigResolver = require('../configResolver');
EmbededServer = require('../../server/EmbededServer');
TddRunner = require('../../runner/TddRunner');

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

  let url = configResolver.getDeployedTestsUrl() || argv.deployedTestsUrl;

  let embededServer;
  if (configResolver.useEmbededServer() && argv.deployedTestsUrl == null) {
    embededServer = new EmbededServer(configResolver.getEmbededServerPort());
    embededServer.start();
    url = 'http://localhost:' + configResolver.getEmbededServerPort();
  }

  url = url + '/test/' + configResolver.getTestToRun();

  let runner = new TddRunner();
  runner.exec(url);

  runner.on('testRunFinished', () => {
    if (embededServer) {
      embededServer.stop();
      return;
    }
  });

  return;
};
