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
    const res = await fetch('https://schub-api.jesulayomi.tech/api/stats');
    const data = await res.json();
    return data;
}

const DATA = await getDoggo();
console.log(DATA);