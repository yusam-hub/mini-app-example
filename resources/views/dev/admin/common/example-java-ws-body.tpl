<div class="entry">

</div>

{literal}
    <script type="text/javascript">

        window.jsGlob.winReady(function(){

            new WebSocket('ws://mini-app-example-8074.loc/ws/');
            new WebSocket('ws://localhost:8074/ws/');
            new WebSocket('ws://127.0.80.74/ws/');


            /*let jsWs = new TjsWs({
                'debugging' : true,
                'path' : '/ws/',
                'onOpened': function(){

                },
                'onIncomingMessage': function(jsonMessage, stringMessage){

                },
                'onClosed': function(){

                },
            });*/

        });

    </script>
{/literal}
