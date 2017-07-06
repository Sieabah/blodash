'use strict';

const Mocha = require('mocha'),
  glob = require('glob');

let mocha = new Mocha({

});

for(let file of glob.sync('tests/*.test.js'))
  mocha.addFile(file);

mocha.run();