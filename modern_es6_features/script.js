'use strict'

const restaurant = {
    name: "Chai Point",
    location: "Bharat",
    categories: ["Veg", "Non-Veg", "Vegan"],
    appetizers: ["salad", "spring rolls", "sandwich"],
    menu: ["paneer", "dal", "pizza", "dosa"],
    openingHrs: {
        sat: 7,
        sun : 9,
        mon: 5
    },
    orderNo: 0,
    orderFood(...items) {
        // rest pattern
        console.log("Order :", ++this.orderNo)
        for(let i=0; i< items.length; i++) console.log(items[i])
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




// spread operator (...) - on RHS of '='
// used for decomposing an array into individual elements
const arr = [10, 20, 30]
const newArr = [1, 2, 0, ...arr]
console.log(newArr)

// iterables: arrays, strings, sets, maps... but not objects
// make a copy of arrays, objects, etc.
const restCopy = { ...restaurant }
restCopy.name = "Copy"
console.log(restCopy)





// rest pattern (opposite of spread, used on LHS of '=')
// rest element must be the last element
const [g, h, ...others] = [1, 2, 3, 4, 5, 6]
console.log(g, h, others) // others = [3, 4, 5, 6]

// rest pattern in object destructuring
const { sat: ohSat, ...ohOthers } = restaurant.openingHrs
console.log(ohOthers)

const add = (...arr) => arr.reduce((acc, curr) => acc + curr, 0); // rest
console.log(add(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) // spread





// logic operators properties: can use any data type, can return any data type, short-circuiting
// short-circuiting: if first value is truthy, it will be returned else the second
// can be used to set default values
console.log(3 || 'Jonas')
console.log('' || 100)
console.log(true || 0)
console.log(undefined || null)
let val = null
val ||= 'Empty Value'
console.log('local || short circuiting', val)


// AND short-circuiting
// returns first falsy value or the last
// can be used to avoid if statements to check if a values exists or not 
console.log(0 && 'Jonas') // 0
console.log(7 && 'Jonas') // 'Jonas' 
val = 100
val &&= 'Jonas'
console.log('local && short circuiting', val)

if(restaurant.menu) {
    restaurant.orderFood(2, 3)
}

restaurant.menu && restaurant.orderFood(1, 1)





// nullish caoalescing operator
// if first value is null/ undefined then only second value gets printed
console.log(null ?? 10)
console.log(0 ?? 10)
val = 100
val ??= 10
console.log('local ?? assignment', val)




// coding challenge 1
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
    printGoals(...arr) {
        for(let i=0; i< arr.length; i++) console.log(arr[i])
    }
};

const players1 = game.players[0]
const players2 = game.players[1]

const [gk1, ...fieldPlayers1] = players1
const [gk2, ...fieldPlayers2] = players2

console.log(gk1, fieldPlayers1, gk2, fieldPlayers2)

const allPlayers = ['Thiago', 'Perisic', ...players1, ...players2]
console.log(allPlayers)

const { team1, x: draw, team2 } = game.odds
console.log(team1, draw, team2)

game.printGoals('Davies', 'Miller', 'Kimmich');

(team1 > team2) && console.log("Team 1 is more likely to win!");
(team1 < team2) && console.log("Team 2 is more likely to win!");