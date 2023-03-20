<div class="entry">
    <h3>jsEmailTable</h3>

    <div id="jsEmailTable"></div>

    <div class="clear"></div>
</div>

{literal}
    <script type="text/javascript">
        window.jsGlob.winReady(function()
        {
            let jsEmailDataSource = new TjsDataSource();
            jsEmailDataSource.dataConnector = new TjsEmailJsonDataConnector();
            //jsEmailDataSource.dataConnector = new TjsEmailUrlDataConnector();
            jsEmailDataSource.onDataChangeListener(function(data){
                console.log(data);
            });

            let jsEmailTable = new TjsEmailTable('#jsEmailTable');
            jsEmailTable.dataSource = jsEmailDataSource;
            jsEmailTable.doDataFetch();


        });
    </script>
{/literal}
