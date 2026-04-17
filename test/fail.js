import { describe, it, expect } from "vitest";
import backtick from "../lib/index.js";

describe("fail", function () {
  it("glob no match", function () {
    return backtick("test/__NO_MATCH__").catch((e) => {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("no match template file");
    });
  });
});
