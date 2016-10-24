#! /usr/bin/env node
'use strict';
const backtick = require('../lib');
const globAll = require('glob-all');
const minimist = require('minimist');
const pkg = require('../package.json');

const argv = minimist(process.argv.slice(2), {
  boolean: [
    'help',
    'version'
  ],
  string: [
    'base',
    'data',
    'out-dir'
  ],
  alias: {
    b: 'base',
    d: 'data',
    h: 'help',
    o: 'out-dir',
    v: 'version'
  },
  default: {
    help: false,
    version: false
  }
});

function main() {
  backtick(globAll.sync(argv._), argv.o, JSON.parse(argv.d), {base: argv.b});
}

function showHelp() {
  console.log(`
${pkg.description}

Usage
  ${Object.keys(pkg.bin)[0]} <source> [options]

Options
  -b, --base       base directory
  -d, --data       data
  -h, --help       show help
  -o, --out-dir    output directory
  -v, --version    print version
`
  );
}

function showVersion() {
  console.log(pkg.version);
}

if (argv.help) {
  showHelp();
}

if (argv.version) {
  showVersion();
}

if (argv._.length > 0) {
  main();
}
