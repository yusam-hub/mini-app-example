window.jsGlob = new TjsGlob();
window.jsWait = new TjsWait();

console.log("appLoaded");

window.jsGlob.domLoaded(function(){
    console.log("domLoaded");
});

window.jsGlob.winReady(function(){
    console.log("winReady");
    window.jsWait.show(0);
});

/*
window.jsLocale = 'en';

window.TjsDeviceUUID = require('device-uuid').DeviceUUID;
window.jsDeviceUUID = new TjsDeviceUUID();
window.jsCookie = new TjsCookie();
window.jsYusam = new TjsYusam(jsDeviceUUID);
window.jsWait = new TjsWait(window.jsYusam);
window.jsPost = new TjsPost(window.jsYusam, window.jsWait);
window.jsMsg = new TjsMsg(window.jsYusam, window.jsPost);

window.TjsAppContentBody = TjsAppContentBody;
window.TjsAppCenteredBody = TjsAppCenteredBody;
window.TjsTabs = TjsTabs;
window.TjsToggles = TjsToggles;
window.TjsWidget = TjsWidget;
window.TjsPaginator = TjsPaginator;
window.TjsStyledTable = TjsStyledTable;
window.TjsForm = TjsForm;
window.TjsTable = TjsTable;
window.TjsMsgCropper = TjsMsgCropper;
window.TjsWs = TjsWs;
window.TjsMedia = TjsMedia;
window.TjsRtcPeer = TjsRtcPeer;*/
