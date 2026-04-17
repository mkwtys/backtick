import { describe, it, expect } from "vitest";
import backtick from "../lib/index.js";
import fs from "fs";
import { globSync } from "glob";
import path from "path";

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
          globSync(`test/fixtures/dist/${fixtureName}/**/fixture.${ext}`).join("")
        ),
        "utf8"
      );
      const expected = fs.readFileSync(
        path.resolve(
          globSync(`test/fixtures/${fixtureName}/**/expected.${ext}`).join("")
        ),
        "utf8"
      );
      expect(actual).toBe(expected);
    });
  });
};

describe("fixtures", function () {
  fixtureTest("template-literal", "txt");
  fixtureTest("no-wrap", "txt");
  fixtureTest("directory", "txt");
});
