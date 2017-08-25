'use strict';

const Locales = require('../../locales');
const y18n = new Locales();
const ComponentGenerator = require('../../../generator/componentGenerator');
const ConfigResolver = require('../../../generator/configResolver');
const RootIndexGenerator = require('../../../generator/rootIndexGenerator');

exports.command = 'run <name>';
exports.desc = y18n.localized('componentDesc');
exports.builder = {
  updateOrCreate: {
    alias: 'uc',
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
