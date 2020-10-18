export default class Vertex {
    constructor(id) {
        this._id = id;
        this._xy = null;
    }
    get id() {
        return this._id;
    }
    get xy() {
        return this._xy;
    }
    
    /** @param {number[]} xy */
    set xy(xy) {
        this._xy = xy;
    }
}