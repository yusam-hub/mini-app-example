/**
 *
 * @param decimals
 * @param thousands_sep
 * @returns {string}
 */
Number.prototype.jsNumberFormat = function(decimals = 2, thousands_sep = ' ')
{
    let number = this;

    let i, j, kw, kd, km;

    let dec_point = ".";

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");

    return km + kw + kd;
};

/**
 *
 * @returns number
 */
Number.prototype.jsOdd = function()
{
    let newIndex = parseInt(this) || 0;

    let res = Math.ceil((newIndex + 1) / 2) - Math.floor((newIndex + 1) / 2);

    return (res === 1) ? 1 : 0;
}