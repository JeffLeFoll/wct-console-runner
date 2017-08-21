const solarized = {
  brblack: '#1c1c1c',
  black: '#262626',
  brgreen: '#585858',
  bryellow: '#626262',
  brblue: '#808080',
  brcyan: '#8a8a8a',
  white: '#e4e4e4',
  brwhite: '#ffffd7',
  yellow: '#af8700',
  brred: '#d75f00',
  red: '#d70000',
  magenta: '#af005f',
  brmagenta: '#5f5faf',
  blue: '#0087ff',
  cyan: '#00afaf',
  green: '#5f8700'
};

const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const chalk = require('chalk');
const nearestColor = require('nearest-color').from(solarized);

var indents = 1;

function launchChrome(headless = true) {
  return chromeLauncher.launch({
    port: 9222, // Uncomment to force a specific port of your choice.
    chromeFlags: ['--start-maximized', '--disable-gpu', '--headless'],
    chromePath: '/usr/bin/chromium-browser'
  });
}

function indent() {
  return Array(indents).join('  ');
}

async function runner() {
  const chrome = await launchChrome();
  const protocol = await CDP({ port: chrome.port });

  indents = 1;

  try {
    const { Runtime, Page } = protocol;

    await Page.enable();
    await Runtime.enable();

    Runtime.consoleAPICalled(params => {
      if (params.type === 'endGroup') {
        --indents;
        console.groupEnd('\r\n');
      } else {
        if (params.type === 'startGroup') {
          ++indents;
          console.group();
        }

        let rawText = params.args[0].value;
        let textToWrite = indent() + rawText.replace('%c', '');

        if (params.args[1]) {
          let colorSpecified = params.args[1].value.match(
            /#([a-f0-9]{3}){1,2}\b/i
          );

          if (colorSpecified != null) {
            let solarizedColor = nearestColor(colorSpecified[0]).value;
            textToWrite = chalk.hex(solarizedColor)(textToWrite);
          }
        }

        console.log(textToWrite);

        if (rawText.includes('Evaluated')) {
          protocol.close();
          chrome.kill();
        }
      }
    });

    await Page.navigate({
      url: 'http://127.0.0.1:8081/test/slate-idb-store_test.html'
    });
  } catch (err) {
    console.error(err);
    protocol.close();
    chrome.kill();
  }
}

runner();
