/**
 *
 * @param name
 * @returns {{}}
 */
URLSearchParams.prototype.getObject = function(name)
{
    let obj = {};

    this.forEach((value, key) => {
        let decodedKey = decodeURIComponent(key);
        let decodedValue = decodeURIComponent(value);
        if (decodedKey.endsWith(']')) {
            let key = decodedKey.separateLeft('[');
            if (name === key) {
                let subKey = decodedKey.separateLeft('[').rtrim('\\]');
                obj[subKey] = decodedValue;
            }
        }
    });

    return obj;
}