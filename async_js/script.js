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




// /**
//  * Async/ Await
//  */

// // await blocks the execution, but doesn't interrupt main thread
// // as the function is marketd as async.
// const whereAmI = async function(country) {
//     try {
//         const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
//         if(res.status != 200) 
//             throw new Error("unable to get country")
//         const json = await res.json()
//         console.log('asynchronous operation done!')
//         return json
//     } 
//     catch(err) {
//         console.log(`My error handling: ${err}`)
//         throw err
//     }
// };

// // whereAmI('india')
// // console.log('synchronous code runs first')

// // now let's say that whereAmI() function returns some Promise<> and we want to perform
// // some work post this whereAmI() function

// // We can use an IIFE (Immediately Invoked Function Expressions) - no function name
// (async function() {
//     try{
//         const res = await whereAmI('india')
//         console.log(res)
//     } catch(err) {
//         console.log(err)
//     }
// })();

// console.log('synchronous code runs first')

// // parallel Promises
// const getThreeCountries = async function(c1, c2, c3) {
//     try {
//         const res = await Promise.all([
//             fetch(`https://restcountries.com/v3.1/name/${c1}`),
//             fetch(`https://restcountries.com/v3.1/name/${c2}`),
//             fetch(`https://restcountries.com/v3.1/name/${c3}`)
//         ])
//         console.log(res[2].status)
//     }
//     catch(err) {
//         console.log(err)
//     }
// }

// getThreeCountries('india', 'canada', 'uk')

// // Promise.race([api1, api2, api3, ...]) - faster
// // Promise.allSettled([api1, api2, api3]) - never short ciruits even if an error occurs
// // Promise.any([api1, api2, api3]) - similar to race, but returns fulfilled promise (no reject())

// const timeout = function(seconds) {
//     return new Promise((_, reject) => {
//         setTimeout(() => reject(new Error("Request took too long!")), seconds * 1000)
//     })
// };

// (async function() {
//     try {
//         const res = await Promise.race([
//             fetch(`https://restcountries.com/v3.1/name/india`),
//             timeout(5)
//         ])
//         console.log(res)
//     }
//     catch(err) {
//         console.log(`My error: ${err}`)
//     }
// })()




/**
 * Coding Challenge 3
 */
