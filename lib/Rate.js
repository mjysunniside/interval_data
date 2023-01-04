
let rates = [{
    rateName: 'E-TOU-C',
    startPeak: 16,
    endPeak: 21,
    weekend: false
},

{
    rateName: 'E-TOU-D',
    startPeak: 17,
    endPeak: 20,
    weekend: true
},
{
    rateName: 'EV2',
    peak: [[16, 21]]
}]


export class Rate {
    constructor(rateString) {
        let rate = this.selectRate(rateString)
        this._name = rate.rateName
        this._startPeak = rate.startPeak
        this._endPeak = rate.endPeak
        this._startSummer = 5
        this._endSummer = 9
        console.log(rateString)
        console.log(rate)
    }
    get rate() {
        return this._name
    }
    get startPeak() {
        return this._startPeak
    }
    get endPeak() {
        return this._endPeak
    }
    get startSummer() {
        return this._startSummer
    }
    get endSummer() {
        return this._endSummer
    }
    selectRate(rateString) {
        for(let rate of rates) {
            if(rate.rateName === rateString) {
                return rate
            }
        }
        return rates[0]
    }
    isOnPeak(interval) {
        let intervalHour = interval.timeStamp.getHours()
        let rateName = this.rate
        if(rateName === 'E-TOU-C') {
            if(intervalHour>=this.startPeak && intervalHour<this.endPeak) {
                return true
            } else {
                return false
            }
        } else if(rateName === 'E-TOU-D') {
            let intervalDay = interval.timeStamp.getDay()
            let intervalDate = interval.timeStamp.getDate()
            let intervalMonth = interval.timeStamp.getMonth()
            let isWeekend = this.isWeekend(intervalDay)
            let isHoliday = this.isHolidayDate(intervalMonth, intervalDate)
            if(isWeekend || isHoliday) {
                return false
            } else {
                if(intervalHour>=this.startPeak && intervalHour<this.endPeak) {
                    return true
                } else {
                    return false
                }
            }
        } else if(rateName === 'EV2') {
            return false
        } else {
            return false
        }
    }
    isHolidayDate(month, date) {
        if((month===0 && date===1) || (month===1 && date===20) || (month===4 && date===29) || (month===6 && date===4) || (month===8 && date===4) || (month===10 && date===11) || (month===10 && date===24) || (month===11 && date===25)) {
            return true
        } else {
            return false
        }
    }
    isWeekend(day) {
        if(day===0 || day===6) {
            return true
        } else {
            return false
        }
    }
}