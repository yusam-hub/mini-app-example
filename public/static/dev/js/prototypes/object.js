/**
 *
 * @returns {{}}
 */
Object.prototype.jsSortByKey = function()
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
/*Object.prototype.concatToString = function(onlyValues = false)
{
    let obj = this.kSort();
    let keys = Object.keys(obj);
    let result = '';
    for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]] !== null) {
            if (typeof (obj[keys[i]]) === 'object') {
                if (onlyValues) {
                    result += obj[keys[i]].concatToString(onlyValues);
                } else {
                    result += keys[i]+obj[keys[i]].concatToString(onlyValues);
                }
            } else {
                if (onlyValues) {
                    result += obj[keys[i]];
                } else {
                    result += keys[i]+obj[keys[i]];
                }
            }
        }
    }
    return result;
}*/

/**
 *
 * @returns {string[]}
 */
Object.prototype.jsArrayKeys = function ()
{
    return Object.keys(this);
}

/**
 *
 * @param obj
 * @returns {any}
 */
Object.prototype.jsMerge = function(obj)
{
    return Object.assign(this, obj);
}

/**
 *
 * @param size
 * @returns {*[]}
 */
Object.prototype.jsChunk = function(size)
{
    let obj = this;
    let ret = [];
    for (let i = 0; i < obj.length; i += size)
        ret.push(obj.slice(i, i + size));
    return ret;
};