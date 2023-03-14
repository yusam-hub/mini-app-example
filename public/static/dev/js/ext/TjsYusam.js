let TjsYusam = function(jsDeviceUUID) {

    this.jsDeviceUUID = jsDeviceUUID;

    let scripts = document.getElementsByTagName("script");
    let src = scripts[scripts.length-1].src;
    let url = new URL(src);

    this.baseUrlPath = url.pathname.substring(0, url.pathname.length - url.pathname.split("/").pop().length);

    this._init();
};

TjsYusam.prototype = {

    domLoadedHandlers: [],
    winReadyHandlers: [],

    _init: function ()
    {
        let self = this;

        window.addEventListener("DOMContentLoaded", function(){

            self.domLoadedHandlers.forEach(function(item, index, arr) {
                item.call();
            });
        });

        window.addEventListener("load", function(){

            self.winReadyHandlers.forEach(function(item, index, arr) {
                item.call();
            });
        });
    },
    /**
     *
     * @param handler : caller
     */
    domLoaded: function(handler)
    {
        this.domLoadedHandlers.push(handler);
    },
    /**
     *
     * @param handler : caller
     */
    winReady: function(handler)
    {
        this.winReadyHandlers.push(handler);
    },
    /**
     *
     * @param dotKey : string
     * @returns any
     */
    lang: function(dotKey)
    {
        if (window.jsLang !== undefined) {
            if (window.jsLang.jsYusam !== undefined) {
                let keys = dotKey.split(".");

                let jsYusamLang = window.jsLang.jsYusam;
                let keyCounter = 0;

                keys.forEach(function (value, index, array){
                    if (jsYusamLang[value] !== undefined) {
                        jsYusamLang = jsYusamLang[value];
                        keyCounter++;
                    }
                });

                if (keys.length === keyCounter) {
                    return jsYusamLang;
                }
            }
        }
        //console.log(`window.jsLang.jsYusam.${dotKey} is undefined`);
        return `window.jsLang.jsYusam.${dotKey}`;
    },
    /**
     * Create element
     * @param tagName : string
     * @param tagId : string
     * @returns {HTMLElement}
     */
    newEl: function(tagName, tagId = ""){
        let el = document.createElement(tagName);
        if (tagId !== "") {
            el.id = tagId;
        }
        return el;
    },
    /**
     * @param href : string
     * @returns {HTMLElement}
     */
    newCssEl: function(href)
    {
        let link = this.newEl("link");
        link.href = href;
        link.type = "text/css";
        link.rel = "stylesheet";
        //link.media = "screen,print";
        return link;
    },
    /**
     *
     * @param src : string
     * @returns {HTMLElement}
     */
    newJsEl: function(src)
    {
        let script = this.newEl("script");
        script.type = "text/javascript";
        script.src = src;
        return script;
    },
    /**
     * Get head element of html
     * @returns {HTMLElement}
     */
    head: function()
    {
        return document.getElementsByTagName("head")[0];
    },
    /**
     * Get body element of html
     * @returns {HTMLElement}
     */
    body: function()
    {
        return document.body;
    },
    /**
     * Add head css link throw domLoaded
     * @param href : string|object
     */
    headCssAdd: function(href)
    {
        let self = this;

        this.domLoaded(function(){

            if (typeof(href) === 'string') {

                self.head().appendChild(self.newCssEl(href));

            } else if (typeof(href) === 'object') {

                href.forEach(function(hrefItem, index, arr) {

                    self.head().appendChild(self.newCssEl(hrefItem));

                });

            }
        });
    },
    /**
     *
     * @param name : string
     * @returns string
     */
    headMetaContent: function(name)
    {
        return document.querySelector(`meta[name="${name}"]`).content;
    },
    /**
     *
     * @param number
     * @param decimals
     * @param thousands_sep
     * @returns {*}
     */
    numberFormat: function(number, decimals = 2, thousands_sep = ' ')
    {
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
    },
    /**
     *
     * @param index - number
     * @returns number
     */
    odd: function(index)
    {
        let newIndex = parseInt(index) || 0;

        let res = Math.ceil((newIndex + 1) / 2) - Math.floor((newIndex + 1) / 2);

        return (res === 1) ? 1 : 0;
    },
    /**
     *
     * @param string
     * @param nullStringReplace
     * @returns {string}
     */
    escape: function(string, nullStringReplace = '') {
        return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/null/g, nullStringReplace);
    },
    /**
     *
     * @param string
     * @returns {string}
     */
    nl2br: function(string) {
        return String(string).replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
    },
    /**
     *
     * @param string
     * @returns {string}
     */
    br2nl: function(string) {
        return String(string).replace(/<br>/g, "\r");
    },
    /**
     *
     * @param tagId
     * @returns {{top: number, left: number}}
     */
    offset: function(tagId) {

        let elem = document.getElementById(tagId);

        if ( !elem ) {
            return;
        }

        if ( !elem.getClientRects().length ) {
            return { top: 0, left: 0 };
        }

        let rect = elem.getBoundingClientRect();

        let win = elem.ownerDocument.defaultView;

        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };
    },
    /**
     *
     * @param v
     * @returns {boolean}
     */
    isObject: function(v) {
        return (v && typeof v === 'object' && !Array.isArray(v));
    },
    /**
     *
     * @param target
     * @param sources
     * @returns {*}
     */
    /*merge: function(target, sources)
    {
        return Object.assign(target, sources);
    },*/
    /**
     *
     * @param target
     * @param sources
     * @returns {*}
     */
    mergeDeep: function(target, ...sources)
    {
        let self = this;

        if (!sources.length) return target;

        const source = sources.shift();

        if (self.isObject(target) && self.isObject(source)) {
            for (const key in source) {
                if (self.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    self.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    },
    /**
     * @returns string
     */
    createUuid: function()
    {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    },
    /**
     *
     * @param obj object
     * @returns object
     */
    objSortByKeys: function(obj)
    {
        return Object.keys(obj).sort().reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
    },
    /**
     * @param newObj object
     * @returns string
     */
    objConcatValues: function(newObj)
    {
        let obj = this.objSortByKeys(newObj);
        let keys = Object.keys(obj);
        let result = '';
        for (let i = 0; i < keys.length; i++) {
            if (obj[keys[i]] !== null) {
                if (typeof (obj[keys[i]]) === 'object') {
                    result += this.objSortByKeys(obj[keys[i]]);
                } else {
                    result += obj[keys[i]];
                }
            }
        }
        return result;
    },
    /**
     * @param ms
     */
    sleep: function (ms)
    {
        ms += new Date().getTime();
        while (new Date() < ms){}
    },
    /**
     *
     * @param obj object
     * @param size number
     * @returns {[]}
     */
    objChunk: function(obj, size)
    {
        let ret = [];
        for (let i = 0; i < obj.length; i += size)
            ret.push(obj.slice(i, i + size));
        return ret;
    },
    /**
     *
     * @param obj object
     * @param secret_key string
     * @returns {string}
     */
    objGenerateHashMd5: function(obj, secret_key = '')
    {
        return this.md5(this.objConcatValues(obj) + secret_key);
    },
    /**
     *
     * @param newObj object
     * @param secret_key string
     * @returns {boolean}
     */
    objCheckHashMd5: function(newObj, secret_key = '')
    {
        let obj = newObj;
        let oldHash = obj.hash;
        delete obj.hash;
        let newHash = this.md5(this.objConcatValues(obj) + secret_key);
        return oldHash === newHash;
    },
    /**
     * @param src
     * @returns {string}
     */
    md5: function(src)
    {
        let MD5=function(d){d=unescape(encodeURIComponent(d));let result=M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
        return MD5(src);
    },
    /**
     *
     * @returns {string}
     */
    getDeviceId: function()
    {
        return this.jsDeviceUUID.get();
    },
    /**
     *
     * @returns {string}
     */
    getDeviceBrowserId: function()
    {
        let du = this.jsDeviceUUID.parse();
        let dua = [
            du.language,
            du.platform,
            du.os,
            du.cpuCores,
            du.isAuthoritative,
            du.silkAccelerated,
            du.isKindleFire,
            du.isDesktop,
            du.isMobile,
            du.isTablet,
            du.isWindows,
            du.isLinux,
            du.isLinux64,
            du.isMac,
            du.isiPad,
            du.isiPhone,
            du.isiPod,
            du.isSmartTV,
            du.pixelDepth,
            du.isTouchScreen,
            du.source,
        ];
        return du.hashMD5(dua.join(''));
    }
}

export default TjsYusam;
