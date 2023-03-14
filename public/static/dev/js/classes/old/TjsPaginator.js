let TjsPaginator = function(tagId, options = {}) {

    this.jsYusam = window.jsYusam;

    this.jsPost = window.jsPost;

    let defOptions = {
        'requestUri': false,//or '/'
        'requestOnCreate': false,
        'initLocationSearch': true,
        'replaceHistorySearch': true,
        'page': 1,
        'limit': 1,
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
            console.log(page, limit, rows);
        }
    };

    this.options = this.jsYusam.mergeDeep(defOptions, options);

    if (this.options.initLocationSearch === true) {
        let urlSearchParams = new URLSearchParams(window.location.search);
        this.options.page = parseInt(urlSearchParams.get('page')) || this.options.page;
        this.options.limit = parseInt(urlSearchParams.get('limit')) || this.options.limit;
        if (!this.options.limitList.in_array(this.options.limit)) {
            this.options.limit = this.options.limitList[0];
        }
    }

    this.el = document.getElementById(tagId);

    this._init();
};

TjsPaginator.prototype = {

    _init: function()
    {
        let self = this;

        self._reRender(true);

        if (self.options.requestOnCreate === true) {
            self.change();
        }
    },
    /**
     *
     * @private
     */
    _convertParamsIfInvalid: function()
    {
        let self = this;

        if (typeof self.options.page === 'undefined' || self.options.page === null) {
            self.options.page = 1;
        }

        if (typeof self.options.limit === 'undefined' || self.options.limit === null) {
            self.options.limit = 1;
        }

    },
    /**
     *
     * @private
     */
    _reRender: function(isCreating, rows = [])
    {
        let self = this;

        while (self.el.firstChild) {
            self.el.removeChild(self.el.lastChild);
        }

        self._convertParamsIfInvalid();

        self._createElements();

        if (typeof (self.options.onPaginatorChanged) === "function" && isCreating !== true) {
            self.options.onPaginatorChanged(
                parseInt(self.options.page),
                parseInt(self.options.limit),
                rows
            );
        }
    },
    /**
     *
     * @private
     */
    _createElements: function()
    {
        let self = this,
            table, tr, tdL, tdR;

        table = document.createElement('table');
        table.classList.add('width-100-percent');

        tdL = document.createElement('td');
        tdL.classList.add('width-50-percent');
        tdL.classList.add('text-align-left');

        self._createLimitButtons(tdL);

        tdR = document.createElement('td');
        tdR.classList.add('width-50-percent');
        tdR.classList.add('text-align-right');

        self._createPageButtons(tdR);

        tr = document.createElement('tr');
        tr.append(tdL);
        tr.append(tdR);
        table.append(tr);
        self.el.append(table);
    },
    /**
     *
     * @param parent
     * @private
     */
    _createLimitButtons: function (parent)
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

                self._changeLimit(selfEl.getAttribute('data-limit'));

            }, false);
        }
    },
    /**
     *
     * @param parent
     * @private
     */
    _createPageButtons: function (parent)
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

                self._changePage(selfEl.getAttribute('data-page'));

            }, false);
        }
    },
    /**
     *
     * @param page
     * @private
     */
    _changePage: function(page){
        let self = this;
        self.options.page = parseInt(page) || 1;
        self.change();
    },
    /**
     *
     * @param limit
     * @private
     */
    _changeLimit: function(limit){
        let self = this;
        self.options.limit = parseInt(limit) || 1;
        self.change();
    },
    /**
     */
    change: function()
    {
        let self = this;

        if (self.options.replaceHistorySearch === true) {
            let urlSearchParams = new URLSearchParams(window.location.search);
            urlSearchParams.set('page', self.options.page);
            urlSearchParams.set('limit', self.options.limit);
            window.history.replaceState(null, null, '?' + urlSearchParams.toString());
        }

        if (typeof self.options.requestUri !== 'string') {
            self._reRender(false, []);
            return;
        }

        self.jsPost.request(self.options.requestUri, {
            'page': self.options.page,
            'limit': self.options.limit,
            'filter': {},
        }, function (statusCode, response, headers)
        {
            if (statusCode === 200 && response.status === 'ok') {
                self.options.page = parseInt(response.data.query.page) || 1;
                self.options.limit = parseInt(response.data.query.limit) || 1;
                self._reRender(false, response.data.data);
            } else {
                self.options.page = 1;
                self.options.limit = 1;
                self._reRender(false, []);
            }
        });
    },
}

export default TjsPaginator;
