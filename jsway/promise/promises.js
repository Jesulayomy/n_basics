// const newCar = new Promise((done, fail) => {
//     const error = !false;
//     if (!error) {
//         done('Car is here!');
//     } else {
//         fail('Sorry no money.');
//     }
// })

// console.log(newCar);

// newCar
//     .then(data => console.log(data))
//     .catch(err => console.error(err));

async function getDoggo() {
    const res = await fetch('https://schub-api.jesulayomi.tech/api/students');
    const data = await res.json();
    console.log(data);
}

getDoggo();