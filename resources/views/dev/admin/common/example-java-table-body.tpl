<div class="entry">
    <h3>jsTable</h3>

    <div id="jsTable"></div>

    <div class="clear"></div>
</div>

{literal}
    <script type="text/javascript">
        window.jsGlob.winReady(function(){
            let globalEmailData = [];
            for(let i=1; i <= 100; i++) {
                globalEmailData[globalEmailData.length] = {
                    'id': i,
                    'email': 'email'+i+'@domain.zone',
                };
            }
            let jsTable = new TjsTable('jsTable', {
                'requestUri' : '/admin/common/example-java-styled-table/id-email-table',
                /*'requestUri' : function(params) {
                    console.log(params);

                    let data = [];

                    for(let i=1; i <= 2; i++) {
                        data[data.length] = {
                            'id': i,
                            'email': 'email'+i+'@domain.zone',
                        };
                    }

                    return js_json_ok({
                        'query' : params,
                        'data' :  data,
                    });
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
                    console.log(row);
                },
            });

            jsTable.open();
        });

    </script>
{/literal}
