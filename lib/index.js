'use strict';
const fs = require('fs');
const glob = require('glob');
const glob2base = require('glob2base');
const mkdirp = require('mkdirp');
const path = require('path');

const isTemplateLiteral = (str) => {
  const start = str.charAt(0);
  const end = str.charAt(str.length - 1);
  return start === '`' && end === '`';
};

const createFunctionBody = (str) => {
  if (isTemplateLiteral(str)) {
    return 'return ' + str + ';';
  }

  return 'return `' + str + '`;';
};

function backtick(src, dest, data, opt) {
  const options = opt || {};
  const base = options.base || glob2base(new glob.Glob(src));
  const templates = glob.sync(src, { nodir: true });

  if (templates.length === 0) {
    return Promise.reject(new Error('no match template file'));
  }

  return Promise.all(templates.map((template) => {
    return Promise.resolve().then(() => {
      const content = fs.readFileSync(path.resolve(template), 'utf8').trim();
      const funcBody = createFunctionBody(content);
      const keys = Object.keys(data);
      const values = keys.map((key) => { return data[key]; });
      const output = new (Function.prototype.bind.apply(Function, [null].concat(keys, [funcBody])))().apply(undefined, values);
      const filePath = path.resolve(dest, template.replace(base, ''));
      mkdirp.sync(path.dirname(filePath));
      fs.writeFileSync(filePath, output, 'utf8');
    });
  }));
}

module.exports = backtick;
