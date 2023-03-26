"use strict";

class TjsPaginator extends TjsBase
{
    #dataSource;
    #el;
    constructor(selectorOrEl, options = {})
    {
        let defOptions = {
            'initLocationSearch': true,
            'replaceHistorySearch': true,
            'page': 1,
            'limit': 15,
            'limitList': [1,5,15,30,60],
            'settings' : {
                'limitClassButton' : 'button-black',
                'limitSelectedClassButton' : 'button-orange',
                'pageClassButton' : 'button-black',
                'pageSelectedClassButton' : 'button-orange',
                'pageFirstButtonTitle' : '&#9668;&#9668;',
                'pagePrevButtonTitle' : '&#9668;',
                'pageNextButtonTitle' : '&#9658;',
            },
            'onPaginatorChanged': function(page, limit, rows){
                //console.log(page, limit, rows);
            }
        };

        super(js_object_merge_deep(defOptions, options));

        if (this.options.initLocationSearch === true) {
            let urlSearchParams = new URLSearchParams(window.location.search);
            this.options.page = parseInt(urlSearchParams.get('page')) || this.options.page;
            this.options.limit = parseInt(urlSearchParams.get('limit')) || this.options.limit;
            if (!this.options.limitList.jsInArray(this.options.limit)) {
                this.options.limit = this.options.limitList[0];
            }
        }

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
            if (!(typeof data === "undefined")) {
                self.options.page = parseInt(data.query.page) || 1;
                self.options.limit = parseInt(data.query.limit) || 1;
                self.#reRender(false, data.data);
            } else {
                self.options.page = 1;
                self.options.limit = 1;
                self.#reRender(false, []);
            }
        });
    }

    #init()
    {
        let self = this;

        self.#reRender(true);
    }
    /**
     *
     * @private
     */
    #convertParamsIfInvalid()
    {
        let self = this;

        if (typeof self.options.page === 'undefined' || self.options.page === null) {
            self.options.page = 1;
        }

        if (typeof self.options.limit === 'undefined' || self.options.limit === null) {
            self.options.limit = 1;
        }

    }
    /**
     *
     * @private
     */
    #reRender(isCreating, rows = [])
    {
        let self = this;

        while (self.#el.firstChild) {
            self.#el.removeChild(self.#el.lastChild);
        }

        self.#convertParamsIfInvalid();

        self.#createElements();

        if (typeof (self.options.onPaginatorChanged) === "function" && isCreating !== true) {
            self.options.onPaginatorChanged(
                parseInt(self.options.page),
                parseInt(self.options.limit),
                rows
            );
        }
    }
    /**
     *
     * @private
     */
    #createElements()
    {
        let self = this,
            table, tr, tdL, tdR;

        table = document.createElement('table');
        table.classList.add('width-100-percent');

        tdL = document.createElement('td');
        tdL.classList.add('width-50-percent');
        tdL.classList.add('text-align-left');

        self.#createLimitButtons(tdL);

        tdR = document.createElement('td');
        tdR.classList.add('width-50-percent');
        tdR.classList.add('text-align-right');

        self.#createPageButtons(tdR);

        tr = document.createElement('tr');
        tr.append(tdL);
        tr.append(tdR);
        table.append(tr);
        self.#el.append(table);
    }
    /**
     *
     * @param parent
     * @private
     */
    #createLimitButtons(parent)
    {
        let self = this, a, min, max;

        self.options.limitList.sort(function(a, b){return a-b});

        min = Number.parseInt(self.options.limitList[0]);
        max = Number.parseInt(self.options.limitList[self.options.limitList.length-1]);

        self.options.limit = Number.parseInt(self.options.limit);

        if (self.options.limit < min) {
            self.options.limit = min;
        }
        if (self.options.limit > max) {
            self.options.limit = max;
        }

        for(let i = 0; i < self.options.limitList.length; i++) {
            a = document.createElement('a');
            a.classList.add('button');
            a.classList.add('button-size-10');
            if (self.options.limit === Number.parseInt(self.options.limitList[i])) {
                a.classList.add(self.options.settings.limitSelectedClassButton);
            } else {
                a.classList.add(self.options.settings.limitClassButton);
            }
            a.innerHTML = self.options.limitList[i];
            a.setAttribute('data-limit', self.options.limitList[i]);
            parent.append(a);
        }

        let limitList = parent.getElementsByClassName('button');

        for(let i=0; i < limitList.length; i++) {

            limitList[i].addEventListener('click', function(){

                let selfEl = this;

                self.#changeLimit(selfEl.getAttribute('data-limit'));

            }, false);
        }
    }
    /**
     *
     * @param parent
     * @private
     */
    #createPageButtons(parent)
    {
        let self = this, a, aFirst, aPrev, aNext;

        let pEnd = Number.parseInt(self.options.page);
        if (pEnd <= 0) {
            pEnd = 1;
        }
        let pStart = pEnd - 2;
        if (pStart <= 0) {
            pStart = 1;
        }
        self.options.page = pEnd;

        if (pEnd > 3) {
            aFirst = document.createElement('a');
            aFirst.classList.add('button');
            aFirst.classList.add('button-size-10');
            aFirst.classList.add(self.options.settings.pageClassButton);
            aFirst.innerHTML = self.options.settings.pageFirstButtonTitle;
            aFirst.setAttribute('data-page', 1);
            parent.append(aFirst);
        }

        if (pEnd > 1) {
            aPrev = document.createElement('a');
            aPrev.classList.add('button');
            aPrev.classList.add('button-size-10');
            aPrev.classList.add(self.options.settings.pageClassButton);
            aPrev.innerHTML = self.options.settings.pagePrevButtonTitle;
            aPrev.setAttribute('data-page', pEnd-1);
            parent.append(aPrev);
        }

        for(let p = pStart; p <= pEnd; p++) {
            a = document.createElement('a');
            a.classList.add('button');
            a.classList.add('button-size-10');
            if (p === pEnd) {
                a.classList.add(self.options.settings.pageSelectedClassButton);
            } else {
                a.classList.add(self.options.settings.pageClassButton);
            }
            a.innerHTML = p;
            a.setAttribute('data-page', p);
            parent.append(a);
        }

        aNext = document.createElement('a');
        aNext.classList.add('button');
        aNext.classList.add('button-size-10');
        aNext.classList.add(self.options.settings.pageClassButton);
        aNext.innerHTML = self.options.settings.pageNextButtonTitle;
        aNext.setAttribute('data-page', pEnd+1);
        parent.append(aNext);


        let pages = parent.getElementsByClassName('button');

        for(let i=0; i < pages.length; i++) {

            pages[i].addEventListener('click', function(){

                let selfEl = this;

                self.#changePage(selfEl.getAttribute('data-page'));

            }, false);
        }
    }
    /**
     *
     * @param page
     * @private
     */
    #changePage(page){
        let self = this;
        self.options.page = parseInt(page) || 1;
        self.change();
    }
    /**
     *
     * @param limit
     * @private
     */
    #changeLimit(limit){
        let self = this;
        self.options.limit = parseInt(limit) || 1;
        self.change();
    }
    /**
     */
    change()
    {
        let self = this;

        if (self.options.replaceHistorySearch === true) {
            let urlSearchParams = new URLSearchParams(window.location.search);
            urlSearchParams.set('page', self.options.page);
            urlSearchParams.set('limit', self.options.limit);
            window.history.replaceState(null, null, '?' + urlSearchParams.toString());
        }

        self.dataSource.doDataFetch({
            'page': self.options.page,
            'limit': self.options.limit,
            'filter': {},
        });
    }
}