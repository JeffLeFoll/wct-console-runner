EventEmitter = require('events');
chromeLauncher = require('chrome-launcher');
CDP = require('chrome-remote-interface');
TextUtils = require('../utils/textUtils');

class TddRunner extends EventEmitter {
  constructor(watchChanges) {
    super();
    this.watchChanges = watchChanges;
  }

  async init() {
    this.chrome = await this._launchChrome();
    this.protocol = await CDP({ port: this.chrome.port });

    try {
      let { Runtime, Page } = this.protocol;

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

          if (rawText.includes('Evaluated') && !this.watchChanges) {
            this._exitRunner(this.protocol, this.chrome);
            this.emit('testRunFinished');
          }
        }
      });
    } catch (err) {
      console.error(err);
      this._exitRunner(protocol, chrome);
    }
  }

  async exec(url) {
    console.log('Running tests from : ' + url);

    this.indents = 1;

    let { Runtime, Page } = this.protocol;

    await Page.enable();
    await Runtime.enable();

    Runtime.discardConsoleEntries();

    await Page.navigate({ url: url });
  }

  _launchChrome() {
    return chromeLauncher.launch({
      chromeFlags: ['--start-maximized', '--disable-gpu', '--headless'],
      chromePath: '/usr/bin/chromium-browser'
    });
  }

  _exitRunner(protocol, chrome) {
    protocol.close();
    chrome.kill();
  }
}

module.exports = TddRunner;
