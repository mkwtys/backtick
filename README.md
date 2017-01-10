[![Build Status](https://travis-ci.org/mkwtys/backtick.svg?branch=master)](https://travis-ci.org/mkwtys/backtick)
[![codecov](https://codecov.io/gh/mkwtys/backtick/branch/master/graph/badge.svg)](https://codecov.io/gh/mkwtys/backtick)

# backtick

template literal based template engine.

## Install

```sh
$ npm install backtick
```

## Usage

```
// template.txt
Fifteen is ${a + b} and
not ${2 * a + b}.

or

`Fifteen is ${a + b} and
not ${2 * a + b}.`
```

```js
// example
const backtick = require('backtick');

backtick(`template.txt`, 'dist', {
  a: 5,
  b: 10
});
```

```
// dist/template.txt
Fifteen is 15 and
not 20.
```

## License

MIT © [mkwtys](https://github.com/mkwtys)
