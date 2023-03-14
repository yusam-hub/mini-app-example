String.prototype.rtrim = function(s) {
    if (s === undefined) {
        s = '\\s';
    }
    return this.replace(new RegExp("[" + s + "]*$"), '');
};
String.prototype.ltrim = function(s) {
    if (s === undefined) {
        s = '\\s';
    }
    return this.replace(new RegExp("^[" + s + "]*"), '');
};
Array.prototype.in_array = function(needle) {
    let length = this.length;
    for(let i = 0; i < length; i++) {
        if(this[i] === needle) return true;
    }
    return false;
}
String.prototype.separate_left = function(separator) {
    let arr = this.split(separator);
    return arr.length > 0 ? this.split(separator)[0] : undefined;
};
String.prototype.separate_right = function(separator) {
    let arr = this.split(separator);
    return arr.length > 1 ? this.split(separator)[1] : undefined;
};
URLSearchParams.prototype.getObject = function(name)
{
    let obj = {};

    this.forEach((value, key) => {
        let decodedKey = decodeURIComponent(key);
        let decodedValue = decodeURIComponent(value);
        if (decodedKey.endsWith(']')) {
            let key = decodedKey.separate_left('[');
            if (name === key) {
                let subKey = decodedKey.separate_right('[').rtrim('\\]');
                obj[subKey] = decodedValue;
            }
        }
    });

    return obj;
}
