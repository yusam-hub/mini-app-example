function jsLangFunc(groupKey, dotKey = undefined) {
    if (window.jsLocale === undefined) {
        window.jsLocale = 'en';
    }
    if (window.jsLang === undefined) {
        return 'window.jsLang.' + groupKey + '.' + window.jsLocale + '.' + dotKey;
    }
    if (window.jsLang[groupKey] === undefined) {
        return 'window.jsLang.' + groupKey + '.' + window.jsLocale + '.' + dotKey;
    }
    if (window.jsLang[groupKey][window.jsLocale] === undefined) {
        return 'window.jsLang.' + groupKey + '.' + window.jsLocale + '.' + dotKey;
    }

    if (dotKey === undefined) {
        return window.jsLang[groupKey][window.jsLocale];
    }

    if (typeof dotKey === 'string') {
        let keys = dotKey.split(".");

        let baseLang = window.jsLang[groupKey][window.jsLocale];
        let keyCounter = 0;

        keys.forEach(function (value, index, array){
            if (baseLang[value] !== undefined) {
                baseLang = baseLang[value];
                keyCounter++;
            }
        });

        if (keys.length === keyCounter) {
            return baseLang;
        }
    }

    return 'window.jsLang.' + groupKey + '.' + window.jsLocale + '.' + dotKey;
}

window.jsLangFunc = jsLangFunc;
