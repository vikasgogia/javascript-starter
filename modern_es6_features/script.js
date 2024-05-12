'use strict'

const restaurant = {
    name: "Chai Point",
    location: "Bharat",
    categories: ["Veg", "Non-Veg", "Vegan"],
    appetizers: ["salad", "spring rolls", "sandwich"],
    menu: ["paneer", "dal", "pizza", "dosa"],
    openingHrs: {
        sat: 7,
        sun : 9
    }
}

// array destructuring
const [a, b, c] = [1, 2, 3]
console.log(a, b, c)

const [first, , third] = restaurant.categories
console.log(first, third)

// nested destructuring
const [f, , [t1, t2]] = [1, 2, [3, 4]]
console.log(f, t1, t2)

// default values in destructuring
const [p=1, q=1, r=1] = [8, 9]
console.log(p, q, r)




// object destructuring (names should match with object keys or custom names should be provided as values)
const {name: id = "", menu = []} = restaurant
console.log(id, menu)

// nested object destructuring 
// { nested_object : {key1, key2, ...} }
const {openingHrs: {sat, sun}} = restaurant
console.log(sat, sun)




// spread operator (...)
// used for decomposing an array into individual elements
const arr = [10, 20, 30]
const newArr = [1, 2, 0, ...arr]
console.log(newArr)

// iterables: arrays, strings, sets, maps... but not objects
// make a copy of arrays, objects, etc.
const restCopy = { ...restaurant }
restCopy.name = "Copy"
console.log(restCopy)
