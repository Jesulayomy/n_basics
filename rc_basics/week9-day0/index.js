const Logger = require('./events.js');


const logger = new Logger();

logger.on('message', data => console.log(`Called Listener:`, data));

logger.log('Heyyy oh');
logger.log('Hi');