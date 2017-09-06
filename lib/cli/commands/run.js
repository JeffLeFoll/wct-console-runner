/*Locales = require('../../locales');
y18n = new Locales();
ComponentGenerator = require('../../../generator/componentGenerator');
ConfigResolver = require('../../../generator/configResolver');
RootIndexGenerator = require('../../../generator/rootIndexGenerator');*/

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
  console.log('argv.deployedTestsUrl : ' + argv.deployedTestsUrl);
  console.log('argv.testToRun : ' + argv.testToRun);
  /*let configResolver = new ConfigResolver();
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
  }*/
};
