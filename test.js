
const date = new Date(1627196400*1000)

const dString = date.toLocaleString()

console.log(dString);

let month = date.getMonth()
let year = date.getFullYear()

//console.log(typeof year)

let endDate = new Date(year, 1 +1, 0).getDate()

console.log(endDate)