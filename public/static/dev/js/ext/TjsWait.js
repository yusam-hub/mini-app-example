let TjsWait = function(jsYusam) {

    this.jsYusam = jsYusam;

    this.lang = window.jsLangFunc('TjsWait');

    this._waitInit();
};

TjsWait.prototype = {
    waitIntervalStart: 0,
    waitAutoHideSeconds: 0,
    waitIntervalId: null,
    waitReferenceCounter: 0,
    waitReferenceCounterEl: null,
    _waitInit: function ()
    {
        let self = this;

        self.waitReferenceCounterEl = self.jsYusam.newEl("div","js_wait_counter");

        this.jsYusam.domLoaded(function(){
            /*let img = self.jsYusam.newEl('img');
            img.src = self.jsYusam.baseUrlPath + '../css/images/js-wait.gif';
            img.width = '0';
            img.height = '0';
            img.class = 'display-none';
            self.jsYusam.body().appendChild(img);*/

            let js_wait_background = self.jsYusam.newEl("div", "js_wait_background");
            js_wait_background.style.display = 'none';

            let js_wait_msg = self.jsYusam.newEl("div","js_wait_msg");
            js_wait_msg.innerHTML = self.lang.waitMessage;

            js_wait_msg.appendChild(self.waitReferenceCounterEl);
            js_wait_background.appendChild(js_wait_msg);
            self.jsYusam.body().appendChild(js_wait_background);
        })
    },
    /**
     *
     * @param self
     * @private
     */
    _waitIntervalDisplayFormHandler: function (self)
    {
        let v = ((new Date()).getTime() - self.waitIntervalStart) / 1000;

        if ( self.waitAutoHideSeconds > 0) {
            if (v > self.waitAutoHideSeconds) {
                self.hide();
            }
        }

        self.waitReferenceCounterEl.innerHTML = v.toFixed(1);
    },
    /**
     *
     * @param waitAutoHideSeconds : number
     */
    show: function (waitAutoHideSeconds= 0)
    {
        if (this.waitReferenceCounter === 0) {
            let js_wait_background = document.getElementById('js_wait_background');
            js_wait_background.style.display = '';
            this.waitIntervalStart = (new Date()).getTime();
            this.waitAutoHideSeconds = waitAutoHideSeconds;
            this.waitIntervalId = setInterval(this._waitIntervalDisplayFormHandler, 100, this);
        }
        this.waitReferenceCounter++;
    },
    /**
     *
     */
    hide: function ()
    {
        this.waitReferenceCounter--;
        if (this.waitReferenceCounter <= 0) {
            this.waitReferenceCounter = 0;
            let js_wait_background = document.getElementById('js_wait_background');
            js_wait_background.style.display = 'none';
            clearInterval(this.waitIntervalId);
        }
    },
    /**
     *
     * @param countdownSeconds : number
     * @param finishHandler : caller
     * @param tickHandler : caller|null
     */
    waitCountdownEventHandler: function(countdownSeconds, finishHandler, tickHandler = null)
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
            tickHandler(calcTimer(countdownSeconds * 1000));
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

export default TjsWait;
