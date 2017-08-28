fse = require('fs-extra');
configJSON = require('./config');

class ConfigGenerator {
  static writeDefaultConfigFile() {
    fse.writeJsonSync('./wct-tdd-runner.config.json', configJSON);
  }
}

module.exports = ConfigGenerator;
