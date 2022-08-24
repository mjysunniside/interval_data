import { Interval } from "./Interval.js"

export function findHeaders(csvText) {
    
    let firstSplit = csvText.split(/(\r?\n){2}/)
    let top = firstSplit[0]
    let data = firstSplit[2].split(/\r?\n/)
    let headers = data[0]
    let returnData = data.shift()
    // At this point i can do some verification, check that the data is full year, make sure we have kwh

    return {
        top,
        headers,
        data
    }
}

export function createIntervalsCSV(data) {
    let intervalsParsed = data.map(interval => {
        if(interval === '') {
            return
        }
        let lineSplit = interval.split(',')
        let dateStringArray = lineSplit[1].split('-')
        let date = new Date()
        date.setFullYear(dateStringArray[0])
        date.setMonth(Number(dateStringArray[1])-1)
        date.setDate(dateStringArray[2])
        date.setHours(lineSplit[2].substring(0, 2))
        let timeStamp = date
        let valueKWH = Number(lineSplit[4])
        let cost = Number(lineSplit[6].substring(1))
        return new Interval({
            timeStamp,
            valueKWH,
            cost
        })
    })
    return intervalsParsed
}