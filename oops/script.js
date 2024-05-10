'use strict'

const Person = function(fName, yob) {
    // instance properties
    this.fName = fName
    this.yob = yob
}

// function must be defined on the prototype object
Person.prototype.calcAge = function() {
    console.log("age = ", 2037 - this.yob)
}

// constructor function with new keyword
const me = new Person("sakiv", 1999)
console.log(me, ", me is Person? ->", me instanceof Person)

// "me" object doesn't contain the calcAge() function,
// but still it has access due to prototypal inheritance
me.calcAge()

console.log(me.__proto__)
console.log("me.__proto__ === Person.prototype? ->", me.__proto__ === Person.prototype)

// Person.prototype is the prototype of me
// but Person.prototype is not the prototype of Person
console.log(Person.prototype.isPrototypeOf(me))
console.log(Person.prototype.isPrototypeOf(Person))

// static property; common for all instances of Person
Person.prototype.species = "Homo Sapiens"
console.log(me.species)
console.log(me.hasOwnProperty('fName'), me.hasOwnProperty('species'))