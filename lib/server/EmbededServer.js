prpl = require('prpl-server');
express = require('express');

/*const app = express();

app.get('/*', prpl.makeHandler('.'));

let httpServer = app.listen(9898);*/

//httpServer.close();

class EmbededServer {
  constructor(port) {
    this.port = port;
    this.app = express();

    //app.get('/*', prpl.makeHandler('.'));
    this.app.get('/*', prpl.makeHandler('../slate-idb-store/'));
  }

  start() {
    this.httpServer = this.app.listen(this.port);
  }

  stop() {
    this.httpServer.close();
    console.log('EmbededServer closed');
  }
}

module.exports = EmbededServer;
