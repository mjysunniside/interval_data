
// const date = new Date(1627196400*1000)

// const dString = date.toLocaleString()

// console.log(dString);

// let month = date.getMonth()
// let year = date.getFullYear()

// //console.log(typeof year)

// let endDate = new Date(year, 1 +1, 0).getDate()

// console.log(endDate)

class Tester {
    constructor() {
        this._increment = 0
    }
    get increment() {
        return this._increment
    }
    set increment(value) {
        this._increment += value
    }
}

let tester = new Tester()
tester.increment = 2
tester.increment = 2
console.log(tester.increment)
