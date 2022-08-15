

export class Monthly {
    constructor(month) {
        this._month = month
        this._year = -1
        // this._rate = rate
        this._totalKWH = 0
        this._onPeak = 0
        this._offPeak = 0
        this._missing = []

    }
    get month() {
        return this._month
    }
    get year() {
        return this._year
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
    set totalKWH(value) {
        this._totalKWH += value
    }
    get onPeak() {
        return this._onPeak
    }
    set onPeak(value) {
        this._onPeak += value
    }
    get offPeak() {
        return this._offPeak
    }
    set offPeak(value) {
        this._offPeak += value
    }
    
}