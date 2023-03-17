/**
 *
 * @param extractKey
 * @returns {{}}
 */
URLSearchParams.prototype.getObject = function(extractKey)
{
    let obj = {};
    this.forEach((value, key) => {
        let decodedKey = decodeURIComponent(key);
        let decodedValue = decodeURIComponent(value);

        if (decodedKey.endsWith(']')) {
            let key = decodedKey.separateLeft('[');
            if (extractKey === key) {
                let subKey = decodedKey.separateRight('[').rtrim('\\]');
                obj[subKey] = decodedValue;
            }
        }
    });

    return obj;
}