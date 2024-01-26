const path = require('path');
const os = require('os');
const process = require('process');

// Prints the separator for this os
console.log(path.sep);

const baseName = path.basename('/home/vagrant/my_practice/n_basics/5-node-core/package.json');
console.log(baseName);

const dirName = path.dirname('/home/vagrant/my_practice/n_basics/5-node-core/package.json');
console.log(dirName);

const extName = path.extname('/home/vagrant/my_practice/n_basics/5-node-core/package.json');
console.log(extName);

const joinPath = path.join('Aina', 'Jesulayomi', 'Michael');
console.log(joinPath);

const wd = path.resolve();
console.log(wd);

// https://nodejs.org/api/os.html

const eol = os.EOL;
console.log(eol);

// https://nodejs.org/api/process.html

const nodeRelease = process.release;
console.log(nodeRelease);

// process.exit(0);

process.stderr.write('Bad catto\n');

const args = process.argv;
console.log(args);
