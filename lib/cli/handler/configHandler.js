fse = require('fs-extra');
path = require('path');
ConfigGenerator = require('../generator/configGenerator');

class ConfigHandler {
  constructor() {
    this.customConfig = this._loadCustomConfig();

    this.embededServer = this.customConfig.deployedTestsUrl === '';
  }

  updateWithConsoleArg(argv) {
    this.customConfig.watch = argv.watch || this.customConfig.watch;

    if (argv.embededServerPort) {
      this.customConfig.embededServerPort = argv.embededServerPort;
    }
    if (argv.chromePath) {
      this.customConfig.chromePath = argv.chromePath;
    }

    if (argv.testToRun) {
      this.customConfig.testToRun = argv.testToRun;
    }
    if (argv.testPath) {
      this.customConfig.testPath = argv.testPath;
    }
  }

  getEmbededServerPort() {
    return this.customConfig.embededServerPort;
  }

  getTestToRun() {
    return this.customConfig.testToRun;
  }

  getChromePath() {
    return this.customConfig.chromePath;
  }

  watchChanges() {
    return this.customConfig.watch;
  }

  getTestPath() {
    return this.customConfig.testPath;
  }

  _loadCustomConfig() {
    let config = require('../../../config/defaultConfig');

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

module.exports = ConfigHandler;
