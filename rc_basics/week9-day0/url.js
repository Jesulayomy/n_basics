const url = require('url');

const myUrl = new URL('https://schub-api.jesulayomi.tech/departments?id=100&status=active');

console.log(myUrl.href);
// console.log(myUrl.toString());

console.log(myUrl.host);
// console.log(myUrl.hostname);
console.log(myUrl.origin);

console.log(myUrl.search);
console.log(myUrl.searchParams);

myUrl.searchParams.append('abc', 123);
console.log(myUrl.searchParams);