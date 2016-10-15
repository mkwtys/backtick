'use strict';
const assert = require('power-assert');
const fs = require('fs');
const backtick = require('../lib/');

describe('backtick', function() {
  const data = {
    a: 5,
    b: 10
  };

  it('generate template file', function() {
    return backtick('./test/template.txt', data, { dest: './test/dist/' })
      .then((values) => {
        assert(values[0] === `Fifteen is 15 and
not 20.`);
      });
  });
});
