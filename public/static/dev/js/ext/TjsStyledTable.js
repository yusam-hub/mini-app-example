let TjsStyledTable = function(tagId, options = {}) {

    this.jsYusam = window.jsYusam;

    this.jsPost = window.jsPost;

    let defOptions = {
        'header': {
            /*'id' : {
                'onHeaderRender' : function(key, th){},
                'onRowRender' : function(key, td, index, row){},
            },
            'title' : {
                'onHeaderRender' : function(key, th){},
                'onRowRender' : function(key, td, index, row){},
            },*/
        },
        'rows' : [

        ],
        'onHeaderRender': function(trH, rows){
            //console.log(trH, rows);
        },
        'onFooterRender': function(table, headers, rows){
            //console.log(table, headers, rows);
        },
        'onRowsChanged': function(rows, isCreating){
            //console.log(rows);
        }
    };

    this.options = this.jsYusam.mergeDeep(defOptions, options);

    this.el = document.getElementById(tagId);

    this._init();
};

TjsStyledTable.prototype = {

    _init: function()
    {
        let self = this;

        self.el.classList.add('styled-table');
        self._reRender(true);
    },
    /**
     *
     * @private
     */
    _reRender: function(isCreating = false)
    {
        let self = this;

        while (self.el.firstChild) {
            self.el.removeChild(self.el.lastChild);
        }

        self._createElements();

        if (typeof(self.options.onRowsChanged) === "function" && self.options.rows.length > 0) {
            self.options.onRowsChanged(self.options.rows, isCreating);
        }
    },
    /**
     *
     * @private
     */
    _createElements: function()
    {
        let self = this,
            table;

        table = document.createElement('table');
        table.classList.add('width-100-percent');

        self._renderHeaders(table);

        self._renderRows(table);

        self.el.append(table);
    },
    /**
     *
     * @param table
     * @private
     */
    _renderHeaders: function(table)
    {
        let self = this, th;

        let trH = document.createElement('tr');
        trH.classList.add('thead');

        if (self.options.header !== undefined) {
            for (const [key, item] of Object.entries(self.options.header)) {
                th = document.createElement('th');
                th.innerHTML = key;
                if (typeof (item.onHeaderRender) === "function") {
                    item.onHeaderRender(key, th);
                }

                trH.append(th);
            }
        }

        if (typeof(self.options.onHeaderRender) === "function") {
            self.options.onHeaderRender(trH, self.options.rows);
        }

        table.append(trH);
    },
    /**
     *
     * @param table
     * @private
     */
    _renderRows: function(table)
    {
        let self = this, trRow, td;

        for(let i=0; i < self.options.rows.length; i++) {
            trRow = document.createElement('tr');
            trRow.classList.add('trow');
            for (const [key, item] of Object.entries(self.options.header)) {
                td = document.createElement('td');
                td.innerHTML = self.options.rows[i][key];
                if (typeof(item['onRowRender']) === "function") {
                    item['onRowRender'](key, td, i, self.options.rows[i]);
                }

                trRow.append(td);
            }
            table.append(trRow);
        }
    },
    /**
     *
     */
    changeRows: function(rows)
    {
        let self = this;
        self.options.rows = rows;
        self._reRender();
    },
}

export default TjsStyledTable;
