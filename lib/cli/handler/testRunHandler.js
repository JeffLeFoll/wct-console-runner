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

    let url = this.runtimeConfig.getDeployedTestsUrl();
    if (this.runtimeConfig.useEmbededServer) {
      this.embededServer = new EmbededServer(this.runtimeConfig.getEmbededServerPort());
      this.embededServer.start();
      url = 'http://localhost:' + this.runtimeConfig.getEmbededServerPort();
    }

    url = url + '/test/' + this.runtimeConfig.getTestToRun();

    runner.exec(url);

    if (this.runtimeConfig.watchChanges()) {
      let watcher = chokidar.watch('/home/jeff/Dev/projets//slate-idb-store/test/', {
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
