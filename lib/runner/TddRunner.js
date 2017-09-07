EventEmitter = require('events').EventEmitter;
solarized = require('../../config/solarizedColors');
chromeLauncher = require('chrome-launcher');
CDP = require('chrome-remote-interface');
chalk = require('chalk');
nearestColor = require('nearest-color').from(solarized);

class TddRunner extends EventEmitter {
  constructor() {
    this.indents = 1;
  }

  async exec(url) {
    console.log('Running tests from : ' + url);

    this.chrome = await this._launchChrome();
    this.protocol = await CDP({ port: this.chrome.port });

    this.indents = 1;

    try {
      let { Runtime, Page } = this.protocol;

      await Page.enable();
      await Runtime.enable();

      Runtime.consoleAPICalled(params => {
        if (params.type === 'endGroup') {
          --this.indents;
          console.groupEnd('\r\n');
        } else {
          if (params.type === 'startGroup') {
            ++this.indents;
            console.group();
          }

          let rawText = params.args[0].value;
          let textToWrite =
            this._indent(this.indents) + rawText.replace('%c', '');

          textToWrite = this._colorizedTextIfColorSpecified(
            textToWrite,
            params.args[1]
          );

          console.log(textToWrite);

          if (rawText.includes('Evaluated')) {
            this._exitRunner(this.protocol, this.chrome);
          }
        }
      });

      await Page.navigate({ url: url });
    } catch (err) {
      console.error(err);
      this._exitRunner(protocol, chrome);
    }
  }

  _launchChrome(headless = true) {
    return chromeLauncher.launch({
      chromeFlags: ['--start-maximized', '--disable-gpu', '--headless'],
      chromePath: '/usr/bin/chromium-browser'
    });
  }

  _indent(indents) {
    return Array(indents).join('  ');
  }

  _colorizedTextIfColorSpecified(text, rawPossibleColor) {
    if (rawPossibleColor) {
      let colorSpecified = rawPossibleColor.value.match(
        /#([a-f0-9]{3}){1,2}\b/i
      );

      if (colorSpecified != null) {
        let solarizedColor = nearestColor(colorSpecified[0]).value;

        return chalk.hex(solarizedColor)(text);
      } else {
        return text;
      }
    }
    return text;
  }

  _exitRunner(protocol, chrome) {
    protocol.close();
    chrome.kill();
    //this.emit('testRunFinished');
  }
}
//runner('http://127.0.0.1:8081/test/slate-idb-store_test.html');

module.exports = TddRunner;
