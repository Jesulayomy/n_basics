// console.log(a); // ReferenceError
let a;
console.log(a);
a = 10;

console.log(b);

// let a = 100; // SyntaxError
var b = 100;
console.log(b);
var b = 20;
console.log(b);

// const c; // SyntaxError - missing init
const c = 100;
// c = 200; // TypeError - assignment to constant variable
