EventEmitter = require('events');
chromeLauncher = require('chrome-launcher');
CDP = require('chrome-remote-interface');
TextUtils = require('../utils/textUtils');

class TddRunner extends EventEmitter {
  constructor() {
    super();
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
          let textToWrite = TextUtils.indentToN(this.indents) + rawText.replace('%c', '');

          textToWrite = TextUtils.colorizedTextIfColorSpecified(textToWrite, params.args[1]);

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

  _exitRunner(protocol, chrome) {
    protocol.close();
    chrome.kill();
    this.emit('testRunFinished');
  }
}

module.exports = TddRunner;
