let TjsAppCenteredBody = function(tagIdOrElement, options = {}) {

    if (typeof tagIdOrElement === "string") {
        this.el = document.getElementById(tagIdOrElement);
    } else if (typeof tagIdOrElement === "object" && tagIdOrElement.constructor.name === 'HTMLDivElement') {
        this.el = tagIdOrElement;
    } else {
        this.el = undefined;
    }

    let defOptions = {
        'html' : {
            'headerLeftContent' : '',
            'headerRightContent' : '',
            'mainContent' : '',
        },
    };

    this.options = js_object_merge_deep(defOptions, options);

    this._init();

};

TjsAppCenteredBody.prototype = {

    _init: function()
    {
        let self = this;

        self._createForm();
    },
    /**
     *
     * @private
     */
    _createForm: function () {

        let self = this;

        const html = [
            '<div class="app-wrap-inner">',
            '   <div class="app-wrap-content">',
            '       <div class="app-wrap-content-header app-head">',
            '           <div class="app-wrap-content-header-left app-head-info app-float-left">',self.options.html.headerLeftContent,'</div>',
            '           <div class="app-wrap-content-header-right app-head-info app-float-right">',self.options.html.headerRightContent,'</div>',
            '       </div>',
            '       <div class="app-wrap-content-main app-content app-box-body app-clear-fix">',self.options.html.mainContent,'</div>',
            '   </div>',
            '</div>',
        ];

        self.el.classList.add('app-wrap');
        self.el.innerHTML = html.join('');
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    headerLeft: function()
    {
        let self = this;
        return self.el.querySelector('.app-wrap-content-header-left');
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    headerRight: function()
    {
        let self = this;
        return self.el.querySelector('.app-wrap-content-header-right');
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    main: function()
    {
        let self = this;
        return self.el.querySelector('.app-wrap-content-main');
    },
}
