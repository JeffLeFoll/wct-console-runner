solarizedColorConfig = require('../../config/solarizedColors');
nearestColor = require('nearest-color').from(solarizedColorConfig);
chalk = require('chalk');

class TextUtils {
  static indentToN(space) {
    return Array(space).join('  ');
  }

  static colorizedTextIfColorSpecified(text, rawPossibleColor) {
    if (rawPossibleColor) {
      let colorSpecified = rawPossibleColor.value.match(/#([a-f0-9]{3}){1,2}\b/i);

      if (colorSpecified != null) {
        let solarizedColor = nearestColor(colorSpecified[0]).value;

        return chalk.hex(solarizedColor)(text);
      } else {
        return text;
      }
    }
    return text;
  }
}

module.exports = TextUtils;
