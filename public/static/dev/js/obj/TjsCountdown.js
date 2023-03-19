"use strict";
class TjsCountdown extends TjsInterval
{
    #countdownSeconds;
    #timeEnd;
    /**
     *
     * @param countdownSeconds int
     * @param finishHandler caller
     * @param tickHandler caller|undefined
     * @param options object
     */
    constructor(countdownSeconds, finishHandler, tickHandler = undefined, options = {}) {
        super(1000, function(){
            let self = this;

            if (self.timeNowInMilliseconds >= self.timeEnd) {
                self.stop();

                if (typeof(finishHandler) === 'function') {
                    finishHandler(self);
                }

            } else {

                if (typeof(tickHandler) === 'function') {
                    tickHandler(self);
                }

            }

        }, true, options);

        this.#countdownSeconds = countdownSeconds;
    }

    get timeNowInMilliseconds()
    {
        return (new Date()).getTime();
    }

    get timeEnd()
    {
        return this.#timeEnd;
    }

    get timeLeft()
    {
        return this.timeEnd - this.timeNowInMilliseconds;
    }

    start() {
        this.#timeEnd = Math.ceil( this.timeNowInMilliseconds / 1000) * 1000 + this.#countdownSeconds * 1000;
        super.start();
    }

    /**
     *
     * @param formatString string - '%h:%m:%s'
     * @returns {string}
     */
    formatTime(formatString = '%h:%m:%s')
    {
        let val = this.timeLeft;
        let hours = Math.floor((val % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((val % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((val % (1000 * 60)) / 1000);
        let h = hours.toString().padStart(2,'0');
        let m = minutes.toString().padStart(2,'0');
        let s = seconds.toString().padStart(2,'0');

        return formatString.jsStrTr({
            '%h' : h,
            '%m' : m,
            '%s' : s,
        });
    }
}