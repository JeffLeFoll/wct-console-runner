fse = require('fs-extra');
chokidar = require('chokidar');
EmbededServer = require('../../server/embededServer');
TddRunner = require('../../runner/tddRunner');
Locales = require('../../locales');
y18n = new Locales();

class TestRunHandler {
  constructor(runtimeConfig) {
    this.runtimeConfig = runtimeConfig;
    this.embededServer = null;
  }

  async handle() {
    let runner = new TddRunner(
      this.runtimeConfig.watchChanges(),
      this.runtimeConfig.getChromePath()
    );
    await runner.init();

    this.embededServer = new EmbededServer(this.runtimeConfig.getEmbededServerPort());
    this.embededServer.start();

    let watcher;
    if (this.runtimeConfig.watchChanges()) {
      watcher = chokidar.watch(['./test', './*.html'], {
        ignored: /[\\\/](node_modules|bower_components)[\\\/]/,
        persistent: true,
        cwd: '.'
      });
    }

    let baseUrl = 'http://localhost:' + this.runtimeConfig.getEmbededServerPort();
    baseUrl = `${baseUrl}/${this.runtimeConfig.getTestPath()}/`;

    let singleTestFile = this._isSingleTestFile(this.runtimeConfig);

    if (singleTestFile) {
      this._exectuteOneTestFile(baseUrl, this.runtimeConfig, runner, watcher);
    } else {
      this._executeAllTestsInTestsFolder(baseUrl);
    }

    runner.on('testRunFinished', () => {
      if (this.embededServer && !this.runtimeConfig.watchChanges()) {
        this.embededServer.stop();
        watcher.close();
        return;
      }
    });

    watcher.close();
    return;
  }

  _isSingleTestFile(config) {
    let singleTestFile = fse.pathExistsSync(`./${config.getTestPath()}/index.html`);

    if (config.getTestToRun()) {
      if (fse.pathExistsSync(`./${config.getTestPath()}/${config.getTestToRun()}`)) {
        singleTestFile = true;
      } else {
        throw new Error(y18n.localized('notExistingTest'));
      }
    }
    return singleTestFile;
  }

  _exectuteOneTestFile(baseUrl, config, runner, watcher) {
    let url = '';
    if (config.getTestToRun()) {
      url = baseUrl + config.getTestToRun();
    } else if (fse.pathExistsSync(`./${config.getTestPath()}/index.html`)) {
      url = baseUrl + 'index.html';
    } else {
      throw new Error(y18n.localized('noTestFileError'));
    }

    runner.exec(url);

    if (config.watchChanges()) {
      watcher.on('change', path => runner.exec(url));
    }
  }

  _executeAllTestsInTestsFolder(baseUrl) {
    throw new Error(y18n.localized('multipleFilesError'));
  }
}

module.exports = TestRunHandler;
