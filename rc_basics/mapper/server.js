const http = require('http');
const fs = require('fs');
const url = require('url');
const figlet = require('figlet');

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if (page == '/api') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const jsonObject = {
      'key': 'value',
      'count': 1,
    }
    res.end(JSON.stringify(jsonObject));
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/css/normalize.css') {
    fs.readFile('css/normalize.css', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else if (page == '/img/image.png') {
    fs.readFile('img/image.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.writeHead(404, 'Not Found');
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000, () => console.log('Server is Listening on port 8000...'));