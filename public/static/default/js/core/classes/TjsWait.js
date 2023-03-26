"use strict";
class TjsWait extends TjsBase
{
    #jsGlob;
    #waitIntervalStart = 0;
    #waitAutoHideSeconds = 0;
    #waitIntervalId = null;
    #waitReferenceCounter = 0;
    #waitReferenceCounterEl = null;

    /**
     *
     * @param jsGlob TjsGlob
     * @param options object
     */
    constructor(jsGlob, options = {}) {
        if (!(jsGlob instanceof TjsGlob)) {
            throw Error("jsGlob is not instance of TjsGlob");
        }
        super(options);
        this.#jsGlob = jsGlob;
        this.#init();
    }

    #init()
    {
        let self = this;

        self.#waitReferenceCounterEl = js_create_el("div","js_wait_counter");

        self.#jsGlob.domLoaded(function(){
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
}