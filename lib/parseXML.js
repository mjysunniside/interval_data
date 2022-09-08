import { Interval } from "./Interval.js"

export function parseXML(xmlContent) {
    return new Promise((resolve, reject) => {
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xmlContent, 'application/xml')
        resolve(xmlDoc)
    })
}

export function createIntervalsXML(xmlDoc) {
    const address = xmlDoc.getElementsByTagName('entry')[0].getElementsByTagName('title')[0].textContent;
    //some checks for year here
    const intervalTotalDuration = xmlDoc.getElementsByTagName('interval')[0]

    const intervalReadings = xmlDoc.getElementsByTagName('IntervalReading')
    const iterableReadings = [...intervalReadings]
    const intervalDurationInMin = (intervalReadings[0].getElementsByTagName('duration')[0].textContent)/60

    

    //now create structure
    //I should look for missing data at this point, need to figure out what missing data looks like first
    let intervalsParsed = iterableReadings.map(intervalReading => {
        let timeStamp = new Date((intervalReading.getElementsByTagName('start')[0].textContent)*1000)
        let cost;
        if(intervalReading.getElementsByTagName('cost')[0]){
            cost = Number(intervalReading.getElementsByTagName('cost')[0].textContent)/1000
        } else {
            cost = 0
        }
        let valueKWH = Number(intervalReading.getElementsByTagName('value')[0].textContent)/1000
        return new Interval({
            timeStamp,
            valueKWH,
            cost
        })
    })

    return intervalsParsed
}