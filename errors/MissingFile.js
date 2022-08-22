

export class MissingFileError extends Error {
    constructor(message) {
        super(message)
        this.name = 'MissingFileError'
    }
}