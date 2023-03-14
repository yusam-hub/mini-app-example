

/**
 *
 * @returns {{}}
 */
Object.prototype.kSort = function()
{
    let obj = this;
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
};
/**
 *
 * @returns {string}
 */
Object.prototype.contactToString = function()
{
    let obj = this.kSort();
    let keys = Object.keys(obj);
    let result = '';
    for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]] !== null) {
            if (typeof (obj[keys[i]]) === 'object') {
                result += obj[keys[i]].contactToString();
            } else {
                result += obj[keys[i]];
            }
        }
    }
    return result;
}

/**
 *
 * @param obj
 * @returns {any}
 */
Object.prototype.merge = function(obj)
{
    return Object.assign(this, obj);
}
