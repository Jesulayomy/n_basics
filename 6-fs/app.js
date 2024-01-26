const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'data.txt');

fs.open(filePath, 'r', (err, fd) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File successfully opened');

  fs.readFile(fd, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
});

