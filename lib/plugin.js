/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
var chalk = require('chalk');
var chromeLauncher = require('chrome-launcher');
var CDP = require('chrome-remote-interface');


/** WCT plugin that enables support for remote browsers via Sauce Labs. */
module.exports = function (wct, pluginOptions) {

  var chrome = null;
  var protocol = null;

  wct.hook('prepare', function (done) {

    wct.emitHook('prepare:headless-chrome', function (error) {
      if (error) return done(error);

      start();
    });

  });

  wct.on('browser-start', function (def, data, stats, browser) {
    CDP({ port: chrome.port }, (client) => {
      protocol = client;

      const { Runtime, Page } = protocol;

      Runtime.consoleAPICalled((params) => {
        if (params.type === 'endGroup') {
          --indents;
          console.groupEnd('\r\n');
        } else {
          if (params.type === 'startGroup') {
            ++indents;
            console.group();
          }

          let color = '#ffffff';
          if (params.args[1]) {
            let colorSpecified = params.args[1].value.match(/#([a-f0-9]{3}){1,2}\b/i);

            if (colorSpecified != null) {
              color = colorSpecified[0];
            }
          }

          let text = params.args[0].value;
          console.log(chalk.hex(color)(indent() + text.replace('%c', '')));

        }
      });

      Promise.all([
        Network.enable(),
        Page.enable()
      ]).then(() => {
        return Page.navigate({ url: 'http://127.0.0.1:8081/test/slate-idb-store_test.html' });
      }).then(() => {
        return Page.loadEventFired();
      }).catch((err) => {
        console.error(err);
        client.close();
      });
    });
  });

  wct.on('browser-end', function (def, error, stats, sessionId, browser) {
    protocol.close().then(() => {
      return chrome.kill();
    });
  });

};

function start() {
  chrome = chromeLauncher.launch({
    port: 9222, // Uncomment to force a specific port of your choice.
    chromeFlags: [
      '--disable-gpu',
      '--headless'
    ]
  }).then(result => {
    chrome = result;
  });
}

function expandOptions(options) {

}


// Hacks for the wct-st binary.
module.exports.expandOptions = expandOptions;
module.exports.startTunnel = start;
