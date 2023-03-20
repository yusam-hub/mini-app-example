"use strict";
class TjsInterval extends TjsBase
{
    #timeout;
    #handler;
    #callOnStart;
    #intervalId = undefined;
    #tickCounter = 0;
    constructor(timeout, handler = undefined, callOnStart = false, options = {}) {
        super(options);
        this.#timeout = timeout;
        this.#handler = handler;
        this.#callOnStart = callOnStart;
    }

    get tickCounter()
    {
        return this.#tickCounter;
    }

    start()
    {
        if (this.#intervalId !== undefined) {
            return;
        }
        let self = this;
        self.#tickCounter = 0;
        if (self.#callOnStart) {
            self.callHandler();
        }
        self.#intervalId = setInterval(function(){
            self.#tickCounter++;
            self.callHandler();
        }, self.#timeout);
    }



    callHandler()
    {
        if (typeof this.#handler === "function") {
            this.#handler();
        }
    }

    stop()
    {
        if (this.#intervalId === undefined) {
            return;
        }
        clearInterval(this.#intervalId);
        this.#intervalId = undefined;
    }


}