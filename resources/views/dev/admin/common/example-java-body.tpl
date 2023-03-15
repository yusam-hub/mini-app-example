<div class="entry">
    <h3>TjsToggles</h3>

    <div class="toggles jsToggles">

        <div class="toggle">
            <h4 class="toggle-header ">Toggle One</h4>

            <div class="toggle-box">
                <p class="ta_j">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>

        <div class="toggle">
            <h4 class="toggle-header ">Toggle Two</h4>

            <div class="toggle-box">
                <p class="ta_j">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>

        <div class="toggle">
            <h4 class="toggle-header ">Toggle Three</h4>

            <div class="toggle-box">
                <p class="ta_j">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    </div>

    <div class="clear"></div>

    <div class="h-sep-1"></div>

    <h3>TjsTabs</h3>

    <div class="jsTabs">

        <ul class="tabs-nav-h">
            <li class="active"><a >One</a></li>
            <li><a >Two</a></li>
            <li><a >Three</a></li>
        </ul>

        <div class="tabs">
            <!-- tab 1 -->
            <div class="tab">
                <div class="tab-inner">
                    <p class="ta_j">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
                </div>
            </div>

            <!-- tab 2 -->
            <div class="tab">
                <div class="tab-inner">
                    <p class="ta_j">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p class="ta_j">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
                </div>
            </div>

            <!-- tab 3 -->
            <div class="tab">
                <div class="tab-inner">
                    <p class="ta_j">Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio.</p>
                </div>
            </div>
        </div>

    </div>

    <div class="h-sep-1"></div>

    <h3>TjsWait</h3>
    <p><button class="button button-black" id="button_js_wait">Show (5 sec)</button></p>

    <h3>TjsMsg</h3>
    <p><button class="button button-black" id="dialogInfo">Info</button></p>
    <p><button class="button button-black" id="dialogSuccess">Success</button></p>
    <p><button class="button button-black" id="dialogError">Error</button></p>
    <p><button class="button button-black" id="dialogWarning">Warning</button></p>
    <p><button class="button button-black" id="dialogConfirm">Confirm</button></p>
    <p><button class="button button-black" id="dialogDeleteConfirm">Delete Confirm</button></p>

    <div class="clear"></div>
</div>

{literal}
<script type="text/javascript">

    window.jsGlob.winReady(function(){

        new TjsTabs('.jsTabs');

        new TjsToggles('.jsToggles');

        document.querySelector("#button_js_wait").addEventListener('click', function (e){
            window.jsWait.show(5);
        });
        document.querySelector("#dialogInfo").addEventListener('click', function (e){
            window.jsMsg.dialogInfo(this.innerHTML);
        });
        document.querySelector("#dialogSuccess").addEventListener('click', function (e){
            window.jsMsg.dialogSuccess(this.innerHTML);
        });
        document.querySelector("#dialogError").addEventListener('click', function (e){
            window.jsMsg.dialogError(this.innerHTML);
        });
        document.querySelector("#dialogWarning").addEventListener('click', function (e){
            window.jsMsg.dialogWarning(this.innerHTML);
        });
        document.querySelector("#dialogConfirm").addEventListener('click', function (e){
            window.jsMsg.dialogConfirm(this.innerHTML);
        });
        document.querySelector("#dialogDeleteConfirm").addEventListener('click', function (e){
            window.jsMsg.dialogDeleteConfirm(this.innerHTML);
        });

        /*const vertical_menu = document.getElementById('vertical_menu');

        if (vertical_menu) {

            const verticalMenuActive = vertical_menu.querySelector('.vertical-menu-active');
            if (verticalMenuActive) {
                verticalMenuActive.scrollIntoView({block: "center", inline: "center"});
            }

            const resizeObserver = new ResizeObserver(() => {
                const verticalMenuActive = vertical_menu.querySelector('.vertical-menu-active');
                if (verticalMenuActive) {
                    verticalMenuActive.scrollIntoView({block: "center", inline: "center"});
                }
            });

            resizeObserver.observe(vertical_menu);
        }*/

    });

</script>
{/literal}
