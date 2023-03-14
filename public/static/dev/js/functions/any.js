/**
 *
 * @param ms number
 */
function sleep_ms(ms)
{
    ms += new Date().getTime();
    while (new Date() < ms){}
}

/**
 *
 * @returns string
 */
function generate_uuid()
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
function is_object(v) {
    return (v && typeof v === 'object' && !Array.isArray(v));
}

/**
 *
 * @param target
 * @param sources
 * @returns {*}
 */
function object_merge_deep(target, ...sources)
{
    if (!sources.length) return target;

    const source = sources.shift();

    if (is_object(target) && is_object(source)) {
        for (const key in source) {
            if (is_object(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                object_merge_deep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return object_merge_deep(target, ...sources);
}

/**
 *
 * @param name
 * @returns {*}
 */
function get_head_meta_content_by_name(name)
{
    return document.querySelector(`meta[name="${name}"]`).content;
}

/**
 *
 * @param tagId
 * @returns {{top: number, left: number}}
 */
function get_offset_from_elem_by_id(tagId) {

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
