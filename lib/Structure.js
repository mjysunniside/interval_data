import { Monthly } from "./Monthly.js"

export class Structure {
    constructor(intervalArray) {
        this._intervals = intervalArray
        let monthlies = []
        this.monthObjectMaker(monthlies, intervalArray)
        this._monthlies = this.monthObjectMaker(this._intervals)
    }
    get intervals() {
        return this._intervals
    }
    monthObjectMaker(monthlies, intervalArray) {
        let methodMonthlies = []
        //filter the massive array of intervals by month, push an array filtered by month to monthly object and do all specific month logic in there
        for(i=0 ; i<=11 ; i++) {
            let monthlyPush = new Monthly( i, 
                intervalArray.filter(interval => {
                interval.getMonth() === i
            })
            )
        }
    }

}