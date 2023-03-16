{literal}
    <style>
        .jsRtcPeer {
            width: 650px;
        }

        .jsRtcPeer .container .remote-video {
            z-index: 1;
            display: inline-block;
            position: relative;
            max-width: 640px;
            max-height: 640px;
            height: 100%;
            width: 100%;
            border: 1px solid #333;
        }

        .jsRtcPeer .container .local-video {
            z-index: 2;
            display: inline;
            position: fixed;
            max-width: 90px;
            max-height: 90px;
            height: auto;
            width: 100%;
            margin-top: 10px;
            margin-left: -100px;
            border: 1px solid #e0e0e0;
        }

        .jsRtcPeer .button-container {
            text-align: center;
        }

    </style>
{/literal}

<div class="entry">
    <h3>jsRtcPeer - <span id="rtc_local_peer_uuid"></span></h3>

    <div class="jsRtcPeer">
        <div class="container">
            <video class="remote-video" id="remote_video" autoplay></video>
            <video class="local-video" id="local_video" autoplay muted></video>
        </div>

        <div class="form form-block form-fullwidth">
            <div class="form-element">
                <div class="form-field">
                    <select size="1" id="rtc_remote_peer_uuid"></select>
                </div>
            </div>
        </div>

        <div class="button-container">
            <button class="button button-black" id="capture_change_to_user_media">Capture Change to UserMedia</button>
            <button class="button button-black" id="capture_change_to_display_media">Capture Change to DisplayMedia</button>

            <button class="button button-black" id="connection_open">Open</button>
            <button class="button button-black" id="connection_reopen">ReOpen</button>
            <button class="button button-black" id="connection_close">Close</button>
        </div>
    </div>
</div>

{literal}
    <script type="text/javascript">

        let rtc_local_peer_uuid = document.querySelector('#rtc_local_peer_uuid');
        /**
         *
         * @type { HTMLSelectElement }
         */
        let rtc_remote_peer_uuid = document.querySelector('#rtc_remote_peer_uuid');
        let urlSearchParams = new URLSearchParams(window.location.search);

        let rtcConnection = {
            jsRtcPeer: null,
            remoteJsMedia: null,
            localJsMedia: null,
        };
        /*let rtcConnections = [];
        rtcConnections.push(rtcConnection);

        function findConnection(uuid) {
            return rtcConnections.find((p) => p.jsRtcPeer.getUuid() === uuid);
        }*/

        rtcConnection.jsRtcPeer = new TjsRtcPeer({
            'debugging' : true,
            'onOutgoingMessage' : function(jsonMessage){
                jsWs.sendMessage(jsonMessage);
            },
            'onLocalGetStream' : function(){
                return rtcConnection.localJsMedia.getStream();
            },
            'onLocalGetPromiseMediaStream' : function(){
                return rtcConnection.localJsMedia.getPromiseMediaStream();
            },
            'onRemoteSetStream' : function(stream){
                rtcConnection.remoteJsMedia.setStream(stream);
            },
            'onRemoteClearStream' : function(){
                rtcConnection.remoteJsMedia.clearStream();
            },
            'onRegisteredPeerUuids' : function(uuids){
                let i, L = rtc_remote_peer_uuid.options.length - 1;
                for(i = L; i >= 0; i--) {
                    rtc_remote_peer_uuid.remove(i);
                }
                for(i = 0; i < uuids.length; i++) {
                    const option = document.createElement('option');
                    option.value = uuids[i];
                    option.innerHTML = uuids[i];
                    rtc_remote_peer_uuid.options.add(option);
                }
            },
        });

        rtc_local_peer_uuid.innerHTML = rtcConnection.jsRtcPeer.getRtcLocalPeerUuid();

        rtcConnection.remoteJsMedia = new TjsMedia('remote_video', {
            'debugging': false,
        });

        rtcConnection.localJsMedia = new TjsMedia('local_video', {
            'debugging': false,
            'mediaStreamMode': 'user',//false, 'user' | 'display'
            'onStreamLoaded': function() {

            }
        });

        rtcConnection.localJsMedia.captureStart();

        let jsWs = new TjsWs({
            'debugging' : false,
            'path' : '/ws',
            'onOpened': function(){
                rtcConnection.jsRtcPeer.create();
            },
            'onIncomingMessage': function(jsonMessage, stringMessage){
                rtcConnection.jsRtcPeer.doIncomingMessage(jsonMessage);
            },
            'onClosed': function(){
                rtcConnection.jsRtcPeer.destroy(false);
            },
        });

        window.jsGlob.winReady(function(){

            let capture_change_to_user_media = document.querySelector('#capture_change_to_user_media');
            let capture_change_to_display_media = document.querySelector('#capture_change_to_display_media');
            let connection_open = document.querySelector('#connection_open');
            let connection_reopen = document.querySelector('#connection_reopen');
            let connection_close = document.querySelector('#connection_close');

            capture_change_to_user_media.addEventListener('click', function (){
                rtcConnection.localJsMedia.captureChange('user');
            });

            capture_change_to_display_media.addEventListener('click', function (){
                rtcConnection.localJsMedia.captureChange('display');
            });

            connection_open.addEventListener('click', function (){
                if (jsWs.isOpened()) {
                    rtcConnection.jsRtcPeer.connectTo(rtc_remote_peer_uuid.value);
                }
            });

            connection_reopen.addEventListener('click', function (){
                if (jsWs.isOpened()) {
                    rtcConnection.jsRtcPeer.reConnect();
                }
            });

            connection_close.addEventListener('click', function () {
                if (jsWs.isOpened()) {
                    rtcConnection.jsRtcPeer.disconnect();
                }
            });


        });

    </script>
{/literal}
