Locales = require('../../locales');
y18n = new Locales();
ComponentGenerator = require('../../../generator/componentGenerator');
ConfigResolver = require('../../../generator/configResolver');
RootIndexGenerator = require('../../../generator/rootIndexGenerator');

exports.command = 'run <name>';
exports.desc = y18n.localized('componentDesc');
exports.builder = {
  useEmbededServer: {
    alias: 'embeded',
    boolean: true,
    describe: y18n.localized('ucDesc')
  },
  deployedTestsUrl: {
    alias: 'serverUrl',
    describe: y18n.localized('ucDesc')
  },
  testToRun: {
    alias: 'test',
    describe: y18n.localized('ucDesc')
  }
};
exports.handler = function(argv) {
  let configResolver = new ConfigResolver();
  let rootIndexGenerator = new RootIndexGenerator(argv.name);

  let cg = new ComponentGenerator(
    argv.name,
    configResolver,
    rootIndexGenerator
  );
  cg.buildComponent();

  let createOrUpdate =
    argv.updateOrCreate != undefined || configResolver.getUpdateOrCreate();
  if (createOrUpdate) {
    cg.updateOrCreateRootModule(createOrUpdate);
  }
};
