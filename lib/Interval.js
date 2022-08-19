
export class Interval {
    constructor(interval) {
        this._timeStamp = interval.timeStamp
        this._cost = interval.cost
        //First XML test was in Wh so i divided by 1000 confirm with more testing
        this._valueKWH = interval.valueKWH
    }
    get timeStamp() {
        // let tStamp = new Date(this._timeStamp)
        // return tStamp
        return this._timeStamp
    }
    get cost() {
        return this._cost
    }
    get valueKWH() {
        return this._valueKWH
    }
}


