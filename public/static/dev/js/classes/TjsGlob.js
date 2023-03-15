let TjsGlob = function() {
    this._init();
};

TjsGlob.prototype = {

    _domLoadedHandlers: [],
    _winReadyHandlers: [],
    _isDomLoaded: false,
    _isWinReady: false,

    _init: function ()
    {
        let self = this;

        window.addEventListener("DOMContentLoaded", function(){
            self._isDomLoaded = true;
            self._domLoadedHandlers.forEach(function(item, index, arr) {
                item.call();
            });
        });

        window.addEventListener("load", function(){
            self._isWinReady = true;
            self._winReadyHandlers.forEach(function(item, index, arr) {
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
        this._domLoadedHandlers.push(handler);
    },
    /**
     *
     * @returns {boolean}
     */
    isDomLoaded: function(){
        return this._isDomLoaded;
    },
    /**
     *
     * @param handler : caller
     */
    winReady: function(handler)
    {
        this._winReadyHandlers.push(handler);
    },
    /**
     *
     * @returns {boolean}
     */
    isWinReady: function(){
        return this._isWinReady;
    },
}
