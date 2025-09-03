function x() {
  var a = 7;
  return function () {
    console.log(a);
  }
}
var z = x();
console.log(z);
z();

// Corner cases
var f = 80;
function t() {
  var d = 900;
  function u() {
    var e = 20;
    function v() {
      console.log(e, d);
    }
    d = 90;
    e = 100;
    f = 110;
    v();
  }
  u();
}
t();
