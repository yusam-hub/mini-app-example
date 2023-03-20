"use strict";
class TjsEmailStyledTable extends TjsStyledTable
{
    constructor(selectorOrEl) {
        let options = {
            'header': {
                'id': {
                    'onHeaderRender': function (key, th) {

                    },
                    'onRowRender': function (key, td, index, row) {

                    },
                },
                'email': {
                    'onHeaderRender': function (key, th) {

                    },
                    'onRowRender': function (key, td, index, row) {

                    },
                }
            }
        };

        super(selectorOrEl, options);
    }

    convertDataToRowsOnDataChangeListener(data)
    {
        return data.data;
    }
}
