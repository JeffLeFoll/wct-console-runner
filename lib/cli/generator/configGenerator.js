fse = require('fs-extra');
configJSON = require('../../../config/defaultConfig');

const fileName = 'wc-test-runner.config.json';

class ConfigGenerator {
  static configFileName() {
    return fileName;
  }

  static writeDefaultConfigFile() {
    fse.writeJsonSync('./' + fileName, configJSON);
  }
}

module.exports = ConfigGenerator;
