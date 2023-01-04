
let rates = [{
    rateName: 'E-TOU-C',
    startPeak: 16,
    endPeak: 21
},

{
    rateName: 'E-TOU-D',
    startPeak: 17,
    endPeak: 20
},
{
    rateName: 'EV2',
    peak: [[16, 21]]
}]


export class Rate {
    constructor(rateString) {
        let rate = this.selectRate(rateString)
        this._startPeak = rate.startPeak
        this._endPeak = rate.endPeak
        this._startSummer = 5
        this._endSummer = 9
        console.log(rateString)
        console.log(rate)
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
}