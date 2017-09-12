fse = require('fs-extra');
chokidar = require('chokidar');
EmbededServer = require('../../server/EmbededServer');
TddRunner = require('../../runner/TddRunner');

class TestRunHandler {
  constructor(runtimeConfig) {
    this.runtimeConfig = runtimeConfig;
    this.embededServer = null;
  }

  async handle() {
    let runner = new TddRunner(this.runtimeConfig.watchChanges());
    await runner.init();

    this.embededServer = new EmbededServer(this.runtimeConfig.getEmbededServerPort());
    this.embededServer.start();
    let url = 'http://localhost:' + this.runtimeConfig.getEmbededServerPort();

    url = `${url}/${this.runtimeConfig.getTestPath()}/`;

    if (this.runtimeConfig.getTestToRun()) {
      url = url + this.runtimeConfig.getTestToRun();
    } else if (fse.pathExistsSync(`./${this.runtimeConfig.getTestPath()}/index.html`)) {
      url = url + 'index.html';
    }

    await runner.exec(url);

    if (this.runtimeConfig.watchChanges()) {
      let watcher = chokidar.watch('/home/jeff/Dev/projets/slate-idb-store/test/', {
        ignored: /(^|[\/\\])\../,
        persistent: true
      });

      watcher.on('change', path => runner.exec(url));
    }

    runner.on('testRunFinished', () => {
      if (this.embededServer && !this.runtimeConfig.watchChanges()) {
        this.embededServer.stop();
        return;
      }
    });

    return;
  }
}

module.exports = TestRunHandler;
