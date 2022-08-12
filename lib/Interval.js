
export class Interval {
    constructor(interval) {
        this._timeStamp = new Date((interval.getElementsByTagName('start')[0].textContent)*1000)
        this._cost = Number(interval.getElementsByTagName('cost')[0].textContent)/1000
        //First XML test was in Wh so i divided by 1000 confirm with more testing
        this._valueKWH = Number(interval.getElementsByTagName('value')[0].textContent)/1000
    }
    get timeStamp() {
        let tStamp = new Date(this._timeStamp)
        return tStamp
    }
    get cost() {
        return this._cost
    }
    get valueKWH() {
        return this._valueKWH
    }
}


