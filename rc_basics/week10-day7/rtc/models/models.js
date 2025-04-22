const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  name: String,
});

const itemSchema = new Schema({
  name: String,
  imgURL: String,
  basePrice: Number,
  highestBid: Number,
  highestBidder: userSchema,
  bids: [{user: userSchema, bid: Number, premium: Boolean}]
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Item: mongoose.model('Item', itemSchema),
};