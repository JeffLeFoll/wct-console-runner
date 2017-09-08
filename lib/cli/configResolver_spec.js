fse = require('fs-extra');
expect = require('chai').expect;
ConfigGenerator = require('./generator/configGenerator');
ConfigResolver = require('./configResolver');

describe('ConfigResolver functionalities', function() {
  it('should get the default embeded server port', function() {
    let cg = new ConfigResolver();

    expect(cg.getEmbededServerPort()).to.equal(9898);
  });

  it('should get the default depolyed tests url', function() {
    let cg = new ConfigResolver();

    expect(cg.getDeployedTestsUrl()).to.equal('');
  });

  it('should get the default test file to run', function() {
    let cg = new ConfigResolver();

    expect(cg.getTestToRun()).to.equal('index.html');
  });

  it('should get the default chrome / chromium path', function() {
    let cg = new ConfigResolver();

    expect(cg.getChromePath()).to.equal('');
  });

  it('should tell to use the embeded server if no deployed tests url is given', function() {
    let cg = new ConfigResolver();

    expect(cg.useEmbededServer()).to.be.true;
  });

  it('should get all its data from the custom conf file', function() {
    let customJsonData = {
      embededServerPort: 5544,
      deployedTestsUrl: 'http://localhost:8082/',
      testToRun: 'toto.html',
      chromePath: '/bin/usr/chrome'
    };

    fse.writeJsonSync('./' + ConfigGenerator.configFileName(), customJsonData);

    let configResolver = new ConfigResolver();

    try {
      expect(configResolver.getEmbededServerPort()).to.equal(5544);
      expect(configResolver.getDeployedTestsUrl()).to.equal('http://localhost:8082/');
      expect(configResolver.getTestToRun()).to.equal('toto.html');
      expect(configResolver.getChromePath()).to.equal('/bin/usr/chrome');
      expect(configResolver.useEmbededServer()).to.be.false;
    } finally {
      fse.removeSync('./' + ConfigGenerator.configFileName());
    }
  });
});
