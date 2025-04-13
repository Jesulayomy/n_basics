const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require("dotenv").config();

const url = process.env.DB_URL;
const dbName = "demo";

MongoClient.connect(url).then((client) => {
  console.log("Connected to `" + dbName + "`!");
  const db = client.db(dbName);

  app.set('view engine', 'ejs')
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(express.static('public'))

  app.get('/', (req, res) => {
    db.collection('messages').find().toArray().then(result => {
      res.render('index.ejs', {messages: result})
    });
  });

  app.post('/messages', (req, res) => {
    db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}).then(result => {
      console.log('saved to database')
      res.redirect('/')
    });
  });

  app.put('/messages', (req, res) => {
    db.collection('messages')
    .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
      $set: {
        thumbUp:req.body.thumbUp + 1
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }).then(result => {
      res.send(result)
    });
  });

  app.delete('/messages', (req, res) => {
    db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}).then(result => {
      res.send('Message deleted!');
    });
  });

  app.listen(3000, () => console.log("Listening at port 3000"));
});
