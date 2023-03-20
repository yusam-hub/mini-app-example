let TjsAppContentBody = function(tagIdOrElement, options = {}) {

    if (typeof tagIdOrElement === "string") {
        this.el = document.getElementById(tagIdOrElement);
    } else if (typeof tagIdOrElement === "object" && tagIdOrElement.constructor.name === 'HTMLDivElement') {
        this.el = tagIdOrElement;
    } else {
        this.el = undefined;
    }

    let defMenuItem = {
        'title': '',
        'href': '',
    };

    let defOptions = {
        'menuItems' : [],
        'menuItemSelectedIndex' : -1,
        'href' : {
            'buttonBack' : '',
            'buttonClose': '',
        },
        'messageCloseConfirm' : '',
        'html' : {
            'headerLeft' : '',
            'headerRight' : '',
        },
    };

    this.options = js_object_merge_deep(defOptions, options);

    this._init();

};

TjsAppContentBody.prototype = {

    _init: function()
    {
        let self = this;

        self._createForm();

        window.jsGlob.winReady(function(){
            let foundEl;
            for(let i=0; i < self.options.menuItems.length; i++) {
                foundEl = document.getElementById('app_menu_item_' + i);
                foundEl.addEventListener('click', function(){
                    window.location.href = this.getAttribute('data-index-href');
                });
            }
        });
    },
    /**
     *
     * @private
     */
    _createForm: function () {

        let self = this;

        const html = [
            '<div class="app-content-body-root">',
            '    <div class="app-content-body-layout">',
            '        <div class="app-content-body-panel">',
            '            <div class="app-content-body-panel-header">',
            '               <div class="app-content-body-panel-header-left">',
            '                   <table><tr>',
            '<td class="td-header-title">',self.options.html.headerLeft,'</td>',
            '                   </tr></table>',
            '               </div>',
            '               <div class="app-content-body-panel-header-right">',
            '                   <table><tr>',
            ((self.options.href.buttonBack) ? '<td class="td-header-button-back">&#8678;</td>' : ''),
            '<td class="td-header-title">',self.options.html.headerRight,'</td>',
            ((self.options.href.buttonClose) ? '<td class="td-header-button-close">&#9747;</td>' : ''),
            '                   </tr></table>',
            '               </div>',
            '            </div>',
            '            <div class="app-content-body-panel-main">',
            '                <div class="app-content-body-panel-main-left">',
            '                    <div class="app-menu-items"></div>',
            '                </div>',
            '                <div class="app-content-body-panel-main-right"></div>',
            '            </div>',
            '        </div>',
            '    </div>',
            '</div>',
        ];

        self.el.innerHTML = html.join('');

        let menuItem;

        for(let i=0; i < self.options.menuItems.length; i++) {
            menuItem = self.createAppMenuItem();
            menuItem.id = 'app_menu_item_' + i;
            menuItem.setAttribute('data-index-id', ''+i);
            menuItem.setAttribute('data-index-href', self.options.menuItems[i].href);
            menuItem.innerHTML = self.options.menuItems[i].title;
            if (i === self.options.menuItemSelectedIndex) {
                menuItem.classList.add('app-menu-item-selected');
            }
            self.menuItems().append(menuItem);
        }

        window.jsGlob.winReady(function(){
            self._createClickEvent();
        });
    },
    /**
     *
     * @private
     */
    _createClickEvent: function ()
    {
        let self = this;

        if (self.options.href.buttonBack) {
            self.el.querySelector('.td-header-button-back').addEventListener('click', function () {
                window.location.href = self.options.href.buttonBack;
            });
        }

        if (self.options.href.buttonClose && self.options.messageCloseConfirm) {
            self.el.querySelector('.td-header-button-close').addEventListener('click', function () {
                window.jsMsg.dialogConfirm(self.options.messageCloseConfirm, {
                    'buttons': {
                        'yes': {
                            'onClick': function (formIndex) {
                                window.location.href = self.options.href.buttonClose;
                            }
                        }
                    }
                });
            });
        }
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    headerLeft: function()
    {
        let self = this;
        return self.el.querySelector('.app-content-body-panel-header-left');
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    headerRight: function()
    {
        let self = this;
        return self.el.querySelector('.app-content-body-panel-header-right');
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    mainLeft: function()
    {
        let self = this;
        return self.el.querySelector('.app-content-body-panel-main-left');
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    mainRight: function()
    {
        let self = this;
        return self.el.querySelector('.app-content-body-panel-main-right');
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    menuItems: function()
    {
        let self = this;
        return self.el.querySelector('.app-menu-items');
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    createAppGroup: function()
    {
        let div = document.createElement('div');
        div.classList.add('app-group');
        return div;
    },
    /**
     *
     * @returns {HTMLDivElement}
     */
    createAppMenuItem: function()
    {
        let div = document.createElement('div');
        div.classList.add('app-menu-item');
        return div;
    },
}
