/**
 *
 * @param needle
 * @returns {boolean}
 */
Array.prototype.jsInArray = function(needle) {
    let length = this.length;
    for(let i = 0; i < length; i++) {
        if(this[i] === needle) return true;
    }
    return false;
}
