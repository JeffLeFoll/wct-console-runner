EmbededServer = require('../../server/EmbededServer');
TddRunner = require('../../runner/TddRunner');

class TestRunHandler {
  constructor(argv, configResolver) {
    this.argv = argv;
    this.embededServer = null;
    this.configResolver = configResolver;
  }

  handle() {
    let url = this.argv.deployedTestsUrl || this.configResolver.getDeployedTestsUrl();

    console.log('url: ' + url);

    if (this.configResolver.useEmbededServer() && this.argv.deployedTestsUrl == null) {
      this.embededServer = new EmbededServer(this.configResolver.getEmbededServerPort());
      this.embededServer.start();
      url = 'http://localhost:' + this.configResolver.getEmbededServerPort();
    }

    url = url + '/test/' + this.configResolver.getTestToRun();

    let runner = new TddRunner();
    runner.exec(url);

    runner.on('testRunFinished', () => {
      if (this.embededServer) {
        this.embededServer.stop();
        return;
      }
    });

    return;
  }
}

module.exports = TestRunHandler;
