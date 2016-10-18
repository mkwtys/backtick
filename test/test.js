'use strict';
const assert = require('power-assert');
const backtick = require('../lib/');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const fixtureTest = (fixtureName, ext) => {
  const data = {
    a: 5,
    b: 10
  };

  it(fixtureName, function() {
    return backtick(`./test/fixtures/${fixtureName}/**/fixture.${ext}`, './test/fixtures/dist/', data, {
      base: `./test/fixtures/`
    }).then((values) => {
      const expected = fs.readFileSync(path.resolve(glob.sync(`./test/fixtures/${fixtureName}/**/expected.${ext}`).join('')), 'utf8');
      const dist = fs.readFileSync(path.resolve(glob.sync(`./test/fixtures/dist/${fixtureName}/**/fixture.${ext}`).join('')), 'utf8');
      assert(values[0] === expected);
      assert(dist);
    });
  });
};

describe('fixtures', function() {
  fixtureTest('template-literal', 'txt');
  fixtureTest('no-wrap', 'txt');
  fixtureTest('directory', 'txt');
});
