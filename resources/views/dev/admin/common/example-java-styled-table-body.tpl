<div class="entry">
    <h3>jsPaginator</h3>

    <div id="jsPaginator"></div>

    <div class="clear"></div>

    <div class="h-sep-1"></div>

    <h3>jsEmailStyledTable</h3>

    <div id="jsEmailStyledTable"></div>
</div>

{literal}
    <script type="text/javascript">
        window.jsGlob.winReady(function(){

            let jsEmailDataSource = new TjsDataSource();
            //jsEmailDataSource.dataConnector = new TjsEmailJsonDataConnector(jsEmailDataSource);
            jsEmailDataSource.dataConnector = new TjsEmailUrlDataConnector(jsEmailDataSource);

            let jsEmailStyledTable = new TjsEmailStyledTable('#jsEmailStyledTable');
            jsEmailStyledTable.dataSource = jsEmailDataSource;

            let jsPaginator = new TjsPaginator('#jsPaginator');
            jsPaginator.dataSource = jsEmailDataSource;
            jsPaginator.change();

            //jsEmailDataSource.doDataFetch();
        });

    </script>
{/literal}
