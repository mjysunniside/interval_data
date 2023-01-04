import { Monthly } from "./Monthly.js"

export class Structure {
    constructor(rate) {
        this._rate = rate
        console.log("structure" + rate + " " + this.rate.startPeak)
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
    //should take 'S' or 'W'
    getPercentages(season) {
        let allSeasonMonthlies = this.monthlies.filter(monthly => monthly.season === season)
        let total = allSeasonMonthlies.reduce((total, monthly) => {
            return total + monthly.totalKWH
        }, 0)
        let onPeak = allSeasonMonthlies.reduce((total, monthly) => {
            return total + monthly.onPeak
        }, 0)
        let offPeak = allSeasonMonthlies.reduce((total, monthly) => {
            return total + monthly.offPeak
        }, 0)
        let onPeakPercentage = Math.round((onPeak / total)*100)
        let offPeakPercentage = Math.round((offPeak / total)*100)
        return {onPeak: onPeakPercentage, offPeak: offPeakPercentage}
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
        //setting monthly object year
        this.setYear(monthIntervalArray, monthlyObject)
        //setting season
        this.setSeason(monthIntervalArray, monthlyObject, this.rate)
        //set end dates
        this.setMonthEndDate(monthIntervalArray, monthlyObject)

        for(let interval of monthIntervalArray) {
            let intervalUsage = interval.valueKWH
            let intervalHour = interval.timeStamp.getHours()
            //could add cost but who knows what else would need to be added or accuracy of cost
            monthlyObject.totalKWH = intervalUsage
            //old way
            // if(this.isOnPeak(intervalHour)) {
            //     monthlyObject.onPeak = intervalUsage
            // } else {
            //     monthlyObject.offPeak = intervalUsage
            // }
            if(this.rate.isOnPeak(interval)) {
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
    setSeason(monthIntervalArray, monthlyObject, rate) {
        let month = monthIntervalArray[0].timeStamp.getMonth()
        if(month>=rate.startSummer && month<rate.endSummer) {
            monthlyObject.season = 'S'
        }
    }
    setYear(monthIntervalArray, monthlyObject) {
        let startYear = monthIntervalArray[0].timeStamp.getFullYear()
        let startYearDate = monthIntervalArray[0].timeStamp.getDate()
        let endYear = monthIntervalArray[monthIntervalArray.length-1].timeStamp.getFullYear()
        let endYearDate = monthIntervalArray[monthIntervalArray.length-1].timeStamp.getMonth()

        if(monthlyObject.year === -1) {
            if(startYear === endYear) {
                monthlyObject.year = startYear
            } else {
                if(startYearDate>15) {
                    monthlyObject.year = endYear
                } else {
                    monthlyObject.year = startYear
                }
            }
        } 
    }
    setMonthEndDate(monthIntervalArray, monthlyObject) {
        let year = monthlyObject.year
        let month = monthIntervalArray[0].timeStamp.getMonth()
        let setEndDate = new Date(year, month +1, 0).getDate()
        monthlyObject.endDate = setEndDate
    }

}