const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

require('dotenv').config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const { User, Item } = require('./models/models');

app.set('view_engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = createServer(app);
const io = new Server(server);

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Listening to Database: rtc...');
    app.get('/', (req, res) => {
      Item.find().then(items => {
        if (items) {
          res.render('index.ejs', {items})
        } else {
          res.redirect('/start');
        }
      })
    })
    app.get('/items/:itemID', (req, res) => {
      const id = req.params.itemID;
      Item.findById(id).then((item) => {
        if (item) {
          res.render('item.ejs', {item});
        } else {
          res.json({ error: `Item does not exist`})
        }
      })
      .catch(error => {
        res.json({ error: `There was an error: ${error}`});
      });
    })
    app.get('/start', (req, res) => {
      const newItem = new Item();
      newItem.name = "Resilient Coders";
      newItem.imgURL = "/img/image.png"
      newItem.basePrice = 200;
      newItem.highestBid = null;
      newItem.highestBidder = null;
      newItem.bids = [];
      newItem.save().then(item => {
        res.redirect('/');
      });
    })
    app.get('/users', (req, res) => {
      User.find().then(users => {
        res.json({users: users})
      })
    })
    // app.post('/bid', (req, res) => {
    //   const userName = req.body.name;
    //   const bid = req.body.bid;
    //   User.findOneAndUpdate(
    //     {name: userName},
    //     {
    //       $set: {
    //         name: userName
    //       }
    //     },
    //     { upsert: true, new: true }
    //   ).then(user => {
    //     Item.findOneAndUpdate(
    //       {},
    //       {
    //         $set: {
    //           highestBid: bid,
    //           highestBidder: user,
    //         },
    //         $push: {
    //           bids: { $each: [{user, bid}], $position: 0}
    //         }
    //       }
    //     ).then(item => {
    //       res.json({item});
    //     })
    //   })
    // })
  })
  .catch(err => {
    console.log(err);
  })


// app.listen(PORT, () => console.log(`The magic has begun at ${PORT} ... `));


io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('bid', (data) => {
    const userName = data.name;
    const bid = data.bid;
    const premium = data.premium;
    const _id = data.itemID;
    User.findOneAndUpdate(
      {name: userName},
      {
        $set: {
          name: userName
        }
      },
      { upsert: true, new: true }
    ).then(user => {
      Item.findByIdAndUpdate(
        _id,
        {
          $set: {
            highestBid: bid,
            highestBidder: user,
          },
          $push: {
            bids: { $each: [{user, bid, premium}], $position: 0}
          }
        },
        { new: true}
      ).then(item => {
        io.emit('bid', item)
      })
    });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
