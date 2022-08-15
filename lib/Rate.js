
// let rates = [{
//     string = 'E-TOU-C'
//     startPeak: 3,
//     endPeak: 8
// },

// {
//     string = 'E-TOU-D'
//     startPeak: 4,
//     endPeak: 7
// }]

let rates = {
    
}


export class Rate {
    constructor(rateString) {
        this._startPeak = 3
        this._endPeak = 8
        this._startSummer = 5
        this._endSummer = 8
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
}