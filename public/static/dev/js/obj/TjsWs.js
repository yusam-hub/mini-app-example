"use strict";

class TjsWs extends TjsBase
{
    #wsAutoOpening;
    #wsOpened;
    #wsInstance;
    #wsAutoOpenTimerId;
    #wsHostname;
    #wsProtocol;

    constructor(options = {}) {

        let defOptions = {
            path: "/ws",
            pathQuery: {}, //or function(){return {};}
            debugging: false,
            autoOpenOnCreate: true,
            autoOpenOnCloseAbnormally: true,
            autoOpenOnCloseAbnormallyInterval: 15000, //15 сек
            noopInterval: 600000, //10 минут todo: нужно сделать таймер отправки пустого сообщения чтобы сокет не отвалился
            onOpened: function(){},
            onIncomingMessage: function(jsonMessage, stringMessage){},
            onOutgoingMessage: function(jsonMessage, stringMessage){},
            onClosed: function(){},
            onError: function(){},
        };

        super(js_object_merge_deep(defOptions, options));

        this.#wsHostname = window.location.hostname;
        this.#wsProtocol = 'ws';
        if (window.location.protocol.toLowerCase() === 'https:') {
            this.#wsProtocol += 's';
        }

        this.#wsAutoOpening = false;
        this.#wsOpened = false;
        this.#wsInstance = null;
        this.#wsAutoOpenTimerId = undefined;

        this.#init();
    }

    /**
     *
     * @private
     */
    #init()
    {
        let self = this;

        if (self.options.autoOpenOnCreate === true) {
            self._doOpen();
        }
    }
    /**
     *
     * @param message
     * @param data
     * @private
     */
    #doDebug(message, data = undefined)
    {
        let self = this;
        if (self.options.debugging !== true) return;
        if (data !== undefined) {
            console.log("TjsWs - " + message, data);
        } else {
            console.log("TjsWs - " + message);
        }
    }
    /**
     *
     * @private
     */
    _doOpen()
    {
        let self = this;

        if (self.#wsOpened === true) {
            return;
        }

        self.#doDebug("try to open");

        let queryString = "";
        let pathQuery = self.options.pathQuery;
        if (typeof pathQuery === 'function') {
            queryString = (new URLSearchParams(pathQuery())).toString();
        }
        if (typeof pathQuery === 'object') {
            queryString = (new URLSearchParams(self.options.pathQuery)).toString();
        }
        let wsUrl = self.#wsProtocol + '://' + self.#wsHostname + '/' + self.options.path.jsLtrim('/') + ((queryString !== '') ? "?" + queryString : '');

        self.#wsInstance = new WebSocket(wsUrl);

        self.#wsInstance.onopen = function(ev) {
            self.#wsOpened = true;
            self.#wsAutoOpening = false;

            self.#doDebug("onOpened");
            if (typeof self.options.onOpened === 'function') {
                self.options.onOpened();
            }
        };

        self.#wsInstance.onmessage = function(ev)
        {
            let jsonMessage = undefined;
            let stringMessage = ev.data;

            try {
                jsonMessage = JSON.parse(stringMessage);
                self.#doDebug("onIncomingMessage", jsonMessage);
            } catch (err) {
                self.#doDebug("onIncomingMessage", stringMessage);
            }

            if (typeof self.options.onIncomingMessage === 'function') {
                self.options.onIncomingMessage(jsonMessage, stringMessage);
            }
        };

        self.#wsInstance.onclose = function(ev) {
            if (ev.code !== 1000) {
                self._doClose(true, ev);
            } else {
                self._doClose();
            }
        };

        self.#wsInstance.onerror = function(ev) {
            self.#doDebug("onError", ev);
            if (typeof self.options.onError === 'function') {
                self.options.onError();
            }
        };

    }
    /**
     *
     * @param autoOpen
     * @param closeEvent
     * @private
     */
    _doClose(autoOpen = false, closeEvent = undefined)
    {
        let self = this;

        if (self.#wsInstance === null) return;

        self.#wsInstance.close();
        self.#wsInstance = null;
        self.#wsOpened = false;

        if (typeof closeEvent === 'object') {
            self.#doDebug("onClosed", {
                'code' : closeEvent.code,
                'timeStamp' : closeEvent.timeStamp,
                'wasClean' : closeEvent.wasClean,
            });
        } else {
            self.#doDebug("onClosed");
        }
        if (typeof self.options.onClosed === 'function') {
            self.options.onClosed();
        }

        if (autoOpen === true
            &&
            self.options.autoOpenOnCloseAbnormally === true
            &&
            self.#wsAutoOpening !== true
        ) {
            self.#wsAutoOpening = true;
            self._doAutoOpenTimer({
                'self': self,
            });
        }
    }
    /**
     *
     * @param args
     * @private
     */
    _doAutoOpenTimer(args)
    {
        let self = args.self;

        clearInterval(self.#wsAutoOpenTimerId);
        self.#wsAutoOpenTimerId = undefined;

        if (self.#wsOpened !== true) {

            self.#wsAutoOpenTimerId = setInterval(
                self._doAutoOpenTimer,
                self.options.autoOpenOnCloseAbnormallyInterval,
                {
                    'self': self,
                }
            );

            self._doOpen();
        }
    }
    /**
     *
     */
    open()
    {
        let self = this;

        self._doOpen();
    }

    /**
     *
     */
    close()
    {
        let self = this;

        self._doClose(false);
    }
    /**
     *
     * @returns {boolean}
     */
    isOpened()
    {
        return this.#wsOpened;
    }
    /**
     *
     * @param message object|string
     */
    sendMessage(message)
    {
        let self = this;
        if (self.#wsOpened !== true) return;

        let jsonMessage = undefined;
        let stringMessage = undefined;

        if (typeof message === 'object') {
            jsonMessage = message;
            stringMessage = JSON.stringify(message);
            self.#doDebug("onOutgoingMessage", jsonMessage);
        } else if (typeof message === 'string') {
            stringMessage = message;
            self.#doDebug("onOutgoingMessage", stringMessage);
        }

        if (typeof self.options.onOutgoingMessage === 'function') {
            self.options.onOutgoingMessage(jsonMessage, stringMessage);
        }

        self.#wsInstance.send(stringMessage);
    }
}