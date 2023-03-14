<div class="entry">
    <h3>jsPaginator</h3>

    <div id="jsPaginator"></div>

    <div class="clear"></div>

    <div class="h-sep-1"></div>

    <h3>jsStyledTable</h3>

    <div id="jsStyledTable"></div>
</div>

{literal}
    <script type="text/javascript">
        window.jsGlob.winReady(function(){

            let jsStyledTable = new TjsStyledTable('jsStyledTable',{
                'header': {
                    'id' : {
                        'onHeaderRender' : function(key, th){

                        },
                        'onRowRender' : function(key, td, index, row){

                        },
                    },
                    'email' : {
                        'onHeaderRender' : function(key, th){

                        },
                        'onRowRender' : function(key, td, index, row){

                        },
                    }
                },
            });

            let jsPaginator = new TjsPaginator('jsPaginator',{
                'requestUri' : '/admin/common/example-java-styled-table/id-email-table',
                'requestOnCreate': true,
                'onPaginatorChanged': function(page, limit, rows) {
                    console.log('onPaginatorChanged', page, limit, rows);
                    jsStyledTable.changeRows(rows);
                }
            });
        });

    </script>
{/literal}
