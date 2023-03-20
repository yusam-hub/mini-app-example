"use strict";

class TjsStyledTable extends TjsBase
{
    #dataSource;
    #el;
    constructor(selectorOrEl, options = {})
    {
        let defOptions = {
            'header': {
                /*'id' : {
                    'onHeaderRender' (key, th){},
                    'onRowRender' (key, td, index, row){},
                },
                'title' : {
                    'onHeaderRender' (key, th){},
                    'onRowRender' (key, td, index, row){},
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
        super(js_object_merge_deep(defOptions, options));

        if (typeof selectorOrEl === "string") {
            this.#el = document.querySelector(selectorOrEl);
        } else {
            this.#el = selectorOrEl;
        }

        this.#init();
    }

    get dataSource()
    {
        return this.#dataSource;
    }

    set dataSource(dataSource)
    {
        let self = this;

        self.#dataSource = dataSource;
        if (!(self.#dataSource instanceof TjsDataSource)) {
            throw Error("Invalid dataSource");
        }
        self.#dataSource.onDataChangeListener(function (data){
            self.changeRows(self.convertDataToRowsOnDataChangeListener(data));
        });
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    convertDataToRowsOnDataChangeListener(data)
    {
        return data;
    }

    #init()
    {
        let self = this;

        self.#el.classList.add('styled-table');
        self.#reRender(true);
    }
    /**
     *
     * @private
     */
    #reRender(isCreating = false)
    {
        let self = this;

        while (self.#el.firstChild) {
            self.#el.removeChild(self.#el.lastChild);
        }

        self.#createElements();

        if (typeof(self.options.onRowsChanged) === "function" && self.options.rows.length > 0) {
            self.options.onRowsChanged(self.options.rows, isCreating);
        }
    }
    /**
     *
     * @private
     */
    #createElements()
    {
        let self = this,
            table;

        table = document.createElement('table');
        table.classList.add('width-100-percent');

        self.#renderHeaders(table);

        self.#renderRows(table);

        self.#el.append(table);
    }
    /**
     *
     * @param table
     * @private
     */
    #renderHeaders(table)
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
    }
    /**
     *
     * @param table
     * @private
     */
    #renderRows(table)
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
    }
    /**
     *
     */
    changeRows(rows)
    {
        let self = this;
        self.options.rows = rows;
        self.#reRender();
    }
}
