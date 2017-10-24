prpl = require('prpl-server');
express = require('express');

class EmbededServer {
  constructor(port) {
    this.port = port;
    this.app = express();

    app.get('/*', prpl.makeHandler('.'));
  }

  start() {
    this.httpServer = this.app.listen(this.port);
  }

  stop() {
    this.httpServer.close();
  }
}

module.exports = EmbededServer;
