const process = require('process');
require('dotenv').config();

function displayDetails (name, age) {
  console.log(`Hello ${name}, You are ${age} years old.`);
}

const args = process.argv;

displayDetails(args[2], args[3]);

// Process does not read .env, use dotenv module instead
const env = process.env;
console.log(env);
