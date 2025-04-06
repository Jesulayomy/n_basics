const EventEmitter = require('events');
const uuid = require('uuid');


class Logger extends EventEmitter {
  log(msg) {
    this.emit('message', {id: uuid.v4(), msg});
  }
}


class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('event', () => console.log('Event fired!'));

myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');


module.exports = Logger;