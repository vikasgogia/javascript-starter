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




// me -> Person.prototype -> Object.prototype -> null
console.log(me.__proto__.__proto__.__proto__)

// points back to Person
console.dir(Person.prototype.constructor)

// all the array methods like map(), indexOf()... lie in the Array.prototype
// when we use [] for initializing an array, it's same as doing new Array()
const arr = [1, 2, 3, 1]
console.log(arr.__proto__)

// a new array functionality can be added to Array.prototype
Array.prototype.uniqueNums = function() {
    return [...new Set(this)]
}

console.log(arr.uniqueNums())




// coding challenge
const Car = function(speed, make) {
    this.speed = speed
    this.make  = make
}

Car.prototype.accelerate = function() {
    this.speed += 10
    console.log("Accelerated: ", this.speed, " kms/hr")
}

Car.prototype.brake = function() {
    this.speed -= 5
    console.log("Applied brakes: ", this.speed, " kms/hr")
}

const bmw = new Car(120, 'bmw')
const mer = new Car(95, 'mercedes')

bmw.accelerate()
bmw.brake()
bmw.brake()
bmw.accelerate()

mer.accelerate()
mer.brake()
mer.brake()
mer.accelerate()