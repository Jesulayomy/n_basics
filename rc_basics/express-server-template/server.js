const express = require('express');
const app = express();
const port = 3000;
const QUOTES = [
  "May the 4th be with you",
  "Time is money",
  "Surviving is winning",
  "I think, therefore I am",
  "To be or not to be?",
  "I have a dream",
  "Frankly, my dear, I don't give a damn"
]

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs', { quotes: QUOTES });
})

app.listen(port, () => {
  console.log(`Example app listening at  http://localhost:${port}`)
});
