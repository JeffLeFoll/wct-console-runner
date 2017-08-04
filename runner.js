const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const chalk = require('chalk');

var indents = 1;

function launchChrome(headless = true) {
    return chromeLauncher.launch({
        port: 9222, // Uncomment to force a specific port of your choice.
        chromeFlags: [
            '--start-maximized',
            '--disable-gpu',
            '--headless'
        ]
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

        await Page.navigate({ url: 'http://127.0.0.1:8081/test/slate-idb-store_test.html' });

      //  await Page.loadEventFired();

        let { data } = await Page.captureScreenshot();
        // fs.writeFileSync('toto.png', Buffer.from(data, 'base64'));

    } catch (err) {
        console.error(err);
    } finally {
        await protocol.close();
        await chrome.kill();
    }

};

runner();
