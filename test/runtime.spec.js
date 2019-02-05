const chai = require("chai");

const signtext = require("./../");

describe("Runtime", function () {
  it("Should correctly parse the specified SignText code", async function () {
    const rt = new signtext.Runtime();
    chai.expect(await rt.eval(`"Hello"`)).to.equal("Hello");
  });
});
