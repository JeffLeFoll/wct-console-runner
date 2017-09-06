fse = require('fs-extra');
expect = require('chai').expect;
ConfigGenerator = require('./configGenerator');
defaultConfFile = require('../../../config/defaultConfig');

describe('ConfigGenerator functionalities', function() {
  before(function() {
    ConfigGenerator.writeDefaultConfigFile();
  });

  it('should write the default conf file', function() {
    let generatedConfFile = require('../../../' +
      ConfigGenerator.configFileName());

    expect(generatedConfFile).to.deep.equal(defaultConfFile);
  });

  after(function() {
    fse.removeSync('./' + ConfigGenerator.configFileName());
  });
});
