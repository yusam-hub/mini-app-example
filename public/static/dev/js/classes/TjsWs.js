let TjsWs = function(options = {}) {

    this.wsHostname = window.location.hostname;
    this.wsProtocol = 'ws';
    if (window.location.protocol.toLowerCase() === 'https:') {
        this.wsProtocol += 's';
    }

    let defOptions = {
        path: "/ws/dev/",
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

    this.options = js_object_merge_deep(defOptions, options);

    this.wsAutoOpening = false;
    this.wsOpened = false;
    this.wsInstance = null;
    this.wsAutoOpenTimerId = undefined;

    this._init();
};

TjsWs.prototype = {
    /**
     *
     * @private
     */
    _init: function()
    {
        let self = this;

        if (self.options.autoOpenOnCreate === true) {
            self._doOpen();
        }
    },
    /**
     *
     * @param message
     * @param data
     * @private
     */
    _doDebug: function(message, data = undefined)
    {
        let self = this;
        if (self.options.debugging !== true) return;
        if (data !== undefined) {
            console.log("TjsWs - " + message, data);
        } else {
            console.log("TjsWs - " + message);
        }
    },
    /**
     *
     * @private
     */
    _doOpen: function()
    {
        let self = this;

        if (self.wsOpened === true) {
            return;
        }

        self._doDebug("try to open");

        let queryString = "";
        let pathQuery = self.options.pathQuery;
        if (typeof pathQuery === 'function') {
            queryString = (new URLSearchParams(pathQuery())).toString();
        }
        if (typeof pathQuery === 'object') {
            queryString = (new URLSearchParams(self.options.pathQuery)).toString();
        }
        let wsUrl = self.wsProtocol + '://' + self.wsHostname + '/' + self.options.path.jsLtrim('/') + ((queryString !== '') ? "?" + queryString : '');

        self.wsInstance = new WebSocket(wsUrl);

        self.wsInstance.onopen = function(ev) {
            self.wsOpened = true;
            self.wsAutoOpening = false;

            self._doDebug("onOpened");
            if (typeof self.options.onOpened === 'function') {
                self.options.onOpened();
            }
        };

        self.wsInstance.onmessage = function(ev)
        {
            let jsonMessage = undefined;
            let stringMessage = ev.data;

            try {
                jsonMessage = JSON.parse(stringMessage);
                self._doDebug("onIncomingMessage", jsonMessage);
            } catch (err) {
                self._doDebug("onIncomingMessage", stringMessage);
            }

            if (typeof self.options.onIncomingMessage === 'function') {
                self.options.onIncomingMessage(jsonMessage, stringMessage);
            }
        };

        self.wsInstance.onclose = function(ev) {
            if (ev.code !== 1000) {
                self._doClose(true, ev);
            } else {
                self._doClose();
            }
        };

        self.wsInstance.onerror = function(ev) {
            self._doDebug("onError", ev);
            if (typeof self.options.onError === 'function') {
                self.options.onError();
            }
        };

    },
    /**
     *
     * @param autoOpen
     * @param closeEvent
     * @private
     */
    _doClose: function(autoOpen = false, closeEvent = undefined)
    {
        let self = this;

        if (self.wsInstance === null) return;

        self.wsInstance.close();
        self.wsInstance = null;
        self.wsOpened = false;

        if (typeof closeEvent === 'object') {
            self._doDebug("onClosed", {
                'code' : closeEvent.code,
                'timeStamp' : closeEvent.timeStamp,
                'wasClean' : closeEvent.wasClean,
            });
        } else {
            self._doDebug("onClosed");
        }
        if (typeof self.options.onClosed === 'function') {
            self.options.onClosed();
        }

        if (autoOpen === true
            &&
            self.options.autoOpenOnCloseAbnormally === true
            &&
            self.wsAutoOpening !== true
        ) {
            self.wsAutoOpening = true;
            self._doAutoOpenTimer({
                'self': self,
            });
        }
    },
    /**
     *
     * @param args
     * @private
     */
    _doAutoOpenTimer: function(args)
    {
        let self = args.self;

        clearInterval(self.wsAutoOpenTimerId);
        self.wsAutoOpenTimerId = undefined;

        if (self.wsOpened !== true) {

            self.wsAutoOpenTimerId = setInterval(
                self._doAutoOpenTimer,
                self.options.autoOpenOnCloseAbnormallyInterval,
                {
                    'self': self,
                }
            );

            self._doOpen();
        }
    },
    /**
     *
     */
    open: function()
    {
        let self = this;

        self._doOpen();
    },
    /**
     *
     */
    close: function()
    {
        let self = this;

        self._doClose(false);
    },
    /**
     *
     * @returns {boolean}
     */
    isOpened: function()
    {
       return this.wsOpened;
    },
    /**
     *
     * @param message object|string
     */
    sendMessage: function(message)
    {
        let self = this;
        if (self.wsOpened !== true) return;

        let jsonMessage = undefined;
        let stringMessage = undefined;

        if (typeof message === 'object') {
            jsonMessage = message;
            stringMessage = JSON.stringify(message);
            self._doDebug("onOutgoingMessage", jsonMessage);
        } else if (typeof message === 'string') {
            stringMessage = message;
            self._doDebug("onOutgoingMessage", stringMessage);
        }

        if (typeof self.options.onOutgoingMessage === 'function') {
            self.options.onOutgoingMessage(jsonMessage, stringMessage);
        }

        self.wsInstance.send(stringMessage);
    }
}

