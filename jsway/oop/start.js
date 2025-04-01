class Dog {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }

    bark() {
        console.log('Woof!');
    }
}


let dog1 = new Dog("Bernie", 4);

dog1.color = 'brown';

let dog3 = {
    name: 'Wof',
    age: 12
}

// let dog2 = Object.create(dog3)

console.log(dog1);
// console.log(dog2); // {} but dog2.name will print wof
console.log(dog3);
