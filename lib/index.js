'use strict';
const fs = require('fs');
const glob = require('glob');
const glob2base = require('glob2base');
const mkdirp = require('mkdirp');
const path = require('path');

function backtick(src, dest, data, opt) {
  const options = opt || {};
  const base = options.base || glob2base(new glob.Glob(src));

  glob.sync(src, { nodir: true }).forEach((template) => {
    const filePath = path.resolve(dest, template.replace(base, ''));
    const content = fs.readFileSync(path.resolve(template), 'utf8');
    const keys = Object.keys(data);
    const values = keys.map((key) => { return data[key]; });
    const output = new (Function.prototype.bind.apply(Function, [null].concat(keys, ['return ' + content + ';'])))().apply(undefined, values);
    mkdirp(path.dirname(filePath));
    fs.writeFileSync(filePath, output, 'utf8');
  });
}

module.exports = backtick;
