prpl = require('prpl-server');
express = require('express');

const app = express();

app.get('/api/launch', (req, res, next) => res.send('boom'));

app.get('/*', prpl.makeHandler('.'));

let httpServer = app.listen(9898);

//httpServer.close();
