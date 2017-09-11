fse = require('fs-extra');
expect = require('chai').expect;
ConfigGenerator = require('./configGenerator');
defaultConfFile = require('../../../config/defaultConfig');

describe('ConfigGenerator functionalities', () => {
  before(() => {
    ConfigGenerator.writeDefaultConfigFile();
  });

  it('should write the default conf file', () => {
    let generatedConfFile = require('../../../' + ConfigGenerator.configFileName());

    expect(generatedConfFile).to.deep.equal(defaultConfFile);
  });

  after(() => {
    fse.removeSync('./' + ConfigGenerator.configFileName());
  });
});
