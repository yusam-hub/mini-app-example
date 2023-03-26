"use strict";

class TjsTable extends TjsBase
{
    #dataSource;
    #el;
    #tableData;
    #selectedRowIndex;
    #dataRowsQuery;
    #dataRowsQueryFilter;
    #dataRows;
    constructor(selectorOrEl, options = {})
    {
        let defOptions = {
            'initLocationSearch': true,
            'replaceHistorySearch': true,
            'onDrawPanelCenter': function(td){},
            'fields' : [
                /*{
                    'width' : '20%',
                    'fieldName' : 'id',
                    'fieldLabel' : 'ID',
                    'filter': {
                        'type': 'text',
                    },
                    'onDrawDataCell': function(td, row){},
                    'onDrawFooterCell': function(td, rows){},
                },
                {
                    'fieldName' : 'title',
                    'fieldLabel' : 'Title',
                    'filter': {
                        'type': 'select',
                        'options': [
                            {'value': '', 'innerHTML' : ''},
                            {'value': '1', 'innerHTML' : 'label 1'},
                            {'value': '2', 'innerHTML' : 'label 2'},
                        ],
                    },
                    'onDrawDataCell': function(td, row){},
                    'onDrawFooterCell': function(td, rows){},
                },
                {
                    'width' : '1%',
                    'fieldName' : '',
                    'fieldLabel' : '&nbsp;',
                    'onDrawDataCell': function(td, row){},
                    'onDrawFooterCell': function(td, rows){},
                }*/
            ],
            'onRowSelected': function(row){},
            'settings' : {
                'limitList': [1,5,15,30,60],
                'sortDirectionAscArrow': '&darr;',
                'sortDirectionDescArrow': '&uarr;',
                'hoverEnabled' : true,
                'selectedRowEnabled': true,
                'renderPanelTable': true,
            },
        };

        super(js_object_merge_deep(defOptions, options));

        if (typeof selectorOrEl === "string") {
            this.el = document.querySelector(selectorOrEl);
        } else {
            this.el = selectorOrEl;
        }

        this.#tableData = undefined;
        this.#selectedRowIndex = -1;
        this.#dataRowsQuery = {
            'page': 1,
            'limit': 15,
            'sortFieldName': '',
            'sortDirection': 'asc',
        };

        this.#dataRowsQueryFilter = {};

        this.#dataRows= [
            /*{
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
            },*/
        ];

        this.#init();
    };

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
            if (!(typeof data === "undefined")) {
                self.setData(data.query, data.data);
            } else {
                self.setData({},[]);
            }
        });
    }

    #init()
    {
        let self = this;

        self.el.classList.add('TjsTable_container');

        if (this.options.initLocationSearch === true) {
            let urlSearchParams = new URLSearchParams(window.location.search);
            this.#dataRowsQuery.page = parseInt(urlSearchParams.get('page')) || this.#dataRowsQuery.page;
            this.#dataRowsQuery.limit = parseInt(urlSearchParams.get('limit')) || this.#dataRowsQuery.limit;
            this.#dataRowsQuery.sortFieldName = urlSearchParams.get('sortFieldName') || '';
            this.#dataRowsQuery.sortDirection = urlSearchParams.get('sortDirection') || 'asc';
            if (!(['asc','desc'].jsInArray(this.#dataRowsQuery.sortDirection))) {
                this.#dataRowsQuery.sortDirection = 'asc';
            }
            if (!this.options.settings.limitList.jsInArray(this.#dataRowsQuery.limit)) {
                this.#dataRowsQuery.limit = this.options.settings.limitList[0];
            }

            this.#dataRowsQueryFilter = urlSearchParams.getObject('filter');
        }

        self.#reRender(true);
    }

    /**
     *
     * @returns {number}
     * @private
     */
    #getSelectedRowIndexFromUrlSearch(defValue = -1)
    {
        if (this.options.initLocationSearch === true) {
            let urlSearchParams = new URLSearchParams(window.location.search);
            return parseInt(urlSearchParams.get('selectedRowIndex')) || defValue;
        }
        return defValue;
    }
    /**
     *
     * @private
     */
    #doReplaceHistorySearch()
    {
        let self = this;

        if (self.options.replaceHistorySearch === true) {
            let urlSearchParams = new URLSearchParams(window.location.search);
            urlSearchParams.set('page', self.#dataRowsQuery.page);
            urlSearchParams.set('limit', self.#dataRowsQuery.limit);
            urlSearchParams.set('sortFieldName', self.#dataRowsQuery.sortFieldName);
            urlSearchParams.set('sortDirection', self.#dataRowsQuery.sortDirection);
            urlSearchParams.set('selectedRowIndex', ''+self.getSelectedRowIndex());
            for (const [key, value] of Object.entries(self.#dataRowsQueryFilter)) {
                urlSearchParams.set('filter['+key+']', value);
            }
            window.history.replaceState(null, null, '?'+urlSearchParams.toString());
        }
    }
    /**
     *
     * @private
     */
    #reRender(isCreating = false)
    {
        let self = this;

        while (self.el.firstChild) {
            self.el.removeChild(self.el.lastChild);
        }

        self.#createElements();
    }
    /**
     *
     * @private
     */
    #createElements()
    {
        let self = this;

        self.#renderPanelTable();

        self.#renderDataTable();
    }
    /**
     *
     * @private
     */
    #renderPanelTable()
    {
        let self = this;
        if (self.options.settings.renderPanelTable !== true) return;

        let table, tr;

        table = document.createElement('table');
        table.classList.add('TjsTable_panel');
        tr = document.createElement('tr');

        self.#renderPanelTableLeft(tr);
        self.#renderPanelTableCenter(tr);
        self.#renderPanelTableRight(tr);

        table.append(tr);
        self.el.append(table);
    }
    /**
     *
     * @private
     */
    #clearDataTableSortDirections()
    {
        let self = this;
        let headerTds = self.#tableData.querySelectorAll('thead > .header > td');
        for(let i=0; i < headerTds.length; i++) {
            headerTds[i].innerHTML = headerTds[i].getAttribute('data-field-label');
            headerTds[i].setAttribute('data-sort-direction', '');
        }
    }
    /**
     *
     * @param tr
     * @private
     */
    #renderPanelTableLeft(tr)
    {
        let self = this;

        let td = document.createElement('td');
        td.classList.add('TjsTable_panel_left');

        let resetButton = document.createElement('input');
        resetButton.type = 'button';
        resetButton.value = '(-)';
        resetButton.addEventListener('click', function(ev){
            self.reset();
        });
        td.append(resetButton);

        let prevButton = document.createElement('input');
        prevButton.type = 'button';
        prevButton.value = '<';
        prevButton.addEventListener('click', function(ev){
            self.#changeDataRowsQuery('page', self.#dataRowsQuery.page - 1);
        });
        td.append(prevButton);

        let pageInput = document.createElement('input');
        pageInput.type = 'text';
        pageInput.size = 5;
        pageInput.value = self.#dataRowsQuery.page;
        pageInput.addEventListener('keydown', function (ev) {
            if ((ev.key === 'Enter')/* || (ev.key === 'Escape') || (ev.key === 'Tab')*/)
            {
                self.#changeDataRowsQuery('page', parseInt(this.value) || 1);
            }
        })
        td.append(pageInput);

        let nextButton = document.createElement('input');
        nextButton.type = 'button';
        nextButton.value = '>';
        nextButton.addEventListener('click', function(ev){
            self.#changeDataRowsQuery('page', self.#dataRowsQuery.page + 1);
        });
        td.append(nextButton);

        tr.append(td);
    }
    /**
     *
     * @param tr
     * @private
     */
    #renderPanelTableCenter(tr)
    {
        let self = this;

        let td = document.createElement('td');
        td.classList.add('TjsTable_panel_center');
        td.innerHTML = '&nbsp;';

        tr.append(td);

        if (typeof self.options.onDrawPanelCenter === 'function') {
            typeof self.options.onDrawPanelCenter(td);
        }
    }
    /**
     *
     * @param tr
     * @private
     */
    #renderPanelTableRight(tr)
    {
        let self = this;

        let td = document.createElement('td');
        td.classList.add('TjsTable_panel_right');

        let rowsOnPage = document.createElement('input');
        rowsOnPage.type = 'text';
        rowsOnPage.readOnly = true;
        rowsOnPage.value = self.#dataRows.length;
        rowsOnPage.size = 5;
        td.append(rowsOnPage);

        let pageLimit = document.createElement('select');
        pageLimit.size = 1;
        for(let i=0; i < self.options.settings.limitList.length; i++) {
            let option = document.createElement('option');
            option.value = self.options.settings.limitList[i];
            option.innerHTML = self.options.settings.limitList[i];
            option.selected = self.options.settings.limitList[i] === self.#dataRowsQuery.limit;
            pageLimit.options.add(option);
        }
        pageLimit.addEventListener('change', function (){
            self.#changeDataRowsQuery('limit', parseInt(this.value) || 1);
        });

        td.append(pageLimit);

        tr.append(td);
    }
    /**
     *
     * @private
     */
    #renderDataTable()
    {
        let self = this;

        self.#tableData = document.createElement('table');
        self.#tableData.classList.add('TjsTable_data');

        self.#renderDataTableHeaders(self.#tableData);

        let tbody = document.createElement('tbody');
        self.#tableData.append(tbody);

        //self.#renderDataTableRows();

        self.#renderDataTableFooters(self.#tableData);

        self.el.append(self.#tableData);
    }
    /**
     *
     * @param table
     * @private
     */
    #renderDataTableHeaders(table)
    {
        let self = this;
        let thead = document.createElement('thead');
        let tr, td;

        tr = document.createElement('tr');
        tr.classList.add('header');
        for(let i=0; i < self.options.fields.length; i++) {
            td = document.createElement('td');
            td.innerHTML = self.options.fields[i].fieldLabel;
            if (self.options.fields[i].width !== undefined) {
                td.width = self.options.fields[i].width;
            }
            td.setAttribute('data-field-label', self.options.fields[i].fieldLabel);
            td.setAttribute('data-field-name', self.options.fields[i].fieldName);
            td.setAttribute('data-sort-direction', '');
            td.addEventListener('click', function (){
                if (this.getAttribute('data-field-name') !== '') {
                    if (this.getAttribute('data-sort-direction') === '' || this.getAttribute('data-sort-direction') === 'desc') {
                        this.setAttribute('data-sort-direction','asc');
                    } else {
                        this.setAttribute('data-sort-direction','desc');
                    }

                    self.#changeDataRowsQueries({
                        'sortFieldName': this.getAttribute('data-field-name'),
                        'sortDirection': this.getAttribute('data-sort-direction'),
                    });
                }
            });

            tr.append(td);
        }
        thead.append(tr);

        tr = document.createElement('tr');
        tr.classList.add('filter');
        for(let i=0; i < self.options.fields.length; i++) {
            td = document.createElement('td');

            if (typeof self.options.fields[i].filter === 'object') {
                if (self.options.fields[i].filter.type === 'text') {
                    let filterInput = document.createElement('input');
                    filterInput.type = 'text';
                    if (typeof self.#dataRowsQueryFilter[self.options.fields[i].fieldName] !== 'undefined') {
                        filterInput.value = self.#dataRowsQueryFilter[self.options.fields[i].fieldName];
                    }
                    filterInput.setAttribute('data-field-name', self.options.fields[i].fieldName);
                    filterInput.addEventListener("keydown", function (ev){
                        if (ev.key === 'Enter') {
                            self.#changeQuery(this.getAttribute('data-field-name'), this.value);
                        }
                    });
                    td.append(filterInput);
                }
                else if (self.options.fields[i].filter.type === 'select') {
                    let filterSelect = document.createElement('select');
                    filterSelect.size = 1;
                    filterSelect.setAttribute('data-field-name', self.options.fields[i].fieldName);
                    for(let o=0; o < self.options.fields[i].filter.options.length; o++) {
                        let option = document.createElement('option');
                        option.value = self.options.fields[i].filter.options[o].value;
                        option.innerHTML = self.options.fields[i].filter.options[o].innerHTML;
                        filterSelect.options.add(option);
                    }
                    if (typeof self.#dataRowsQueryFilter[self.options.fields[i].fieldName] !== 'undefined') {
                        filterSelect.value = self.#dataRowsQueryFilter[self.options.fields[i].fieldName];
                    }
                    filterSelect.addEventListener('change', function (){
                        self.#changeQuery(this.getAttribute('data-field-name'), this.value);
                    });
                    td.append(filterSelect);
                }
            } else {
                td.innerHTML = '&nbsp;';
            }
            tr.append(td);
        }
        thead.append(tr);

        table.append(thead);
    }
    /**
     *
     * @private
     */
    #renderDataTableRows()
    {
        let self = this;

        let tbody = self.#tableData.getElementsByTagName('tbody')[0];

        while (tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        let tr, td;
        for(let r=0; r < self.#dataRows.length; r++)
        {
            tr = document.createElement('tr');
            tr.setAttribute('data-index', r);
            if (self.options.settings.hoverEnabled !== true) {
                tr.classList.add('hover-disabled');
            }
            for(let i=0; i < self.options.fields.length; i++)
            {
                td = document.createElement('td');
                if (self.options.fields[i].fieldName !== '') {
                    td.innerHTML = self.#dataRows[r][self.options.fields[i].fieldName];
                } else {
                    td.innerHTML = '&nbsp;';
                }
                if (typeof self.options.fields[i].onDrawDataCell === 'function') {
                    typeof self.options.fields[i].onDrawDataCell(td, self.#dataRows[r]);
                }
                tr.append(td);
            }
            tr.addEventListener('click', function (){
                self.#selectRowIndex(parseInt(this.getAttribute('data-index')) || 0);
            });

            tbody.append(tr);
        }

        let tfoot = self.#tableData.getElementsByTagName('tfoot')[0];
        let tds = tfoot.querySelectorAll('tr > td');
        if (tds.length === self.options.fields.length) {
            for (let i = 0; i < self.options.fields.length; i++) {
                if (typeof self.options.fields[i].onDrawFooterCell === 'function') {
                    typeof self.options.fields[i].onDrawFooterCell(tds[i], self.#dataRows);
                }
            }
        }

        if (self.#dataRows.length > 0) {
            let indexFromUrl = self.#getSelectedRowIndexFromUrlSearch();
            if (indexFromUrl >= 0) {
                self.#selectRowIndex(indexFromUrl);
            } else {
                self.#selectRowIndex(0);
            }
        } else {
            self.#selectRowIndex(-1);
        }

        if (self.options.settings.renderPanelTable === true) {
            self.el.querySelector('.TjsTable_panel_left > input[type="text"]').value = self.#dataRowsQuery.page;
            self.el.querySelector('.TjsTable_panel_right > input').value = self.#dataRows.length;
            self.el.querySelector('.TjsTable_panel_right > select').value = self.#dataRowsQuery.limit;
        }

        self.#changeHeaderSortRender(self.#dataRowsQuery.sortFieldName, self.#dataRowsQuery.sortDirection);
    }
    /**
     *
     * @param fieldName
     * @param sortDirection
     * @private
     */
    #changeHeaderSortRender(fieldName, sortDirection)
    {
        let self = this;
        self.#clearDataTableSortDirections();

        if (fieldName !== '') {

            let headerTds = self.#tableData.querySelectorAll('thead > .header > td');
            for(let i=0; i < headerTds.length; i++) {
                if (headerTds[i].getAttribute('data-field-name') === fieldName) {
                    if (sortDirection === 'desc') {
                        headerTds[i].innerHTML = headerTds[i].getAttribute('data-field-label') + ' ' + self.options.settings.sortDirectionDescArrow;
                    } else {
                        headerTds[i].innerHTML = headerTds[i].getAttribute('data-field-label') + ' ' + self.options.settings.sortDirectionAscArrow;
                    }
                    headerTds[i].setAttribute('data-sort-direction', sortDirection);
                }
            }

        }
    }
    /**
     *
     * @param index
     * @private
     */
    #selectRowIndex(index)
    {
        let self = this;

        let oldSelectedRowIndex = self.#selectedRowIndex;

        self.#selectedRowIndex = -1;
        if (self.#dataRows.length > index && index >= 0) {
            self.#selectedRowIndex = index;
        } else {
            if (typeof self.options.onRowSelected === 'function') {
                self.options.onRowSelected(undefined);
            }
        }

        self.#doReplaceHistorySearch();

        let tbody = self.#tableData.getElementsByTagName('tbody')[0];
        let trs = tbody.getElementsByTagName('tr');
        for(let i=0; i < trs.length; i++) {
            trs[i].classList.remove('selected');
            if (self.#selectedRowIndex === i && self.options.settings.selectedRowEnabled === true) {
                trs[i].classList.add('selected');
                if (oldSelectedRowIndex !== self.#selectedRowIndex) {
                    if (typeof self.options.onRowSelected === 'function') {
                        self.options.onRowSelected(self.#dataRows[self.#selectedRowIndex]);
                    }
                }
            }
        }
    }
    /**
     *
     * @param table
     * @private
     */
    #renderDataTableFooters(table)
    {
        let self = this;
        let tfoot = document.createElement('tfoot');
        let tr = document.createElement('tr');
        let td;
        for(let i=0; i < self.options.fields.length; i++) {
            td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            tr.append(td);
        }
        tfoot.append(tr);
        table.append(tfoot);
    }
    /**
     *
     * @param fieldName
     * @param fieldValue
     * @private
     */
    #changeDataRowsQuery(fieldName, fieldValue)
    {
        let self = this;
        self.#selectedRowIndex = -1;
        self.#dataRowsQuery[fieldName] = fieldValue;
        self.#doDataFetch();
    }
    /**
     *
     * @param values
     * @private
     */
    #changeDataRowsQueries(values = {})
    {
        let self = this;
        self.#selectedRowIndex = -1;
        self.#dataRowsQuery = js_object_merge_deep(self.#dataRowsQuery, values);
        self.#doDataFetch();
    }
    /**
     *
     * @param fieldName
     * @param fieldValue
     * @private
     */
    #changeQuery(fieldName, fieldValue)
    {
        let self = this;
        self.#selectedRowIndex = -1;
        self.#dataRowsQueryFilter[fieldName] = fieldValue;
        self.#doDataFetch();
    }
    /**
     *
     * @param rows
     */
    #changeRows(rows = [])
    {
        let self = this;
        self.#selectedRowIndex = -1;
        self.#dataRows = rows;
        self.#renderDataTableRows();
    }
    /**
     *
     * @private
     */
    #doDataFetch()
    {
        let self = this;

        let params = self.#dataRowsQuery;
        params['filter'] = self.#dataRowsQueryFilter;

        self.#dataSource.doDataFetch(params);
    }
    /**
     *
     * @param query
     * @param rows
     */
    setData(query = {}, rows = [])
    {
        let self = this;

        self.#dataRowsQuery = js_object_merge_deep(self.#dataRowsQuery, {
            'page' : parseInt(query.page) || 1,
            'limit': parseInt(query.limit) || 1,
            'sortFieldName': query.sortFieldName,
            'sortDirection': query.sortDirection,
        });
        self.#dataRowsQueryFilter = js_object_merge_deep(self.#dataRowsQueryFilter, query.filter);

        self.#changeRows(rows);
    }
    /**
     *
     * @param query
     */
    open(query = {})
    {
        let self = this;
        self.#dataRowsQueryFilter = js_object_merge_deep(self.#dataRowsQueryFilter, query);
        self.#doDataFetch();
    }
    /**
     *
     */
    reset()
    {
        let self = this;

        self.#clearDataTableSortDirections();

        let inputs = self.#tableData.querySelectorAll('thead > .filter > td > input[type="text"]');
        for(let i=0; i < inputs.length; i++) {
            inputs[i].value = '';
            self.#dataRowsQueryFilter[inputs[i].getAttribute('data-field-name')] = '';
        }

        let selects = self.#tableData.querySelectorAll('thead > .filter > td > select');
        for(let i=0; i < selects.length; i++) {
            selects[i].value = '';
            self.#dataRowsQueryFilter[selects[i].getAttribute('data-field-name')] = '';
        }

        self.#changeDataRowsQueries({
            'page': 1,
            'sortFieldName' : '',
            'sortDirection' : 'asc',
        });
    }
    /**
     *
     * @returns {*|{}}
     */
    getDataRowsQueryFilter()
    {
        return this.#dataRowsQueryFilter;
    }
    /**
     *
     * @returns {[]|*[]|*}
     */
    getDataRows()
    {
        return this.#dataRows;
    }
    /**
     *
     * @returns {undefined|object}
     */
    getSelectedRow()
    {
        let selectRowIndex = this.getSelectedRowIndex();
        if (selectRowIndex >= 0) {
            return this.#dataRows[selectRowIndex];
        }
        return undefined;
    }
    /**
     *
     * @returns {number}
     */
    getSelectedRowIndex(defIndex = -1)
    {
        if (this.#dataRows.length > this.#selectedRowIndex && this.#selectedRowIndex >= 0) {
            return Number.parseInt(this.#selectedRowIndex);
        }
        return defIndex;
    }

}

