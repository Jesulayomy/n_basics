const http = require('http');
const fs = require('fs');
const url = require('url');

const API = {
  'hits': 0,
}

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
    API.hits += 1;
    res.end(JSON.stringify(API));
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
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
    res.writeHead(404, 'Not Found');
    res.write("Something went wrong!");
    res.end();
  }
});

server.listen(8000, () => console.log('Server is Listening on port 8000...'));
