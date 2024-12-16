const assert = require("assert");
const backtick = require("../lib/");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const fixtureTest = (fixtureName, ext) => {
  const data = {
    a: 5,
    b: 10,
  };

  it(fixtureName, function () {
    return backtick(
      `test/fixtures/${fixtureName}/**/fixture.${ext}`,
      "test/fixtures/dist/",
      data,
      {
        base: `test/fixtures/`,
      }
    ).then(() => {
      const actual = fs.readFileSync(
        path.resolve(
          glob
            .sync(`test/fixtures/dist/${fixtureName}/**/fixture.${ext}`)
            .join("")
        ),
        "utf8"
      );
      const expected = fs.readFileSync(
        path.resolve(
          glob.sync(`test/fixtures/${fixtureName}/**/expected.${ext}`).join("")
        ),
        "utf8"
      );
      assert(actual === expected);
    });
  });
};

describe("fixtures", function () {
  fixtureTest("template-literal", "txt");
  fixtureTest("no-wrap", "txt");
  fixtureTest("directory", "txt");
});
