const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json);
// app.set('view-engine', 'ejs');


app.get('/', (req, res) => {
  res.sendFile(__dirname, '/index.html');
  // res.render('index.ejs', { quotes: results });
  // const name = req.body.name
  // res.json({ status: true, name: name });
});


app.listen(
  8000,
  () => console.log('Server is Listening on port 8000...'),
  (err) => console.error('There was an issue running the application', err) 
);
