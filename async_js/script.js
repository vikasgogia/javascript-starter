// 'use strict';

// /**
//  * AJAX call (only works in browser, not in Node)
//  */

// const req1 = new XMLHttpRequest();
// req1.open('GET', 'https://restcountries.com/v3.1/name/india');
// req1.send(); // asynchronous

// req1.addEventListener('load', function() {
//     console.log(JSON.parse(this.responseText));
// });




// /**
//  * Callback Hell (bad code)
//  */
// setTimeout(() => {
//     setTimeout(() => {
//         setTimeout(() => {
//             setTimeout(() => {
//                 setTimeout(() => {
//                     console.log("callback hell");
//                 }, 1000);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);




// /**
//  * Promises & Fetch API
//  */

// // "pending" --> "settled" (finished async task) --> "fulfilled" (success) or "rejected" (failure)
// const req2 = fetch('https://restcountries.com/v3.1/name/india');
// console.log(req2); // fetch api returns a Promise object in "pending" state


// // the second .then() only executes when first is done
// // finally() is used to e.g. hide loading spinners either promise is fulfilled or rejected
// // catch() and then() both must return a promise for finally() to be executed

//  // res.json() also returns a Promise
// req2.then(res => {
//     if(!res.ok) throw new Error("No country found!")
//     return res.json()
// })
// .then(res => console.log(res))
// .catch(err => console.error(`error: ${err}`))
// .finally(() => console.log('runs every time'));




// /**
//  * Coding challenge 1
//  */
// function reverseGeocoding(lat, log) {
//     fetch(`https://geocode.xyz/${lat},${log}?geoit=json`)
//     .then((res) => {
//         if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//         return res.json()
//     })
//     .then((data) => fetch(`https://restcountries.com/v3.1/name/${data.country}`))
//     .then((res) => {
//         if(!res.ok) throw new Error("No country found!")
//         return res.json()
//     })
//     .then(data => console.log(data[0]))
//     .catch(err => console.error(`error: ${err}`))
// }

// reverseGeocoding(52.508, 13.381)




// /**
//  * Promise
//  */
// const prom1 = new Promise((resolve, reject) => {
//     if(Math.random() >= 0.5) resolve('You win!')
//     else reject(new Error('You lose!'))
// })

// // in .then() we implement resolve(), and in .catch() we implement reject()
// prom1.then(res => console.log(res)).catch(err => console.log(err))

// // static method
// Promise.resolve('Success!').then(x => console.log(x))
// Promise.reject('Failed').catch(x => console.log(x))

// // let's promisify this (will only work in browser)
// navigator.geolocation.getCurrentPosition(
//     position => console.log(position), 
//     err => console.log(err)
// )

// const locProm = new Promise(
//     (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
// )
// locProm.then(res => console.log(res)).catch(err => console.log(err))