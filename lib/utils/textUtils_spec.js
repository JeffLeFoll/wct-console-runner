TextUtils = require("./textUtils");
expect = require("chai").expect;

describe("TextUtils functionalities", () => {
  it("should return a string representing an indent of 5 spaces", () => {
    let indent = TextUtils.indentToN(5);

    expect(generatedConfFile).to.equal('     ');
  });

  it("should return raw text if no colour specified", () => {
    let text = "unTestExemple";

    let result = TextUtils.colorizedTextIfColorSpecified(text);

    expect(result).to.equal(text);
  });

  it("should return raw text if specified colour is invalid", () => {
    let text = "unTestExemple";

    let result = TextUtils.colorizedTextIfColorSpecified(text);

    expect(result).to.equal(text);
  });

  it("should return colored text", () => {
    let text = "unTestExemple";

    let result = TextUtils.colorizedTextIfColorSpecified(text, '#626262');

    expect(result).to.equal();
  });
});
