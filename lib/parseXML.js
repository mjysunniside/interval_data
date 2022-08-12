import { Interval } from "./Interval.js"

export function parseXML(xmlContent) {
    return new Promise((resolve, reject) => {
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xmlContent, 'application/xml')
        resolve(xmlDoc)
    })
}

export function createStructureXML(xmlDoc) {
    const address = xmlDoc.getElementsByTagName('entry')[0].getElementsByTagName('title')[0].textContent;
    const intervalTotal = xmlDoc.getElementsByTagName('interval')[0]
    const intervalReadings = xmlDoc.getElementsByTagName('IntervalReading')
    const iterableReadings = [...intervalReadings]
    const intervalDurationInMin = (intervalReadings[0].getElementsByTagName('duration')[0].textContent)/60

    //here I should make sure at least 1 year, maybe other checks if needed

    //now create structure
    //I should look for missing data at this point, need to figure out what missing data looks like first
    let intervalsParsed = iterableReadings.map(intervalReading => {
        return new Interval(intervalReading)
    })

    return intervalsParsed
}