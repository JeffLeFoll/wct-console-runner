fse = require('fs-extra');
path = require('path');
ConfigGenerator = require('./generator/configGenerator');

class ConfigResolver {
  constructor() {
    this.customConfig = this._loadCustomConfig();
  }

  getEmbededServerPort() {
    return this.customConfig.embededServerPort;
  }

  getDeployedTestsUrl() {
    return this.customConfig.deployedTestsUrl;
  }

  getTestToRun() {
    return this.customConfig.testToRun;
  }

  getChromePath() {
    return this.customConfig.chromePath;
  }

  useEmbededServer() {
    return this.customConfig.deployedTestsUrl === '';
  }

  _loadCustomConfig() {
    let config = require('../../config/defaultConfig');

    try {
      let filePath = path.join('.', ConfigGenerator.configFileName());
      let customConfig = fse.readJsonSync(filePath, { throws: false });

      if (customConfig) {
        config = customConfig;
      }
    } catch (e) {
      console.error(e);
    }

    return config;
  }
}

module.exports = ConfigResolver;
