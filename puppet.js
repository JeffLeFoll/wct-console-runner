const puppeteer = require('puppeteer');
const chalk = require('chalk');

async function puppet(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  indents = 1;

  page.on('console', (...params) => {
    console.log(params);

    /*  if (params[0] === 'console.groupEnd') {
      --indents;
      console.groupEnd('\r\n');
    } else {
      if (params[0] === 'console.groupStart') {
        ++indents;
        console.group();
      }*/

    // let color = '#ffffff';
    //if (params.length > 1) {
    //  let colorSpecified = params[1].match(/#([a-f0-9]{3}){1,2}\b/i);

    //if (colorSpecified != null) {
    //color = colorSpecified[0];
    //}
    //}

    //let text = params[0];
    //console.log(chalk.hex(color)(indent(indents) + text.replace('%c', '')));

    //  }
  });

  await page.goto(url);

  await page.waitForNavigation({ waitUntil: 'load' });

  browser.close();
}

function indent(indents) {
  return Array(indents).join('  ');
}

puppet('http://127.0.0.1:8081/test/index.html');
