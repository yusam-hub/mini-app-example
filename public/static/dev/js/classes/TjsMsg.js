let TjsMsg = function() {

    let self = this;

    this.lang = js_lang_func('TjsMsg');

    this._formCounter = 0;
    this._formZindexStart = 10000;
    this._isTouch = false;
    this._formCloseHandlerList = [];

    this.defFormButton = {
        title: '&nbsp;',
        onClick: function(formIndex) {
            self.formClose(formIndex);
        },
    }

    this._init();
};

TjsMsg.prototype = {
    /**
     *
     * @private
     */
    _init: function()
    {
        let self = this;

        if ("ontouchstart" in window || navigator.msMaxTouchPoints)	{
            self._isTouch = true;
        }
    },
    /**
     *
     * @param formIndex number
     * @param newOptions object
     * @returns void
     * @private
     */
    _showForm: function(formIndex, newOptions = {})
    {
        if (!window.jsGlob.isDomLoaded()) {
            console.log("Error: TjsMsg can not be execute while dom is not loaded");
            return;
        }
        let self = this;

        let defFormOptions = {
            formTitle: '&nbsp;',
            formContent: '&nbsp;',
            formWidth: 320,
            onFormContent: function(el){
                //console.log(el.id);
            },
            onFormShow: function(formIndex){
                //console.log(formIndex);
            },
            onFormClose: function(formIndex){
                //console.log(formIndex);
            },
            buttons: {
                //'close': this.defFormButton,
            },
        }

        let options = js_object_merge_deep(defFormOptions, newOptions);

        //document.body add background
        document.body.append(js_create_el('div', 'jmsgFormBackground' + formIndex, 'jmsgFormBackground', function(el){
            el.style.zIndex = self._formZindexStart + formIndex;
        }));
        //document.body add form
        document.body.append(js_create_el('div','jmsgForm' + formIndex, 'jmsgForm', function(el)
        {
            el.style.zIndex = self._formZindexStart + formIndex + 1;
            if (self._isTouch === true) {
                el.style.position = 'absolute';
            }
            if ((typeof(options.formWidth) == 'string') || (typeof(options.formWidth) == 'number')){
                el.style.width = options.formWidth;
            }
            el.append(js_create_el('div','jmsgFormData' + formIndex, 'jmsgFormData', function(el)
            {
                el.append(js_create_el('table','jmsgFormTable' + formIndex,'jmsgFormTable', function(el){
                    el.append(js_create_el('tr','jmsgFormHeader' + formIndex,'jmsgFormHeader', function(el){
                        el.append(js_create_el('td','jmsgFormHeaderTd' + formIndex,'jmsgFormHeaderTd', function(el){
                            el.append(js_create_el('div','jmsgFormTitle' + formIndex,'jmsgFormTitle', function(el){
                                el.innerHTML = options.formTitle;
                            }));
                        }));
                        el.append(js_create_el('td','jmsgFormHeaderTd' + formIndex,'jmsgFormHeaderTd', function(el){
                            el.width = "1%";
                            el.append(js_create_el('button','jmsgFormClose' + formIndex,'jmsgFormClose', function(el){
                                el.innerHTML = '&#10006;';
                                el.setAttribute("data-form-index", formIndex);
                            }));
                        }));
                    }));
                }));
                el.append(js_create_el('div','jmsgFormBody' + formIndex,'jmsgFormBody', function(el){
                    el.innerHTML = options.formContent;
                    if (typeof options.onFormContent === "function") {
                        options.onFormContent(el);
                    }
                }));
                el.append(js_create_el('div','jmsgFormButtons' + formIndex,'jmsgFormButtons', function(el){

                }));
            }));
        }));
        //document.body end

        let button;

        let buttonsEl = document.querySelector('#jmsgFormButtons' + formIndex);
        for (const [key, item] of Object.entries(options.buttons)) {
            button = document.createElement('button');
            buttonsEl.append(button);

            if (Object.keys(options.buttons).length > 1) {
                button.style.marginLeft = '10px';
            }

            button.classList.add('jmsgFormButton');
            button.classList.add('button');
            button.classList.add('button-black');
            button.setAttribute('data-button-key', key);
            button.setAttribute('data-form-index', formIndex);
            button.innerHTML = item.title;

            if (typeof(item.onClick) === "function") {
                button.addEventListener('click', function(){
                    item.onClick(formIndex);
                }, false);
            }
        }

        self.formResize(formIndex);

        let formCloseEl = document.querySelector('#jmsgFormClose' + formIndex);

        formCloseEl.addEventListener('click', function(){

            let fi = this.getAttribute('data-form-index');

            self.formClose(fi);

        }, false);

        self._createFormMoveEvents(formIndex);

        self._formCloseHandlerList[self._formCloseHandlerList.length] = options.onFormClose;

        if (typeof options.onFormShow === 'function') {
            options.onFormShow(formIndex);
        }
    },
    /**
     *
     * @param formIndex number
     * @private
     */
    _createFormMoveEvents: function(formIndex)
    {
        let self = this;

        let formTitleEl = document.getElementById('jmsgFormTitle' + formIndex);
        let x, y;

        function onMouseUp()
        {
            document.removeEventListener('mousemove', onMouseMove);
        }

        function onMouseMove(pos)
        {
            let formElMouseMove = document.getElementById('jmsgForm' + formIndex);
            formElMouseMove.style.left = (pos.pageX - x) + 'px';
            formElMouseMove.style.top = (pos.pageY - y) + 'px';
        }

        function onMouseDown(e) {

            document.removeEventListener('mouseup',onMouseUp);

            let offset = js_get_offset_from_elem_by_id('jmsgForm' + formIndex);

            x = e.pageX - offset.left,
            y = e.pageY - offset.top;

            let formEl = document.getElementById('jmsgForm' + formIndex);

            formEl.style.marginTop = 0;
            formEl.style.marginLeft = 0;
            formEl.style.top = offset.top + 'px';
            formEl.style.left = offset.left + 'px';

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup',onMouseUp);
        }

        formTitleEl.addEventListener('mousedown', onMouseDown, false);
    },
    /**
     *
     * @param formIndex number
     */
    formClose: function(formIndex)
    {
        let self = this, el;

        if (typeof self._formCloseHandlerList[self._formCloseHandlerList.length-1] === 'function') {
            self._formCloseHandlerList[self._formCloseHandlerList.length-1](formIndex);
        }
        self._formCloseHandlerList.length = self._formCloseHandlerList.length-1;

        el = document.getElementById('jmsgForm' + formIndex);
        if (el) {
            el.remove();
            el = document.getElementById('jmsgFormBackground' + formIndex);
            if (el) {
                el.remove();
                self._formCounter--;
            }
        }
    },
    /**
     *
     * @param formIndex number
     */
    formResize: function(formIndex)
    {
        let self = this;

        let formEl = document.getElementById('jmsgForm' + formIndex);
        formEl.style.top = '50%';
        formEl.style.left = '50%';
        formEl.style.marginTop = '-' + formEl.clientHeight / 2 + 'px';
        formEl.style.marginLeft = '-' + formEl.clientWidth / 2 + 'px';

        let offset = js_get_offset_from_elem_by_id('jmsgForm' + formIndex);

        if (offset.top < 0) {
            offset.top = 0;
            formEl.style.marginTop = 0;
            formEl.style.marginLeft = 0;
            formEl.style.top = offset.top + 'px';
            formEl.style.left = offset.left + 'px';
        }
    },
    /**
     *
     * @param options
     */
    formCustom: function(options = {}) {

        let self = this;

        self._formCounter++;

        self._showForm(self._formCounter, options);
    },
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogInfo: function(mainMessage, newOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'extraMessage' : '&nbsp;',
            'extraMessageClasses' : '',
            'formWidth': 320,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.okTitle,
                    'onClick' : self.defFormButton.onClick,
                },
            }
        }, newOptions);

        self.formCustom({
            formTitle: self.lang.dialog.infoTitle,
            formContent: '<div class="jmsgInfo"><div class="msg-box msg-info">'+mainMessage+'</div><div class="'+options.extraMessageClasses+'">'+options.extraMessage+'</div></div>',
            formWidth: options.formWidth,
            buttons: options.buttons,
        });
    },
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogSuccess: function(mainMessage, newOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'extraMessage' : '&nbsp;',
            'extraMessageClasses' : '',
            'formWidth': 320,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.okTitle,
                    'onClick' : self.defFormButton.onClick,
                },
            }
        }, newOptions);

        self.formCustom({
            formTitle: self.lang.dialog.successTitle,
            formContent: '<div class="jmsgSuccess"><div class="msg-box msg-success">'+mainMessage+'</div><div class="'+options.extraMessageClasses+'">'+options.extraMessage+'</div></div>',
            formWidth: options.formWidth,
            buttons: options.buttons,
        });
    },
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogError: function(mainMessage, newOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'extraMessage' : '&nbsp;',
            'extraMessageClasses' : '',
            'formWidth': 320,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.okTitle,
                    'onClick' : self.defFormButton.onClick,
                },
            }
        }, newOptions);

        self.formCustom({
            formTitle: self.lang.dialog.errorTitle,
            formContent: '<div class="jmsgError"><div class="msg-box msg-error">'+mainMessage+'</div><div class="'+options.extraMessageClasses+'">'+options.extraMessage+'</div></div>',
            formWidth: options.formWidth,
            buttons: options.buttons,
        });
    },
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogWarning: function(mainMessage, newOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'extraMessage' : '&nbsp;',
            'extraMessageClasses' : '',
            'formWidth': 320,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.okTitle,
                    'onClick' : self.defFormButton.onClick,
                },
            }
        }, newOptions);

        self.formCustom({
            formTitle: self.lang.dialog.warningTitle,
            formContent: '<div class="jmsgWarning"><div class="msg-box msg-warning">'+mainMessage+'</div><div class="'+options.extraMessageClasses+'">'+options.extraMessage+'</div></div>',
            formWidth: options.formWidth,
            buttons: options.buttons,
        });
    },
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogConfirm: function(mainMessage, newOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'extraMessage' : '&nbsp;',
            'extraMessageClasses' : '',
            'formWidth': 320,
            'buttons': {
                'yes': {
                    'title' : self.lang.button.yesTitle,
                    'onClick' : self.defFormButton.onClick,
                },
                'no': {
                    'title' : self.lang.button.noTitle,
                    'onClick' : self.defFormButton.onClick,
                },
            }
        }, newOptions);

        self.formCustom({
            formTitle: self.lang.dialog.confirmTitle,
            formContent: '<div class="jmsgConfirm"><div class="msg-box msg-confirm">'+mainMessage+'</div><div class="'+options.extraMessageClasses+'">'+options.extraMessage+'</div></div>',
            formWidth: options.formWidth,
            buttons: options.buttons,
        });
    },
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogDeleteConfirm: function(mainMessage, newOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'extraMessage' : '&nbsp;',
            'extraMessageClasses' : '',
            'formWidth': 320,
            'buttons': {
                'yes': {
                    'title' : self.lang.button.yesTitle,
                    'onClick' : self.defFormButton.onClick,
                },
                'no': {
                    'title' : self.lang.button.noTitle,
                    'onClick' : self.defFormButton.onClick,
                },
            }
        }, newOptions);

        self.formCustom({
            formTitle: self.lang.dialog.deleteConfirmTitle,
            formContent: '<div class="jmsgConfirmDelete"><div class="msg-box msg-delete">'+mainMessage+'</div><div class="'+options.extraMessageClasses+'">'+options.extraMessage+'</div></div>',
            formWidth: options.formWidth,
            buttons: options.buttons,
        });
    },
    /**
     *
     * @param jsForm TjsForm
     * @param newOptions object
     */
    dialogInputForm: function(jsForm, newOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'formTitle' : '&nbsp;',
            'formWidth': 320,
            'buttons': {}
        }, newOptions);

        self.formCustom({
            formTitle: options.formTitle,
            formContent: jsForm.render(),
            formWidth: options.formWidth,
            buttons: options.buttons,
        });
    },
    /**
     *
     * @param jsForm TjsForm
     * @param newOptions object
     */
    dialogInputFormConfirm: function(jsForm, newOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'formTitle' : self.lang.dialog.formTitle,
            'formWidth': 320,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.okTitle,
                    'onClick' : self.defFormButton.onClick,
                },
                'cancel': {
                    'title' : self.lang.button.cancelTitle,
                    'onClick' : self.defFormButton.onClick,
                },
            }
        }, newOptions);

        options.buttons.ok.onClick = function(formIndex) {

            jsForm.save(function(res){

                if (res['response']['status'] === 'ok') {
                    self.formClose(res.callbackOptions.formIndex);
                }

            }, {},{'formIndex' : formIndex});

        };

        self.dialogInputForm(jsForm, options);
    },
    /**
     *
     * @param jsForm TjsForm
     * @param newOptions object
     */
    dialogInputFormConfirmAdd: function(jsForm, newOptions = {}) {

        let self = this;
        self.dialogInputFormConfirm(jsForm, {
            'formTitle' : self.lang.dialog.formAddTitle,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.addTitle,
                },
            }
        });
    },
    /**
     *
     * @param jsForm TjsForm
     * @param newOptions object
     */
    dialogInputFormConfirmSave: function(jsForm, newOptions = {}) {

        let self = this;
        self.dialogInputFormConfirm(jsForm, {
            'formTitle' : self.lang.dialog.formSaveTitle,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.saveTitle,
                },
            }
        });
    },
    /**
     *
     * @param jsForm TjsForm
     * @param newOptions object
     */
    dialogInputFormConfirmDelete: function(jsForm, newOptions = {}) {

        let self = this;
        self.dialogInputFormConfirm(jsForm, {
            'formTitle' : self.lang.dialog.formDeleteTitle,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.deleteTitle,
                },
            }
        });
    }
}
