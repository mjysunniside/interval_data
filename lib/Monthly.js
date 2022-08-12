

export class Monthly {
    constructor(month, monthArray) {
        this._month = month
        this._year = decideYear(monthArray)
        this._rate = rate
        this._totalKWH = 0
        this._onPeak = 0
        this._offPeak = 0

    }
    decideYear(monthArray) {
        let monthArrayFirstYear = monthArray[0].getFullYear()
        let monthArrayLastYear = monthArray[monthArray.length - 1].getFullYear()
        if(monthArrayFirstYear === monthArrayLastYear) {
            return monthArrayFirstYear
        } else {
            monthArray.filter(interval => {
                interval.timeStamp
            })
        }
    }
    get month() {
        return this._month
    }
    get rate() {
        return this._rate
    }
    get season() {
        return this._season
    }
    get totalKWH() {
        return this._totalKWH
    }
    
}