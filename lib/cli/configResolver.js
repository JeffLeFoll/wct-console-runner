fse = require('fs-extra');
path = require('path');
ConfigGenerator = require('./generator/configGenerator');

class ConfigResolver {
  constructor() {
    this.customConfig = this._loadCustomConfig();

    this.embededServer = this.customConfig.deployedTestsUrl === '';
  }

  updateWithConsoleArg(argv) {
    this.customConfig.watch = this.customConfig.watch || argv.watch;

    this.customConfig.deployedTestsUrl =
      argv.deployedTestsUrl || this.customConfig.deployedTestsUrl;

    this.embededServer = this.embededServer && argv.deployedTestsUrl == null;
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
    return this.embededServer;
  }

  watchChanges() {
    return this.customConfig.watch;
  }

  getTestPath() {
    return this.customConfig.testPath;
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
