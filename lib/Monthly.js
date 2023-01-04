

export class Monthly {
    constructor(month) {
        this._month = month
        this._year = -1
        // this._rate = rate
        this._totalKWH = 0
        this._onPeak = 0
        this._partPeak = 0
        this._offPeak = 0
        this._missing = []
        this._season = 'W'
        this._startDate = 1
        this._endDate = 31
    }
    get month() {
        return this._month
    }
    get year() {
        return this._year
    }
    set year(value) {
        this._year = value 
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
    get partPeak() {
        return this._partPeak
    }
    set partPeak(value) {
        this._partPeak += value
    }
    get offPeak() {
        return this._offPeak
    }
    set offPeak(value) {
        this._offPeak += value
    }
    get season() {
        return this._season
    }
    set season(value) {
        this._season = value
    }
    get startDate() {
        return this._startDate
    }
    get endDate() {
        return this._endDate
    }
    set endDate(value) {
        this._endDate = value
    }
}