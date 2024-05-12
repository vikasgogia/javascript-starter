'use strict'

const Person = function(fName, yob) {
    // instance properties
    this.fName = fName
    this.yob = yob
}

// static method
Person.hey = function() {
    console.log("this is a static method on Person constructor function")
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




// coding challenge 1
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




class PersonCl {
    constructor(name, yob) {
        this.name = name
        this.yob = yob
    }

    // declared on the PersonCl.prototype
    calcAge() {
        console.log("age =", 2037 - this.yob)
    }

    // getter (accessed like a property)
    get age() {
        return 2037 - this.yob
    }

    // setter of a predefined property 'name'
    set name(n) {
        // here this will lead into a stack size exceeded error due to recursion
        // so we define a new variable for this: _name & define a custom getter as well
        if(n.includes(' ')) this._name = n
        else console.log("name's not a full name")
    }

    get name() {
        return this._name
    }

    static hey() {
        console.log("This is available on class, not on the object that's created through it")
    }
}

const him = new PersonCl('him g', 1991)
console.log(him)
him.calcAge()
console.log(him.name)

// not possible as hey() is a static function
// him.hey()

PersonCl.hey()
Person.hey()




// creating a prototype manually (nothing more than an object)
const PersonPrototype = {

    // a custom function to replicate constructor
    init(fName, yob) {
        this.fName = fName
        this.yob = yob
    },

    calcAge() {
        console.log("age =", 2037 - this.yob)
    }
}

const papa = Object.create(PersonPrototype)
papa.init('Viju', 1901)
papa.calcAge()
console.log("papa.__proto__ === PersonPrototype? ", papa.__proto__ === PersonPrototype)




// coding challenge 2
class CarCl {
    constructor(speed, make) {
        this.speed = speed
        this.make  = make
    }

    get speedUS() {
        return this.speed/ 1.6
    }

    set speedUS(speed) {
        this.speed = 1.6 * speed
    }

    accelerate() {
        this.speed += 10
        console.log("Accelerated:", this.speed, "kms/hr")
    }

    brake() {
        this.speed -= 5
        console.log("Applied brakes:", this.speed, "kms/hr")
    }
}

const ford = new CarCl(120, 'Ford')
ford.accelerate()
ford.brake()
ford.brake()
ford.accelerate()
ford.speedUS = 120
console.log(ford.speedUS, "miles/hr", ",", ford.speed, "km/hr")




// inheritance
const Student = function(fName, yob, course) {
    // NP to simply call Person() function, as "this" will be "undefined"
    Person.call(this, fName, yob)
    this.course = course
}

Student.prototype = Object.create(Person.prototype)

Student.prototype.introduce = function() {
    console.log(`Hi, my name's ${this.fName} and I am enrolled in ${this.course}.`)
}

const s1 = new Student("Vikas", 1999, "MCS")
s1.introduce()
s1.calcAge()

Student.prototype.constructor = Student

// Ideally this should point to Student, but here it's pointing to Person
// to fix this, assign Student to Student.prototype.constructor
console.log(Student.prototype.constructor)





// coding challenge 3
const EV = function(speed, make, charge) {
    Car.call(this, speed, make)
    this.charge = charge
}

EV.prototype = Object.create(Car.prototype)
EV.prototype.constructor = EV

EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo
}

// polymorphism
EV.prototype.accelerate = function() {
    this.speed += 20
    this.charge -= 1
    console.log(`${this.make} going at ${this.speed} km/hr, with a charge of ${this.charge} %`)
}

const tesla = new EV(120, 'Tesla', 23)
tesla.accelerate()
tesla.brake()
tesla.chargeBattery(90)
tesla.accelerate()




class StudentCl extends PersonCl {
    constructor(name, yob, course) {
        super(name, yob)
        this.course = course
    }

    introduce() {
        console.log(`Hi, my name's ${this.name} and I am enrolled in ${this.course}.`)
    }
}

const s2 = new StudentCl('Him G', 1991, 'B.Com')
s2.calcAge()
s2.introduce()




// inheritance using Object.create() 
const StudentPrototype = Object.create(PersonPrototype)
StudentPrototype.init = function(fName, yob, course) {
    PersonPrototype.init.call(this, fName, yob)
    this.course = course
}

StudentPrototype.introduce = function() {
    console.log(`Hi, my name's ${this.fName} and I am enrolled in ${this.course}.`)
}

const mumma = Object.create(StudentPrototype)
mumma.init("Sum", 1947, "B.A")
mumma.calcAge()
mumma.introduce()




// data encapsulation and privacy
// all the fields with an underscore marks that they are protected
class Account {
    // public fields (would be present on intances rather than the prototype)
    language = 'English'

    // private fields (#)
    #movements = []
    #balance = 0
    #pin

    constructor(owner, currency, pin) {
        this.owner = owner
        this.currency = currency
        this.#pin = pin
        
        console.log(`Thanks for opening an account, ${this.owner}!`)
    }

    showBalance() {
        console.log(`Your balance is: ${this.#balance}`)
    }

    showTransactions() {
        console.log(this.#movements)
    }

    deposit(val) {
        this.#movements.push(val)
        this.#balance += val
    }

    withdraw(val) {
        if(val <= this.#balance) {
            this.deposit(-val)
        }
    }

    // protected method _ (just a convention, not really protected)
    // convert to private using #
    #approveLoan(val) {
        return this.#balance >= 0.3 * val
    }

    requestLoan(val) {
        if(this.#approveLoan(val)) {
            this.deposit(val)
        }
    }
}

const acc1 = new Account("Vikas", "cad", 1031)
acc1.deposit(1000)
acc1.withdraw(500)
acc1.requestLoan(600)
acc1.showBalance()
acc1.showTransactions()