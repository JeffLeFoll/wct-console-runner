chokidar = require('chokidar');
EmbededServer = require('../../server/EmbededServer');
TddRunner = require('../../runner/TddRunner');

class TestRunHandler {
  constructor(argv, configResolver) {
    this.argv = argv;
    this.embededServer = null;
    this.configResolver = configResolver;
  }

  async handle() {
    let watchChanges = this.configResolver.watchChanges() || this.argv.watch;

    let runner = new TddRunner(watchChanges);
    await runner.init();

    let url = this.argv.deployedTestsUrl || this.configResolver.getDeployedTestsUrl();

    if (this.configResolver.useEmbededServer() && this.argv.deployedTestsUrl == null) {
      this.embededServer = new EmbededServer(this.configResolver.getEmbededServerPort());
      this.embededServer.start();
      url = 'http://localhost:' + this.configResolver.getEmbededServerPort();
    }

    url = url + '/test/' + this.configResolver.getTestToRun();

    runner.exec(url);

    if (watchChanges) {
      let watcher = chokidar.watch('/home/jeff/Dev/projets//slate-idb-store/test/', {
        ignored: /(^|[\/\\])\../,
        persistent: true
      });

      watcher.on('change', path => runner.exec(url));
    }

    runner.on('testRunFinished', () => {
      if (this.embededServer && !watchChanges) {
        this.embededServer.stop();
        return;
      }
    });

    return;
  }
}

module.exports = TestRunHandler;
