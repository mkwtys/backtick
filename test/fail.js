const assert = require("assert");
const backtick = require("../lib/");

describe("fail", function () {
  it("glob no match", function () {
    return backtick("test/__NO_MATCH__").catch((e) => {
      assert(e instanceof Error);
      assert(e.message === "no match template file");
    });
  });
});
