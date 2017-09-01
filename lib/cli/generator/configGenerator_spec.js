fse = require('fs-extra');
expect = require('chai').expect;
ConfigGenerator = require('./configGenerator');
defaultConfFile = require('./config');

describe('ConfigGenerator functionalities', function() {
  before(function() {
    ConfigGenerator.writeDefaultConfigFile();
  });

  it('should write the default conf file', function() {
    let generatedConfFile = require('../../../wct-tdd-runner.config.json');

    expect(generatedConfFile).to.deep.equal(defaultConfFile);
  });

  after(function() {
    fse.removeSync('./wct-tdd-runner.config.json');
  });
});
