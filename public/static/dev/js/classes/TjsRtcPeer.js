let TjsRtcPeer = function(options = {}) {

    let defOptions = {
        'debugging' : false,
        'onOutgoingMessage' : function(jsonMessage){},
        'onLocalGetStream' : function(){},
        'onLocalGetPromiseMediaStream' : function(){},
        'onRemoteSetStream' : function(stream){},
        'onRemoteClearStream' : function(){},
        'onRegisteredPeerUuids' : function(uuids){},
        'rtcConfig': {},
    };

    this.options = js_object_merge_deep(defOptions, options);

    this.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    this.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
    this.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;

    this.rtcInstance = null;
    this.rtcLocalPeerUuid = js_generate_uuid();
    this.rtcRemotePeerUuid = null;

    this._init();
};

TjsRtcPeer.prototype = {
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
            console.log("TjsRtcPeer("+self.rtcLocalPeerUuid+") - " + message, data);
        } else {
            console.log("TjsRtcPeer("+self.rtcLocalPeerUuid+") - " + message);
        }
    },
    /**
     *
     * @private
     */
    _doState: function(message = 'state')
    {
        let self = this;

        self._doDebug(message, {
            'signalingState' : self.rtcInstance.signalingState,
            'connectionState' : self.rtcInstance.connectionState,
            'iceConnectionState' : self.rtcInstance.iceConnectionState,
            'iceGatheringState' : self.rtcInstance.iceGatheringState,
        });
    },
    /**
     *
     * @private
     */
    _init: function()
    {
        let self = this;

        self._doDebug('_init', self.options);
    },
    /**
     *
     * @param type
     * @param data
     * @private
     */
    _doOutgoingMessage: function(type, data = {})
    {
        let self = this;

        let rtcData = Object.assign({
            'type' : type,
        }, data);

        let jsonMessage = {
            'rtcFromPeerUuid' : self.rtcLocalPeerUuid,
            'rtcToPeerUuid' : self.rtcRemotePeerUuid,
            'rtcType' : 'TjsRtcPeer',
            'rtcData' : rtcData,
        };

        self._doDebug("-> " + rtcData.type, jsonMessage);

        if (typeof self.options.onOutgoingMessage === 'function') {
            self.options.onOutgoingMessage(jsonMessage);
        }
    },
    /**
     *
     * @returns {*}
     */
    getRtcLocalPeerUuid: function()
    {
        let self = this;

        return self.rtcLocalPeerUuid;
    },
    /**
     *
     * @returns {*}
     */
    getRtcRemotePeerUuid: function()
    {
        let self = this;

        return self.rtcRemotePeerUuid;
    },
    /**
     *
     * @returns {null|*}
     */
    getRtcInstance: function()
    {
        let self = this;

        return self.rtcInstance;
    },
    /**
     *
     * @returns {boolean}
     */
    isRtcConnected: function()
    {
        let self = this;

        return self.rtcInstance !== null
            && self.rtcInstance.connectionState === 'connected'
            && self.rtcInstance.iceConnectionState === 'connected'
            && self.rtcInstance.iceGatheringState === 'complete';
    },
    /**
     *
     * @returns {boolean}
     */
    isRtcWait: function()
    {
        let self = this;

        return self.rtcInstance !== null
            && self.rtcInstance.connectionState === 'new'
            && self.rtcInstance.iceConnectionState === 'new'
            && self.rtcInstance.iceGatheringState === 'new';
    },
    /**
     *
     * @returns {boolean}
     */
    isRtcBusy: function()
    {
        let self = this;

        return !self.isRtcConnected() && !self.isRtcWait();
    },
    /**
     *
     */
    addLocalMediaToRtcTrack: function()
    {
        let self = this;

        if (self.rtcInstance === null) {
            return;
        }

        if (typeof self.options.onLocalGetStream === 'function') {
            let stream = self.options.onLocalGetStream();
            self.rtcInstance.addTrack(stream.getTracks()[0], stream);
        }
    },
    /**
     *
     */
    create: function()
    {
        let self = this;

        if (self.rtcInstance !== null) return;

        self.rtcInstance = new self.RTCPeerConnection(self.options.rtcConfig);

        self._doState('create');

        /**
         * Обаботчик события о том, что мы получили видео поток
         * @param event
         */
        self.rtcInstance.ontrack = function(event)
        {
            self._doDebug("onRemoteSetStream");
            if (typeof self.options.onRemoteSetStream === 'function') {
                self.options.onRemoteSetStream(event.streams[0]);
            }
        };

        /**
         * Обработчик
         */
        self.rtcInstance.onicegatheringstatechange = function()
        {
            self._doState('onIceGatheringStateChange');

            switch(self.rtcInstance.iceGatheringState) {
                case "gathering":
                case "complete":

                    break;
            }
        }

        /**
         * Обработчик обмена Ice Candidate
         * @param event
         */
        self.rtcInstance.onicecandidate = function(event)
        {
            if (event.candidate) {

                self._doState('onIceCandidate');

                self._doOutgoingMessage('ice-candidate', {
                    'candidate' : event.candidate,
                });

            }
        };

        /**
         * Обработчик статусов ICE соединенния
         * @param event
         */
        self.rtcInstance.oniceconnectionstatechange = function(event)
        {
            self._doState('onIceConnectionStateChange');

            switch(self.rtcInstance.iceConnectionState) {
                case "closed":
                case "failed":
                case "disconnected":
                    self.destroy();
                    break;
            }
        };

        /**
         * Обработчик статусов сигналиации
         * @param ev
         */
        self.rtcInstance.onsignalingstatechange = function(ev)
        {
            self._doState('onSignalingStateChange');

            switch (self.rtcInstance.signalingState) {
                case "closed":
                    self.destroy();
                    break;
            }
        };

        /**
         *
         * @param ev
         */
        self.rtcInstance.onconnectionstatechange = function (ev) {
            self._doState('onConnectionStateChange');
        }

        self._doOutgoingMessage('rtc-local-peer-uuid-update');
    },
    /**
     *
     */
    destroy: function(reCreate = true)
    {
        let self = this;

        if (self.rtcInstance === null) return;

        self._doState('destroy');

        self._doDebug("onRemoteClearStream");
        if (typeof self.options.onRemoteClearStream === 'function') {
            self.options.onRemoteClearStream();
        }

        self.rtcInstance.ontrack = null;

        self.rtcInstance.onicegatheringstatechange = null;

        self.rtcInstance.onicecandidate = null;

        self.rtcInstance.oniceconnectionstatechange = null;

        self.rtcInstance.onsignalingstatechange = null;

        self.rtcInstance.close();

        self.rtcInstance = null;

        self.rtcRemotePeerUuid = null;

        if (reCreate === true) {
            self.create();
        }
    },
    /**
     *
     * @param jsonMessage
     * @returns {boolean}
     */
    doIncomingMessage: function(jsonMessage = {})
    {
        let self = this;

        if (self.rtcInstance === null) return false;

        let localJsonMessage = js_object_merge_deep({
            'rtcType': '',
            'rtcFromPeerUuid': '',
            'rtcToPeerUuid': '',
            'rtcData': {},
        }, jsonMessage);

        if (localJsonMessage.rtcType !== 'TjsRtcPeer') return false;
        if (typeof localJsonMessage.rtcData !== 'object') return false;
        if (localJsonMessage.rtcToPeerUuid !== self.rtcLocalPeerUuid) return false;

        /**
         * Получем всех зарегистрированных
         */
        if (localJsonMessage.rtcData.type === 'rtc-local-registered-peers'
            && localJsonMessage.rtcData.registeredPeers !== undefined
            && Array.isArray(localJsonMessage.rtcData.registeredPeers)
        )
        {
            if (typeof self.options.onRegisteredPeerUuids === 'function') {
                const uuids = localJsonMessage.rtcData.registeredPeers;
                const index = uuids.indexOf(self.rtcLocalPeerUuid);
                if (index > -1) {
                    uuids.splice(index, 1);
                }
                self.options.onRegisteredPeerUuids(uuids);
            } else {
                self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);
            }

            return true;
        }

        /**
         * Ошибка приема команды
         */
        if (localJsonMessage.rtcData.type === 'rtc-accept-fail')
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            return true;
        }

        /**
         * Предлагают коннект новый
         */
        if (localJsonMessage.rtcData.type === 'rtc-connect-to-offer')
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            let saveRtcRemotePeerUuid = self.rtcRemotePeerUuid;
            self.rtcRemotePeerUuid = localJsonMessage.rtcFromPeerUuid;

            if (!self.isRtcWait()) {
                self._doOutgoingMessage('rtc-accept-fail', {'acceptFailType' : localJsonMessage.rtcData.type});
                self.rtcRemotePeerUuid = saveRtcRemotePeerUuid;
                return true;
            }

            self._doOutgoingMessage('rtc-connect-to-answer');

            return true;
        }

        /**
         * Можем установить коннект новый
         */
        if (localJsonMessage.rtcData.type === 'rtc-connect-to-answer')
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            if (!self.isRtcWait()) {
                self._doOutgoingMessage('rtc-accept-fail', {'acceptFailType' : localJsonMessage.rtcData.type});
                return true;
            }

            self.addLocalMediaToRtcTrack();

            self.rtcInstance.createOffer()
                .then(function (offer) {

                    return self.rtcInstance.setLocalDescription(offer);

                })
                .then(function () {

                    self._doOutgoingMessage(self.rtcInstance.localDescription.type,{
                        'sdp'  : self.rtcInstance.localDescription.sdp
                    });

                })
                .catch(function (e) {

                    self._doDebug('Error: ' + e.message)

                });

            return true;
        }

        /**
         * Предлагают переконнект
         */
        if (localJsonMessage.rtcData.type === 'rtc-reconnect-offer')
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            if (!self.isRtcConnected()) {
                self._doOutgoingMessage('rtc-accept-fail', {'acceptFailType' : localJsonMessage.rtcData.type});
                return true;
            }

            let rtcRemotePeerUuid = self.rtcRemotePeerUuid;

            self.destroy();

            self.rtcRemotePeerUuid = rtcRemotePeerUuid;

            self._doOutgoingMessage('rtc-reconnect-answer');

            return true;
        }

        /**
         * Поддтвержают переконнект
         */
        if (localJsonMessage.rtcData.type === 'rtc-reconnect-answer')
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            if (!self.isRtcConnected()) {
                self._doOutgoingMessage('rtc-accept-fail', {'acceptFailType' : localJsonMessage.rtcData.type});
                return true;
            }

            let rtcRemotePeerUuid = self.rtcRemotePeerUuid;

            self.destroy();

            self.connectTo(rtcRemotePeerUuid);

            return true;
        }

        /**
         * Сообщение о предложении подключиться
         */
        if (localJsonMessage.rtcData.type === 'offer' && localJsonMessage.rtcData.sdp !== undefined)
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            self._doState();

            self.rtcRemotePeerUuid = localJsonMessage.rtcFromPeerUuid;

            if (!self.isRtcWait()) {
                self._doOutgoingMessage('rtc-accept-fail', {'acceptFailType' : localJsonMessage.rtcData.type});
                return true;
            }

            self.addLocalMediaToRtcTrack();

            self.rtcInstance
                .setRemoteDescription(new self.RTCSessionDescription({
                    'type' : localJsonMessage.rtcData.type,
                    'sdp': localJsonMessage.rtcData.sdp,
                }))
                .then(function (){

                    if (typeof self.options.onLocalGetPromiseMediaStream === 'function') {
                        return self.options.onLocalGetPromiseMediaStream();
                    }

                    return null;

                })
                .then(function() {

                    return self.rtcInstance.createAnswer();

                })
                .then(function(answer) {

                    return self.rtcInstance.setLocalDescription(answer);

                })
                .then(function() {

                    self._doOutgoingMessage(self.rtcInstance.localDescription.type,
                        {
                            'sdp'  : self.rtcInstance.localDescription.sdp
                        });

                });


            return true;
        }

        /**
         * Сообщение об ответе на подключение
         */
        if (localJsonMessage.rtcData.type === 'answer' && localJsonMessage.rtcData.sdp !== undefined)
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            self._doState();

            self.rtcRemotePeerUuid = localJsonMessage.rtcFromPeerUuid;

            self.rtcInstance.setRemoteDescription(new self.RTCSessionDescription({
                'type' : localJsonMessage.rtcData.type,
                'sdp' : localJsonMessage.rtcData.sdp
            }));

            return true;
        }

        /**
         * Сообщения, на принимаем/отдачу данных ice-candidate
         */
        if (localJsonMessage.rtcData.type === 'ice-candidate' && localJsonMessage.rtcData.candidate !== undefined)
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            self._doState();

            self.rtcInstance
                .addIceCandidate(new self.RTCIceCandidate(localJsonMessage.rtcData.candidate))
                .catch(function (e) {
                    self._doDebug('Error: ' + e.message)
                });

            return true;
        }

        /**
         * Сообщение что удаленный клиент прекратил соденинение
         */
        if (localJsonMessage.rtcData.type === 'rtc-disconnected')
        {
            self._doDebug("<- " + localJsonMessage.rtcData.type, localJsonMessage);

            if (!self.isRtcConnected()) {
                self._doOutgoingMessage('rtc-accept-fail', {'acceptFailType' : localJsonMessage.rtcData.type});
                return true;
            }

            self.destroy();

            return true;
        }

        return false;
    },
    /**
     *
     * @param rtcRemotePeerUuid
     * @param data
     */
    connectTo: function(rtcRemotePeerUuid, data = {})
    {
        let self = this;

        if (self.rtcInstance === null) return;

        self._doState('connectTo');

        if (!self.isRtcWait()) return;

        self.rtcRemotePeerUuid = rtcRemotePeerUuid;

        self._doOutgoingMessage('rtc-connect-to-offer');
    },
    /**
     *
     */
    reConnect: function()
    {
        let self = this;

        if (self.rtcInstance === null) return;

        self._doState('reConnect');

        if (!self.isRtcConnected()) return;

        self._doOutgoingMessage('rtc-reconnect-offer');
    },
    /**
     *
     */
    disconnect: function()
    {
        let self = this;

        if (self.rtcInstance === null) return;

        self._doState('disconnect');

        if (!self.isRtcConnected()) return;

        self._doOutgoingMessage('rtc-disconnected');

        self.destroy();
    }
}
