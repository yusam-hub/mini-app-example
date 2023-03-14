<div class="entry">
    <h3>jsTable</h3>

    <div id="jsTable"></div>

    <div class="clear"></div>
</div>

{literal}
    <script type="text/javascript">
        window.jsGlob.winReady(function(){

            let jsTable = new TjsTable('jsTable', {
                'requestUri' : '/admin/common/example-java-styled-table/id-email-table',
                /*'requestUri' : function(settings, query) {
                    jsTable.setData(settings, query, [
                        {
                            'id': 1,
                            'title': 'Title 1',
                        },
                        {
                            'id': 2,
                            'title': 'Title 2',
                        },
                        {
                            'id': 3,
                            'title': 'Title 3',
                        },
                    ]);
                },*/
                'onDrawPanelCenter': function(td){
                    let button = document.createElement('a');
                    button.classList.add('button');
                    button.classList.add('button-black');
                    button.innerHTML = "Append";
                    button.addEventListener('click', function () {
                        alert('test');
                    })
                    td.append(button);
                },
                'fields' : [
                    {
                        'width' : '20%',
                        'fieldName' : 'id',
                        'fieldLabel' : 'ID',
                        'filter': {
                            'type': 'select',
                            'options': [
                                {'value': '', 'innerHTML' : ''},
                                {'value': '1', 'innerHTML' : 'ID 1'},
                                {'value': '2', 'innerHTML' : 'ID 2'},
                            ],
                        },
                        'onDrawDataCell': function(td, row){},
                        'onDrawFooterCell': function(td, rows){},
                    },
                    {
                        'fieldName' : 'email',
                        'fieldLabel' : 'E-mail',
                        'filter': {
                            'type': 'text',
                        },
                        'onDrawDataCell': function(td, row){},
                        'onDrawFooterCell': function(td, rows){},
                    },
                    {
                        'width' : '1%',
                        'fieldName' : '',
                        'fieldLabel' : '&nbsp;',
                        'onDrawDataCell': function(td, row){
                            td.innerHTML = '';
                            let a = document.createElement('a');
                            a.classList.add('button');
                            a.classList.add('button-black');
                            a.innerHTML = '...';
                            a.href="#";
                            a.addEventListener('click', function (){
                                alert('test');
                            });
                            td.append(a);
                        },
                        'onDrawFooterCell': function(td, rows){},
                    }
                ],
                'onRowSelected': function(row){
                    //console.log(row);
                },
            });

            jsTable.open();
        });

    </script>
{/literal}
