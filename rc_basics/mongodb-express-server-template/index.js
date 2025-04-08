const express = require('express');
const mongodb = require('mongodb');


const DB_URL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2 "; // process.env['DB_URL2'];


const app = express();
const MongoClient = mongodb.MongoClient;
MongoClient.connect(DB_URL).then((client) => {
  console.log('Connected to MongoDB database...');
  const db = client.db('DATABASE');
  const quotesCollection = db.collection('quotes');


  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('view-engine', 'ejs');


  app.get('/', function(request, response) {
    db.collection('quotes').find().toArray()
      .then(results => {
        response.render('index.ejs', { quotes: results });
      })
      .catch(err => console.error(err));
  });

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        console.log(result);
        res.redirect('/');
      })
      .catch(err => console.error(err));
  });

  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
      { name: 'Mogwli' },
      { $set: {
        name: req.body.name,
        quote: req.body.quote
      }},
      { upsert: true}
    )
      .then(result => res.json(result || { replace: 'Success' }))
      .catch(err => console.error(err));
  })

  app.delete('/quotes', (req, res) => {
    quotesCollection
      .deleteOne({ name: req.body.name })
      .then(result => {
        if (result.deletedCount == 0) {
          return res.json({ error: 'No Quote to delete' })
        } else {
          return res.json({ success: `Deleted Darth Vader's quote`})
        }
      })
      .catch(error => console.error(error))
  })

  app.listen(3000,() => {
    console.log('Server started and listening at port 3000...')
  });
}).catch(err => console.error(err));