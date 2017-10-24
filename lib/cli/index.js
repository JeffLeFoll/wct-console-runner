packageInfos = require('../../package');

require('yargs')
  .commandDir('commands')
  .demand(1)
  .help()
  .alias('v', 'version')
  .version(displayVersion())
  .describe('v', 'show version information').argv;

function displayVersion() {
  return `${packageInfos.name} (${packageInfos.version}) 
  ${packageInfos.description}`;
}
