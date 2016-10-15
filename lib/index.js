'use strict';
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

function backtick(files, data, options) {
  let templates = files;

  if (!Array.isArray(files)) {
    templates = [files];
  }

  return Promise.all(templates.map((template) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve(template), 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        }
        const keys = Object.keys(data);
        const values = keys.map((key) => { return data[key]; });
        const output = new (Function.prototype.bind.apply(Function, [null].concat(keys, ['return ' + content + ';'])))().apply(undefined, values);
        const file = path.basename(template);
        const filePath = path.resolve(options.dest, file);
        mkdirp.sync(`${options.dest}`);
        fs.writeFileSync(filePath, output);
        resolve(output);
      });
    });
  }));
}

module.exports = backtick;
