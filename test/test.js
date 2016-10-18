'use strict';
const assert = require('power-assert');
const backtick = require('../lib/');
const fs = require('fs');
const mkdirp = require('mkdirp');

describe('backtick', function() {
  const data = {
    a: 5,
    b: 10
  };

  before(function() {
    mkdirp('./test/dist/');
  });

  it('generate from template files', function() {
    return backtick('./test/template/**/*', './test/dist/', data).then(() => {
      const template = fs.readFileSync('./test/dist/template.txt', 'utf8');
      assert(template === `Fifteen is 15 and
not 20.`);
    const template2 = fs.readFileSync('./test/dist/template2.txt', 'utf8');
    assert(template2 === `Fifteen is 15 and
not 30.`);
      const dirTemplate = fs.readFileSync('./test/dist/dir/template.txt', 'utf8');
      assert(dirTemplate === `Fifteen is 15 and
not 40.`);
    });
  });
});
