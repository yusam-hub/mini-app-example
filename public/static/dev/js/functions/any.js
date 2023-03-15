/**
 *
 * @param ms number
 */
function js_sleep_ms(ms)
{
    ms += new Date().getTime();
    while (new Date() < ms){}
}

/**
 *
 * @returns string
 */
function js_generate_uuid()
{
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

/**
 *
 * @param v
 * @returns {boolean}
 */
function js_is_object(v) {
    return (v && typeof v === 'object' && !Array.isArray(v));
}

/**
 *
 * @param target
 * @param sources
 * @returns {*}
 */
function js_object_merge_deep(target, ...sources)
{
    if (!sources.length) return target;

    const source = sources.shift();

    if (js_is_object(target) && js_is_object(source)) {
        for (const key in source) {
            if (js_is_object(source[key]) && source.hasOwnProperty(key)) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }
                js_object_merge_deep(target[key], source[key]);
            } else {
                if (source.hasOwnProperty(key)) {
                    Object.assign(target, {[key]: source[key]});
                }
            }
        }
    }

    return js_object_merge_deep(target, ...sources);
}

/**
 *
 * @param name
 * @returns {*}
 */
function js_get_head_meta_content_by_name(name)
{
    return document.querySelector(`meta[name="${name}"]`).content;
}

/**
 *
 * @param tagId
 * @returns {{top: number, left: number}}
 */
function js_get_offset_from_elem_by_id(tagId) {

    let elem = document.getElementById(tagId);

    if ( !elem ) {
        return { top: 0, left: 0 };
    }

    if ( !elem.getClientRects().length ) {
        return { top: 0, left: 0 };
    }

    let rect = elem.getBoundingClientRect();

    let win = elem.ownerDocument.defaultView;

    return {
        top: rect.top + win.scrollY,
        left: rect.left + win.scrollX
    };
}

function js_lang_func(groupKey, dotKey = undefined) {
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

/**
 *
 * @param tagName
 * @param tagId
 * @param classes
 * @param callback
 * @returns {*}
 */
function js_create_el(tagName, tagId = "", classes = "", callback = undefined)
{
    let el = document.createElement(tagName);
    if (tagId !== "") {
        el.id = tagId;
    }
    if (classes !== "") {
        let classArray = classes.split(' ');
        classArray.forEach(function(value, index, array){
            el.classList.add(value);
        });
    }
    if (typeof callback === "function") {
        callback(el);
    }
    return el;
}

/*
function js_lang(dotKey)
{
    if (window.jsLang !== undefined) {
        let keys = dotKey.split(".");

        let jsLang = window.jsLang;
        let keyCounter = 0;

        keys.forEach(function (value, index, array){
            if (jsLang[value] !== undefined) {
                jsLang = jsLang[value];
                keyCounter++;
            }
        });

        if (keys.length === keyCounter) {
            return jsLang;
        }
    }
    return `window.jsLang.${dotKey}`;
}*/
