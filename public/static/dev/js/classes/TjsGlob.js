let TjsGlob = function() {
    this._init();
};

TjsGlob.prototype = {

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
    }
}
