import { Monthly } from "./Monthly.js"

export class Structure {
    constructor(rate) {
        this._rate = rate
        let monthlies = []
        for(let i=0 ; i<=11 ; i++) {
            monthlies.push(new Monthly(i))
        } 
        this._monthlies = monthlies
    }
    get intervals() {
        return this._intervals
    }
    get monthlies() {
        return this._monthlies
    }
    get rate() {
        return this._rate
    }
    getAMonthly(monthIndex) {
        for(let monthly of this.monthlies) {
            if(monthly.month === monthIndex) {
                return monthly
            } 
        }
    }
    addMonth(monthIntervalArray) {
        let monthlyObject = this.getAMonthly(monthIntervalArray[0].timeStamp.getMonth())
        for(let interval of monthIntervalArray) {
            let intervalUsage = interval.valueKWH
            let intervalHour = interval.timeStamp.getHours()
            //could add cost but who knows what else would need to be added or accuracy of cost
            monthlyObject.totalKWH = intervalUsage
            if(this.isOnPeak(intervalHour)) {
                monthlyObject.onPeak = intervalUsage
            } else {
                monthlyObject.offPeak = intervalUsage
            }
        }
    }
    isOnPeak(hour) {
        if(hour>=this.rate.startPeak && hour<this.rate.endPeak) {
            return true
        } else {
            return false
        }
    }
    getMonthTotal(monthIndex) {
        let monthly = this.getAMonthly(monthIndex)
        return monthly.totalKWH
    }
    getMonthlyPeak(monthIndex) {
        let monthly = this.getAMonthly(monthIndex)
        return monthly.onPeak
    }
    getMonthlyOffPeak(monthIndex) {
        let monthly = this.getAMonthly(monthIndex)
        return monthly.offPeak
    }

}