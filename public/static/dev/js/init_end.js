window.jsGlob = new TjsGlob();
window.jsWait = new TjsWait(window.jsGlob);
window.jsPost = new TjsPost(window.jsWait);
window.jsMsg = new TjsMsg();

/*
let jsInterval = new TjsInterval(1000, function(){
    console.log('tick', this.tickCounter);
    if (this.tickCounter >= 5) {
        this.stop();
    }
});

jsInterval.start();*/

let jsCountdown = new TjsCountdown(
    5,
    function (jsCountdown){
        console.log("finished");
    },
    function (jsCountdown){
        console.log('tick', jsCountdown.formatDateTime());
    });

jsCountdown.start();

