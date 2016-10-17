'use strict';
const assert = require('power-assert');
const fs = require('fs');
const backtick = require('../lib/');

describe('backtick', function() {
  const data = {
    a: 5,
    b: 10
  };

  it('generate from template files', function() {
    backtick('./test/template/**/*', './test/dist/', data);
    const template = fs.readFileSync('./test/dist/template.txt', 'utf8');
    assert(template === `Fifteen is 15 and
not 20.`);
    const template2 = fs.readFileSync('./test/dist/dir/template2.txt', 'utf8');
    assert(template2 === `Fifteen is 15 and
not 30.`);
  });
});
