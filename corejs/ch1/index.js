function Person(age) {
  this.age = age;
  this.growOld = () => {
    this.age++;
  }
}

const person = new Person(1);
const person2 = new Person(4);
setTimeout(person.growOld, 1000); // .bind(person)

// setTimeout(function () {console.log(person.age)}, 2000);

setTimeout(person.growOld.bind(person2), 3000); // An arrow function will ignore .bind, and increase person

setTimeout(function () {console.log(person.age)}, 4000);
// setTimeout(function () {console.log(person2.age)}, 4000);
