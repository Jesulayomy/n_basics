var a = 0;
let b = 0;
{
  var a;
  console.log(a);
  a = 10;
  let b;
  console.log(b);
  b = 20;
  const c = 30;
  console.log(a);
  console.log(b);
  console.log(c);
}
var d = 40;
let e = 50;
const f = 60;
console.log(a);
console.log(b);
// console.log(c);