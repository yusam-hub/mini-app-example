

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
Object.prototype.concatToString = function()
{
    let obj = this.kSort();
    let keys = Object.keys(obj);
    let result = '';
    for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]] !== null) {
            if (typeof (obj[keys[i]]) === 'object') {
                result += obj[keys[i]].concatToString();
            } else {
                result += obj[keys[i]];
            }
        }
    }
    return result;
}

/**
 *
 * @returns {string[]}
 */
Object.prototype.arrayKeys = function ()
{
    return Object.keys(this);
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
