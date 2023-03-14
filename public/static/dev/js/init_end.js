window.jsGlob = new TjsGlob();
window.jsCookie = new TjsCookie();
window.jsWait = new TjsWait();
window.jsPost = new TjsPost();


console.log("appLoaded");

window.jsGlob.domLoaded(function(){
    console.log("domLoaded");
});

window.jsGlob.winReady(function(){
    console.log("winReady");
   /* window.jsPost.request('/ajax/test?q=1',{'key1':'val1'}, function (statusCode, response, headers){
        console.log(statusCode, response);

    });*/
});