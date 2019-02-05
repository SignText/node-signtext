/**
 * Test literal parsing.
 */

const chai = require("chai");

const signtext = require("./../../../");

describe("Literal", function () {
  const runtime = new signtext.Runtime();

  describe("BooleanLiteral", function () {
    it("Should produce `true` from `true`", function (done) {
      const ctx = new signtext.Context({
        check(x) {
          chai.expect(x).to.be.a("boolean");
          chai.expect(x).to.be.true;
          done();
        }
      });
      runtime.eval(`[check](true)`, ctx);
    });

    it("should produce `false` from `false`", function (done) {
      const ctx = new signtext.Context({
        check(x) {
          chai.expect(x).to.be.a("boolean");
          chai.expect(x).to.be.false;
          done();
        }
      });
      runtime.eval(`[check](false)`, ctx);
    });
  });

  describe("NumberLiteral", function () {
    it("Should produce a number from a float", function (done) {
      const ctx = new signtext.Context({
        check(x) {
          chai.expect(x).to.be.a("number");
          chai.expect(x).to.equal(3.1415);
          done();
        }
      });
      runtime.eval(`[check](3.1415)`, ctx);
    });

    it("should produce a number from an integer", function (done) {
      const ctx = new signtext.Context({
        check(x) {
          chai.expect(x).to.be.a("number");
          chai.expect(x).to.equal(3);
          done();
        }
      });
      runtime.eval(`[check](3)`, ctx);
    });

    it("should correctly parse exponents", function (done) {
      const ctx = new signtext.Context({
        check(a, b, c) {
          chai.expect(a).to.equal(3.14);
          chai.expect(b).to.equal(3000);
          chai.expect(c).to.equal(0.02);
          done();
        }
      });
      runtime.eval(`[check](314.0e-2, 3e3, 2e-2)`, ctx);
    });
  });

  describe("StringLiteral", function () {
    it("Should produce a string", function (done) {
      const ctx = new signtext.Context({
        check(x) {
          chai.expect(x).to.be.a("string");
          chai.expect(x).to.equal("Abc");
          done();
        }
      });
      runtime.eval(`[check]("Abc")`, ctx);
    });

    it("Should escape quotation marks", function (done) {
      const ctx = new signtext.Context({
        check(x) {
          chai.expect(x).to.be.a("string");
          chai.expect(x).to.equal("\"Abc\"");
          done();
        }
      });
      runtime.eval(`[check]("\\"Abc\\"")`, ctx);
    });
  });
});
