const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');
console.log(filePath);

const dataFd = fs.openSync(filePath, 'r');
console.log('This is after fs.openSync()');
const data = fs.readFileSync(dataFd, 'utf8');
console.log('This is after rreading file');
console.log(data);
console.log('This is after logging data');

const stats = fs.statSync(filePath);
console.log(stats);
console.log(stats.isFile());
console.log(stats.isDirectory());
console.log(stats.size);
console.log(stats.birthtime);
console.log(stats.mtime);
