const fs = require('fs');
const path = require('path');


const fileName = path.join(__dirname, '/test', 'hello.txt');


fs.mkdir(
  path.join(__dirname, '/test'),
  {},
  err => {
    if (err) console.log(err);
    console.log('Folder created');
})

fs.writeFile(
  fileName, 
  'Hey guys!',
  err => {
    if (err) throw err;
    console.error('File written to');
  }
)

fs.appendFile(
  fileName, 
  ' Hello World!',
  err => {
    if (err) throw err;
    console.error('File written to');
  }
)


fs.readFile(
  fileName,
  'utf-8',
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
)