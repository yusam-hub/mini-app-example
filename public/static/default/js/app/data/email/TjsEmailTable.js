"use strict";

class TjsEmailTable extends TjsTable
{
    constructor(selectorOrEl)
    {
        let options = {
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
        };
        super(selectorOrEl, options);
    }

}