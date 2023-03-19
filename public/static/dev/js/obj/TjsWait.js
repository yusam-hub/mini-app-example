"use strict";
class TjsWait extends TjsBase
{
    #waitIntervalStart = 0;
    #waitAutoHideSeconds = 0;
    #waitIntervalId = null;
    #waitReferenceCounter = 0;
    #waitReferenceCounterEl = null;
    constructor(options = {}) {
        super(options);
        this.#init();
    }

    #init()
    {
        let self = this;

        self.#waitReferenceCounterEl = js_create_el("div","js_wait_counter");

        window.jsGlob.domLoaded(function(){
            let js_wait_background = js_create_el("div", "js_wait_background");
            js_wait_background.style.display = 'none';

            let js_wait_msg = js_create_el("div","js_wait_msg");
            js_wait_msg.innerHTML = self.lang.jsPropertyByDotKey("waitMessage");

            js_wait_msg.appendChild(self.#waitReferenceCounterEl);
            js_wait_background.appendChild(js_wait_msg);
            document.body.appendChild(js_wait_background);
        })
    }

    #waitIntervalDisplayFormHandler(self)
    {
        let v = ((new Date()).getTime() - self.#waitIntervalStart) / 1000;

        if ( self.#waitAutoHideSeconds > 0) {
            if (v > self.#waitAutoHideSeconds) {
                self.hide();
            }
        }

        self.#waitReferenceCounterEl.innerHTML = v.toFixed(1);
    }

    show(waitAutoHideSeconds= 0)
    {
        if (this.#waitReferenceCounter === 0) {
            document.getElementById('js_wait_background').style.display = '';
            this.#waitIntervalStart = (new Date()).getTime();
            this.#waitAutoHideSeconds = waitAutoHideSeconds;
            this.#waitIntervalId = setInterval(this.#waitIntervalDisplayFormHandler, 100, this);
        }
        this.#waitReferenceCounter++;
    }

    hide()
    {
        this.#waitReferenceCounter--;
        if (this.#waitReferenceCounter <= 0) {
            this.#waitReferenceCounter = 0;
            document.getElementById('js_wait_background').style.display = 'none';
            clearInterval(this.#waitIntervalId);
        }
    }
    /**
     *
     * @param countdownSeconds : number
     * @param finishHandler : caller
     * @param tickHandler : caller|null
     * @param calcTimerHandler : caller|null
     */
    waitCountdownEventHandler(countdownSeconds, finishHandler, tickHandler = null, calcTimerHandler = null)
    {
        function calcTimer(dist)
        {
            let hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((dist % (1000 * 60)) / 1000);
            return hours.toString().padStart(2,'0') + ":" + minutes.toString().padStart(2,'0') + ":" + seconds.toString().padStart(2,'0');
        }

        let timeEnd = Math.ceil((new Date()).getTime() / 1000) * 1000 + countdownSeconds * 1000;

        if (typeof(tickHandler) === 'function') {
            if (typeof calcTimerHandler === "function") {

            } else {
                tickHandler(calcTimer(countdownSeconds * 1000));
            }
        }

        let countdownIntervalId = setInterval(function(){
            if ((new Date()).getTime() >= timeEnd) {
                clearInterval(countdownIntervalId);
                if (typeof(finishHandler) === 'function') {
                    finishHandler();
                }
            } else {
                if (typeof(tickHandler) === 'function') {
                    tickHandler(calcTimer(timeEnd - (new Date()).getTime()));
                }
            }
        }, 1000);

    }
}