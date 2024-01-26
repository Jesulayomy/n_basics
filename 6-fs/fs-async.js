const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');
console.log(filePath);

fs.open(filePath, 'r', (err, fd) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(fd);

  fs.readFile(fd, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
  console.log('This is the last line of fs.open() callback');
});

console.log('This is the last line of the script');
