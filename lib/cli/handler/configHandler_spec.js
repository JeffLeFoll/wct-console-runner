fse = require('fs-extra');
expect = require('chai').expect;
ConfigGenerator = require('../generator/configGenerator');
ConfigHandler = require('./configHandler');

describe('ConfigHandler functionalities', () => {
  it('should get the default embeded server port', () => {
    let configHandler = new ConfigHandler();

    expect(configHandler.getEmbededServerPort()).to.equal(9898);
  });

  it('should get the default test file to run', () => {
    let configHandler = new ConfigHandler();

    expect(configHandler.getTestToRun()).to.equal('index.html');
  });

  it('should get the default chrome / chromium path', () => {
    let configHandler = new ConfigHandler();

    expect(configHandler.getChromePath()).to.equal('');
  });

  it('should get the test path', () => {
    let configHandler = new ConfigHandler();

    expect(configHandler.getTestPath()).to.equal('test');
  });

  it('should tell if we must watch files change', () => {
    let configHandler = new ConfigHandler();

    expect(configHandler.watchChanges()).to.be.false;
  });

  it('should get all its data from the custom conf file', () => {
    let customJsonData = {
      embededServerPort: 5544,
      testToRun: 'toto.html',
      chromePath: '/bin/usr/chrome'
    };

    fse.writeJsonSync('./' + ConfigGenerator.configFileName(), customJsonData);

    let configHandler = new ConfigHandler();

    try {
      expect(configHandler.getEmbededServerPort()).to.equal(5544);
      expect(configHandler.getTestToRun()).to.equal('toto.html');
      expect(configHandler.getChromePath()).to.equal('/bin/usr/chrome');
    } finally {
      fse.removeSync('./' + ConfigGenerator.configFileName());
    }
  });

  it('should update with the console argument', () => {
    let argv = {
      embededServerPort: 1234,
      chromePath: '/opt/chromium',
      testToRun: 'test.html',
      testPath: 'toto/plop',
      watch: true
    };

    let configHandler = new ConfigHandler();

    configHandler.updateWithConsoleArg(argv);

    expect(configHandler.getEmbededServerPort()).to.equal(1234);
    expect(configHandler.getChromePath()).to.equal('/opt/chromium');
    expect(configHandler.getTestToRun()).to.equal('test.html');
    expect(configHandler.getTestPath()).to.equal('toto/plop');
    expect(configHandler.watchChanges()).to.be.true;
  });
});
