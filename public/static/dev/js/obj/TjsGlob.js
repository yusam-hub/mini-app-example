"use strict";
class TjsGlob extends TjsBase
{
    #domLoadedHandlers = [];
    #winReadyHandlers = [];
    #isDomLoaded = false;
    #isWinReady = false;

    constructor(options = {}) {
        super(options);
        this.#init();
    }

    #init()
    {
        let self = this;

        window.addEventListener("DOMContentLoaded", function(){
            self.#isDomLoaded = true;
            self.#domLoadedHandlers.forEach(function(item, index, arr) {
                item.call();
            });
        });

        window.addEventListener("load", function(){
            self.#isWinReady = true;
            self.#winReadyHandlers.forEach(function(item, index, arr) {
                item.call();
            });
        });
    }

    domLoaded(handler)
    {
        this.#domLoadedHandlers.push(handler);
    }

    isDomLoaded()
    {
        return this.#isDomLoaded;
    }

    winReady(handler)
    {
        this.#winReadyHandlers.push(handler);
    }

    isWinReady()
    {
        return this.#isWinReady;
    }
}