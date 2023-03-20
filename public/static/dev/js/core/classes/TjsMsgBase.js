"use strict";

class TjsMsgBase extends TjsBase
{
    #formCounter;
    #formZindexStart;
    #isTouch;
    #formCloseHandlerList;

    #defFormButton;
    constructor(options = {})
    {
        super(options);
        let self = this;

        this.#formCounter = 0;
        this.#formZindexStart = 10000;
        this.#isTouch = false;
        this.#formCloseHandlerList = [];

        this.#defFormButton = {
            title: '&nbsp;',
            onClick: function (formIndex) {
                self.formClose(formIndex);
            },
        }

        this.#init();
    }
    /**
     *
     * @private
     */
    #init()
    {
        let self = this;

        if ("ontouchstart" in window || navigator.msMaxTouchPoints)	{
            self.#isTouch = true;
        }
    }

    get defFormButton()
    {
        return this.#defFormButton;
    }
    /**
     *
     * @param formIndex number
     * @param newOptions object
     * @returns void
     * @private
     */
    _showForm(formIndex, newOptions = {})
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
            onFormContent(el){
                //console.log(el.id);
            },
            onFormShow(formIndex){
                //console.log(formIndex);
            },
            onFormClose(formIndex){
                //console.log(formIndex);
            },
            buttons: {
                //'close': this.#defFormButton,
            },
        }

        let options = js_object_merge_deep(defFormOptions, newOptions);

        //document.body add background
        document.body.append(js_create_el('div', 'jmsgFormBackground' + formIndex, 'jmsgFormBackground', function(el){
            el.style.zIndex = self.#formZindexStart + formIndex;
        }));
        //document.body add form
        document.body.append(js_create_el('div','jmsgForm' + formIndex, 'jmsgForm', function(el)
        {
            el.style.zIndex = self.#formZindexStart + formIndex + 1;
            if (self.#isTouch === true) {
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

        self.#formCloseHandlerList[self.#formCloseHandlerList.length] = options.onFormClose;

        if (typeof options.onFormShow === 'function') {
            options.onFormShow(formIndex);
        }
    }
    /**
     *
     * @param formIndex number
     * @private
     */
    _createFormMoveEvents(formIndex)
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
    }
    /**
     *
     * @param formIndex number
     */
    formClose(formIndex)
    {
        let self = this, el;

        if (typeof self.#formCloseHandlerList[self.#formCloseHandlerList.length-1] === 'function') {
            self.#formCloseHandlerList[self.#formCloseHandlerList.length-1](formIndex);
        }
        self.#formCloseHandlerList.length = self.#formCloseHandlerList.length-1;

        el = document.getElementById('jmsgForm' + formIndex);
        if (el) {
            el.remove();
            el = document.getElementById('jmsgFormBackground' + formIndex);
            if (el) {
                el.remove();
                self.#formCounter--;
            }
        }
    }
    /**
     *
     * @param formIndex number
     */
    formResize(formIndex)
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
    }
    /**
     *
     * @param options
     */
    formCustom(options = {}) {

        let self = this;

        self.#formCounter++;

        self._showForm(self.#formCounter, options);
    }

}
