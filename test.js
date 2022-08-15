
const date = new Date(1627196400*1000)

//const dString = date.toLocaleString()

console.log(date);

let month = date.getMonth()
let year = date.getFullYear()

//console.log(typeof year)

let endDate = new Date(year, month +1, 0).getDate()

console.log(endDate)

