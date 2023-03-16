let TjsMedia = function(tagId, options = {}) {

    let defOptions = {
        debugging: false,
        captureStartOnCreate: false,
        mediaStreamMode: false,//false, 'user' | 'display'
        userMedia: {
            constraints: {
                //video: true | false
                audio: false,
                //audio: true | false
                video: true,
                /*video: {
                    //width: 1280, height: 720,
                    //width: { min: 1024, ideal: 1280, max: 1920 },
                    //height: { min: 576, ideal: 720, max: 1080 }
                    //facingMode: "user" | "environment"
                    //deviceId: myPreferredCameraDeviceId
                    //deviceId: { exact: myExactCameraOrBustDeviceId }
                }*/
            }
        },
        displayMedia: {
            constraints: {
                audio: false,
                //audio: true | false
                /*audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }*/
                video: true,
                //video: true | false
                /*video: {
                    cursor: "always"
                },*/
                /*video : {
                    displaySurface: "monitor", // monitor, window, application, browser
                    logicalSurface: true,
                    cursor: "always", // never, always, motion
                }*/
            }
        },

        onStreamLoaded: function(){},
        onStreamCleared: function(){},
        onCaptureStarted: function(stream){},
        onCaptureStopped: function(){},
    };

    this.options = js_object_merge_deep(defOptions, options);

    this.el = document.getElementById(tagId);

    this.promiseMediaStream = null;

    this._init();
};

TjsMedia.prototype = {
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
            console.log("TjsMedia("+self.el.id+") - " + message, data);
        } else {
            console.log("TjsMedia("+self.el.id+") - " + message);
        }
    },
    /**
     *
     * @private
     */
    _init: function()
    {
        let self = this;

        if (window.location.protocol.toLowerCase() !== 'https:') {
            throw new Error('Require https protocol of connection!');
        }

        if (self.options.captureStartOnCreate === true) {
            self.captureStart();
        }
    },
    /**
     *
     * @returns {any}
     */
    getEl: function()
    {
        return this.el;
    },
    /**
     *
     * @returns {boolean}
     */
    isPromiseMediaStreamExists: function ()
    {
       return this.promiseMediaStream !== null;
    },
    /**
     *
     * @returns {null|Promise<MediaStream>|*}
     */
    getPromiseMediaStream: function()
    {
        return this.promiseMediaStream;
    },
    /**
     *
     * @returns {null|MediaProvider|*}
     */
    getStream: function ()
    {
        return this.el.srcObject;
    },
    /**
     * @returns {boolean}
     */
    isSrcObjectExists: function ()
    {
        return this.el.srcObject !== null;
    },
    /**
     *
     * @returns {MediaStreamTrack[]|null}
     */
    getTracks: function()
    {
        if (this.el.srcObject === null) {
            return null;
        }
        return this.el.srcObject.getTracks();
    },
    /**
     *
     * @param stream
     */
    setStream: function(stream)
    {
        let self = this;

        self._doDebug("onSetStream");

        self.clearStream();

        self.el.onloadedmetadata = function (event) {
            self._doDebug("onStreamLoaded");
            if (typeof self.options.onStreamLoaded === 'function') {
                self.options.onStreamLoaded();
            }
        };

        self.el.srcObject = stream;
    },
    /**
     *
     */
    clearStream: function()
    {
        let self = this;

        self._doDebug("onClearStream");

        if (self.el.srcObject) {
            self.el.srcObject.getTracks().forEach(track => track.stop());
            self._doDebug("onStreamCleared");
            if (typeof self.options.onStreamCleared === 'function') {
                self.options.onStreamCleared();
            }
        }

        self.el.srcObject = null;
    },
    /**
     *
     * @param callback
     */
    onCaptureStarted: function(callback){
        let self = this;
        self.options.onCaptureStarted = callback;
    },
    /**
     *
     * @param callback
     */
    onCaptureStopped: function(callback){
        let self = this;
        self.options.onCaptureStopped = callback;
    },
    /**
     *
     * @param mediaStreamMode
     * @param constraints
     */
    captureChange: function(mediaStreamMode, constraints = undefined)
    {
        let self = this;

        self.options.mediaStreamMode = mediaStreamMode;

        if (constraints !== undefined) {
            if (self.options.mediaStreamMode === 'display') {
                self.options.displayMedia.constraints = constraints;
            } else if (self.options.mediaStreamMode === 'user') {
                self.options.userMedia.constraints = constraints;
            }
        }

        self.captureStart();
    },
    /**
     *
     */
    captureStart: function()
    {
        let self = this;

        self.promiseMediaStream = null;

        self.clearStream();

        if (self.options.mediaStreamMode === 'display') {
            self._doDebug("onCaptureStarting",{
                'mediaStreamMode' :  self.options.mediaStreamMode,
                'constraints' :  self.options.displayMedia.constraints,
            });
            self.promiseMediaStream = navigator.mediaDevices.getDisplayMedia(self.options.displayMedia.constraints);
        } else if (self.options.mediaStreamMode === 'user') {
            self._doDebug("onCaptureStarting",{
                'mediaStreamMode' :  self.options.mediaStreamMode,
                'constraints' :  self.options.userMedia.constraints,
            });
            self.promiseMediaStream = navigator.mediaDevices.getUserMedia(self.options.userMedia.constraints);
        } else {
            return;
        }

        self.promiseMediaStream
            .then(function (stream) {
                if (typeof self.options.onCaptureStarted === 'function') {
                    self.options.onCaptureStarted(stream);
                }
                self.setStream(stream);
            })
            .catch(function (e) {
                console.log("TjsMedia("+self.el.id+") - Error: " + e.message);
            });
    },
    /**
     *
     */
    captureStop: function()
    {
        let self = this;

        if (self.promiseMediaStream === null) {
            return;
        }

        self.clearStream();

        self.promiseMediaStream = null;

        self._doDebug("onCaptureStopped");
        if (typeof self.options.onCaptureStopped === 'function') {
            self.options.onCaptureStopped();
        }
    }
}

