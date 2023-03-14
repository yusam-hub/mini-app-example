let TjsYusam = function(jsDeviceUUID) {

    this.jsDeviceUUID = jsDeviceUUID;

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
