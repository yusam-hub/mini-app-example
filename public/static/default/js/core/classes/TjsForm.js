"use strict";

class TjsForm extends TjsBase
{
    #formName;
    #formElement;
    #jsMsg;
    #jsPost;

    constructor(formName, options = {}, jsMsg = undefined, jsPost = undefined)
    {
        let defOptions = {
            'formName': formName,
            'formId': formName,
            'formAction': '#',
            'formMethod': 'post',
            'formActionUri': window.location.pathname + window.location.search.toString(),//function(fieldValue) return {}
            'formActionConfirmMessage': js_lang_func('TjsMsg', 'content.messagePerform'),
            'onFormActionSave': function(res) {
                //console.log("jsForm.onFormActionSave", response);
            },
            'formFieldDefs': {},
        }

        super(js_object_merge_deep(defOptions, options));

        this.#jsMsg = jsMsg;
        if (this.#jsMsg === undefined) {
            this.#jsMsg = window.jsMsg;
        }
        this.#jsPost = jsPost;
        if (this.#jsPost === undefined) {
            this.#jsPost = window.jsPost;
        }

        this.#formName = formName;

        this.#init();
    }

    #init()
    {
        let self = this;

        self.#formElement = document.createElement('form');
        self.#formElement.classList.add('form');
        self.#formElement.classList.add('form-block');
        self.#formElement.classList.add('form-fullwidth');
        self.#formElement.method = self.options.formMethod;
        self.#formElement.action = self.options.formAction;
        self.#formElement.name = self.options.formName;
        self.#formElement.id = self.options.formId;

        self.addFields(self.options.formFieldDefs);
    }
    /**
     *
     * @param formFieldControl
     * @param fieldName
     * @param newOptions
     * @param extraEl
     * @returns {*}
     * @private
     */
    _addField(formFieldControl, fieldName, newOptions = {}, extraEl = undefined)
    {
        let self = this;

        let options = js_object_merge_deep({
            'fieldValue' : '',
            'fieldId' : fieldName,
            'fieldName' : fieldName,
            'fieldLabel' : fieldName,
            'fieldError' : false,
            'fieldDesc' : '',
            'class': '',
            'required': true,
            'readOnly' : false,
        }, newOptions);

        formFieldControl.id = options.fieldId;
        formFieldControl.classList.add('form-field-control');
        if (options.required === true) {
            formFieldControl.classList.add('required');
        }
        if (typeof options.class === 'string' && options.class.length > 0) {
            let classes = options.class.split(" ");
            for (let i = 0; i < classes.length; i++) {
                formFieldControl.classList.add(classes[i]);
            }
        }

        let nodeNames = ['INPUT','TEXTAREA','SELECT'];

        if (nodeNames.includes(formFieldControl.nodeName)) {
            formFieldControl.name = options.fieldName;
        }

        let formElement = document.createElement('div');
        formElement.classList.add('form-element');
        if (options.fieldError) {
            formElement.classList.add('error');
        }

        let label = document.createElement('label');
        label.innerHTML = options.fieldLabel + ((options.required) ? '<span class="required">&nbsp;*</span>' : '');

        let formField = document.createElement('div');
        formField.classList.add('form-field');

        let formFieldError = document.createElement('div');
        formFieldError.classList.add('form-error-div');
        if(options.fieldError) {
            formFieldError.classList.add('form-error');
            formFieldError.innerHTML = options.fieldError;
        } else {
            formFieldError.innerHTML = options.fieldDesc ? options.fieldDesc : '&nbsp;';
        }
        formFieldError.setAttribute('data-field-desc', options.fieldDesc);

        let formClear = document.createElement('div');
        formClear.classList.add('clear');

        formElement.append(label);
        formElement.append(formField);
        formField.append(formFieldControl);
        if (extraEl !== undefined){
            formField.append(extraEl);
        }
        formField.append(formFieldError);
        formElement.append(formClear);
        self.#formElement.append(formElement);

        return formFieldControl;
    }
    /**
     *
     * @param fieldDefs
     */
    addFields(fieldDefs = {}) {
        let self = this;

        for (const [fieldName, options] of Object.entries(fieldDefs)) {
            if (options.fieldType === 'input-hidden') {

                self.addFieldInputHidden(fieldName, options.fieldValue);

            } else if (options.fieldType === 'input-text') {

                self.addFieldInputText(fieldName, options);

            } else if (options.fieldType === 'input-file') {

                self.addFieldInputFile(fieldName, options);

            } else if (options.fieldType === 'text-area') {

                self.addFieldTextArea(fieldName, options);

            } else if (options.fieldType === 'select') {

                self.addFieldSelect(fieldName, options);

            } else if (options.fieldType === 'radios') {

                self.addFieldRadios(fieldName, options);

            } else if (options.fieldType === 'checkboxes') {

                self.addFieldCheckboxes(fieldName, options);

            }
        }
    }
    /**
     *
     * @param fieldName
     * @param extraEl
     * @param newOptions
     * @returns {HTMLDivElement}
     */
    addFieldExtraFormFieldElement(fieldName, extraEl = undefined, newOptions = {})
    {
        let self = this;

        let options = js_object_merge_deep({
            'fieldValue' : '',
            'fieldId' : fieldName,
            'fieldName' : fieldName,
            'fieldLabel' : fieldName,
            'fieldError' : false,
            'fieldDesc' : '',
            'fieldType' : 'input-text',
            'class': '',
            'required': true,
            'readOnly' : false
        }, newOptions);

        let formFieldControl = document.createElement('input');
        formFieldControl.type = 'hidden';
        formFieldControl.name = fieldName;
        formFieldControl.id = fieldName;
        formFieldControl.classList.add('form-field-control');
        formFieldControl.defaultValue = options.fieldValue;

        return self._addField(formFieldControl, fieldName, options, extraEl);
    }
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldInputText(fieldName, newOptions = {})
    {
        let self = this;

        let options = js_object_merge_deep({
            'fieldValue' : '',
            'fieldId' : fieldName,
            'fieldName' : fieldName,
            'fieldLabel' : fieldName,
            'fieldError' : false,
            'fieldDesc' : '',
            'fieldType' : 'input-text',
            'class': '',
            'required': true,
            'readOnly' : false,
            'placeholder': '',
            'inputType': 'text',
            'autocomplete' : ""
        }, newOptions);

        let formFieldControl = document.createElement('input');
        formFieldControl.type = options.inputType;
        formFieldControl.readOnly = options.readOnly;
        formFieldControl.classList.add('form-field-control');
        if (options.required === true) {
            formFieldControl.classList.add('required');
        }
        formFieldControl.defaultValue = options.fieldValue;
        formFieldControl.placeholder = options.placeholder;
        formFieldControl.autocomplete = options.autocomplete;

        return self._addField(formFieldControl, fieldName, options);
    }
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldInputFile(fieldName, newOptions = {})
    {
        let self = this;

        let options = js_object_merge_deep({
            'fieldId' : fieldName,
            'fieldName' : fieldName,
            'fieldLabel' : fieldName,
            'fieldError' : false,
            'fieldDesc' : '',
            'fieldType' : 'input-file',
            'class': '',
            'required': true,
            'readOnly' : false,
            'multiple' : true,
            'accept' : '*', //.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*
        }, newOptions);

        let formFieldControl = document.createElement('input');
        formFieldControl.type = 'file';

        formFieldControl.accept = options.accept;

        if (options.readOnly === true) {
            formFieldControl.disabled = true;
        }
        if (options.multiple === true) {
            formFieldControl.multiple = true;
        }
        formFieldControl.classList.add('form-field-control');
        if (options.required === true) {
            formFieldControl.classList.add('required');
        }

        return self._addField(formFieldControl, fieldName, options);
    }
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldTextArea(fieldName, newOptions = {})
    {
        let self = this;

        let options = js_object_merge_deep({
            'rows': 2,
            'fieldValue' : '',
            'fieldId' : fieldName,
            'fieldName' : fieldName,
            'fieldLabel' : fieldName,
            'fieldError' : false,
            'fieldDesc' : '',
            'fieldType' : 'text-area',
            'class': '',
            'required': true,
            'readOnly' : false,
            'placeholder': '',
        }, newOptions);

        let formFieldControl = document.createElement('textarea');
        formFieldControl.rows = options.rows;
        if (options.readOnly === true) {
            formFieldControl.disabled = true;
        }
        formFieldControl.classList.add('form-field-control');
        if (options.required === true) {
            formFieldControl.classList.add('required');
        }
        formFieldControl.placeholder = options.placeholder;
        formFieldControl.defaultValue = options.fieldValue;

        return self._addField(formFieldControl, fieldName, options);
    }
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldSelect(fieldName, newOptions = {})
    {
        let self = this;

        let options = js_object_merge_deep({
            'fieldValue' : '',
            'fieldOptions' : [
                //{'value':'','html':''}
            ],
            'fieldId' : fieldName,
            'fieldName' : fieldName,
            'fieldLabel' : fieldName,
            'fieldError' : false,
            'fieldDesc' : '',
            'fieldType' : 'select',
            'class': '',
            'required': true,
            'readOnly' : false,
            'multiple' : false,
            'size': 1,
        }, newOptions);

        let formFieldControl = document.createElement('select');
        formFieldControl.size = Number.parseInt(options.size);
        if (options.multiple === true) {
            formFieldControl.setAttribute('multiple', 'multiple');
        }
        if (options.readOnly === true) {
            formFieldControl.disabled = true;
        }

        let values = [options.fieldValue.toString()];
        if (options.multiple === true) {
            values = options.fieldValue.toString().split(',');
        }
        for(let i = 0; i < options.fieldOptions.length; i++) {
            let option = document.createElement('option');
            option.value = options.fieldOptions[i].value.toString();
            option.innerHTML = options.fieldOptions[i].html.toString();
            option.id = options.fieldId + '_' + options.fieldOptions[i].value.toString();
            if (values.includes(option.value)) {
                option.defaultSelected = true;
            }
            formFieldControl.options.add(option);
        }

        return self._addField(formFieldControl, fieldName, options);
    }
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldRadios(fieldName, newOptions = {})
    {
        let self = this;

        let options = js_object_merge_deep({
            'fieldValue' : '',
            'fieldOptions' : [
                //{'value':'','html':''}
            ],
            'fieldId' : fieldName,
            'fieldName' : fieldName,
            'fieldLabel' : fieldName,
            'fieldError' : false,
            'fieldDesc' : '',
            'fieldType' : 'radios',
            'class': '',
            'required': true,
            'readOnly' : false,
            'inline': false,
        }, newOptions);

        let formFieldControl = document.createElement('div');
        formFieldControl.setAttribute('name', options.fieldName);
        formFieldControl.classList.add('form-radios');

        let values = [options.fieldValue.toString()];

        for(let i = 0; i < options.fieldOptions.length; i++) {
            let label = document.createElement('label');
            label.classList.add('radio');
            if (options.inline === true) {
                label.classList.add('inline');
            }

            let inputRadio = document.createElement('input');
            inputRadio.name = options.fieldName + '_radios';
            inputRadio.id = options.fieldName + '_radios_' + options.fieldOptions[i].value.toString();
            inputRadio.type = 'radio';
            inputRadio.defaultValue = options.fieldOptions[i].value.toString();
            if (options.readOnly === true) {
                inputRadio.disabled = true;
            }

            if (values.includes(inputRadio.defaultValue)) {
                inputRadio.defaultChecked = true;
            }

            label.append(inputRadio);
            label.append(options.fieldOptions[i].html);
            formFieldControl.append(label);
        }

        return self._addField(formFieldControl, fieldName, options);
    }
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldCheckboxes(fieldName, newOptions = {})
    {
        let self = this;

        let options = js_object_merge_deep({
            'fieldValue' : '',
            'fieldOptions' : [
                //{'value':'','html':''}
            ],
            'fieldId' : fieldName,
            'fieldName' : fieldName,
            'fieldLabel' : fieldName,
            'fieldError' : false,
            'fieldDesc' : '',
            'fieldType' : 'checkboxes',
            'class': '',
            'required': true,
            'readOnly' : false,
            'inline' : false,
        }, newOptions);

        let formFieldControl = document.createElement('div');
        formFieldControl.setAttribute('name', options.fieldName);
        formFieldControl.classList.add('form-checkboxes');

        let values = options.fieldValue.toString().split(',');

        for(let i = 0; i < options.fieldOptions.length; i++) {
            let label = document.createElement('label');
            label.classList.add('checkbox');
            if (options.inline === true) {
                label.classList.add('inline');
            }

            let inputCheckbox = document.createElement('input');
            inputCheckbox.name = options.fieldName + '_checkboxes';
            inputCheckbox.id = options.fieldName + '__checkboxes_' + options.fieldOptions[i].value.toString();
            inputCheckbox.type = 'checkbox';
            inputCheckbox.defaultValue = options.fieldOptions[i].value.toString();
            if (options.readOnly === true) {
                inputCheckbox.disabled = true;
            }

            if (values.includes(inputCheckbox.defaultValue)) {
                inputCheckbox.defaultChecked = true;
            }

            label.append(inputCheckbox);
            label.append(options.fieldOptions[i].html);
            formFieldControl.append(label);
        }

        return self._addField(formFieldControl, fieldName, options);
    }
    /**
     *
     * @param fieldName string
     * @param fieldValue string
     * @returns {HTMLInputElement}
     */
    addFieldInputHidden(fieldName, fieldValue)
    {
        let self = this;

        let formElement = document.createElement('span');
        formElement.classList.add('form-element');

        let formField = document.createElement('span');
        formField.classList.add('form-field');

        let formFieldControl = document.createElement('input');
        formFieldControl.type = 'hidden';
        formFieldControl.name = fieldName;
        formFieldControl.id = fieldName;
        formFieldControl.classList.add('form-field-control');
        formFieldControl.defaultValue = fieldValue;

        formElement.append(formField);
        formField.append(formFieldControl);
        self.#formElement.append(formElement);

        return formFieldControl;
    }
    /**
     *
     * @returns {HTMLFormElement}
     */
    form()
    {
        return this.#formElement;
    }
    /**
     *
     * @param selector
     */
    appendForSelector(selector)
    {
        document.querySelector(selector).append(this.#formElement);
    }
    /**
     *
     * @param callback undefined|function - function(jsForm, callbackOptions){}
     * @param extraParams object
     * @param callbackOptions object
     * @returns {boolean}
     */
    save(callback = undefined, extraParams = {}, callbackOptions = {})
    {
        let self = this;

        function post() {

            if (typeof self.options.formActionUri === 'string' && self.options.formActionUri.length > 0) {
                self.#jsPost
                    .request(
                        self.options.formActionUri,
                        Object.assign(self.toArray(), extraParams),
                        function (statusCode, response, headers)
                        {
                            let res = {
                                'statusCode': statusCode,
                                'response': response,
                                'callbackOptions': callbackOptions,
                                'formId' : self.options.formId,
                                'formName' : self.options.formName,
                            };

                            self._doOnFormActionSave(res);

                            if (typeof callback === 'function') {
                                callback(res);
                            }
                        });
            } else if (typeof self.options.formActionUri === 'function') {

                let response = self.options.formActionUri(Object.assign(self.toArray(), extraParams));

                let res = {
                    'statusCode': 0,
                    'response': response,
                    'callbackOptions': callbackOptions,
                    'formId' : self.options.formId,
                    'formName' : self.options.formName,
                };

                self._doOnFormActionSave(res);

                if (typeof callback === 'function') {
                    callback(res);
                }
            }

        }

        self.#jsMsg.dialogConfirm(self.options.formActionConfirmMessage, {
            'buttons' : {
                'yes': {
                    'onClick' : function (formIndex) {
                        self.#jsMsg.formClose(formIndex);
                        post();
                    }
                }
            }
        });

        return true;
    }
    /**
     *
     * @param res
     * @private
     */
    _doOnFormActionSave(res)
    {
        let self = this;
        /**
         * Убираем старые ошибки ошибки
         */
        self.fromErrorArray();

        /**
         * Если статус ERROR
         */
        if (res['response']['status'] === 'error' && typeof res['response']['errorData'] === 'object') {

            self.fromErrorArray(res['response']['errorData']);

            if (typeof res['response']['errorMessage'] === 'string') {
                self.#jsMsg.dialogError(res['response']['errorMessage']);
            }

        } else if (res['response']['status'] === 'ok' && res['formId'] !== undefined) {

            /**
             * Очищаем контрол с файлами, так как мы успешно загрузили
             * @type {NodeListOf<Element>}
             */
            let formFieldControls = self.#formElement.querySelectorAll('form#' + res['formId'] + ' > .form-element > .form-field > .form-field-control');
            //let formFieldControls = document.querySelectorAll('form#' + res['formId'] + ' > .form-element > .form-field > .form-field-control');//возможно нужно это!!!
            for (let i = 0; i < formFieldControls.length; i++) {
                if (formFieldControls[i].nodeName === 'INPUT' && formFieldControls[i].type.toString() === 'file') {
                    formFieldControls[i].value = '';
                }
            }
        }

        if (typeof self.options.onFormActionSave === "function") {
            self.options.onFormActionSave(res);
        }
    }
    /**
     * @param fields
     */
    fromArray(fields = {})
    {
        let self = this, formFieldControls;

        formFieldControls = self.#formElement.querySelectorAll('.form-element > .form-field > .form-field-control');

        for (let i = 0; i < formFieldControls.length; i++) {

            if (fields[formFieldControls[i].getAttribute('name')] !== undefined)
            {
                if (formFieldControls[i].nodeName === 'INPUT' || formFieldControls[i].nodeName === 'TEXTAREA') {

                    formFieldControls[i].value = fields[formFieldControls[i].name].toString();

                } else if (formFieldControls[i].nodeName === 'SELECT') {

                    if (formFieldControls[i].multiple) {

                        let values = fields[formFieldControls[i].name].toString().split(",");

                        for (let o = 0; o < formFieldControls[i].options.length; o++) {
                            if (values.includes(formFieldControls[i].options[o].value)) {
                                formFieldControls[i].options[o].selected = true;
                            } else {
                                formFieldControls[i].options[o].selected = false;
                            }
                        }

                    } else {

                        let values = fields[formFieldControls[i].name].toString().split(",");
                        formFieldControls[i].value = values[0];

                    }
                } else if (formFieldControls[i].classList.contains('form-radios')) {

                    let radioInputs = formFieldControls[i].querySelectorAll('label > input');

                    for(let r=0; r < radioInputs.length; r++) {
                        radioInputs[r].checked = radioInputs[r].value.toString() === fields[formFieldControls[i].getAttribute('name')].toString();
                    }
                } else if (formFieldControls[i].classList.contains('form-checkboxes')) {

                    let checkboxInputs = formFieldControls[i].querySelectorAll('label > input');
                    let values = fields[formFieldControls[i].getAttribute('name')].toString().split(",");

                    for(let r=0; r < checkboxInputs.length; r++) {
                        checkboxInputs[r].checked = !!values.includes(checkboxInputs[r].value.toString());
                    }
                }
            }//end !undefined
        }//end for
    }
    /**
     * @returns {{}}
     */
    toArray()
    {
        let self = this, formFieldControls;

        let out = {};

        formFieldControls = self.#formElement.querySelectorAll('.form-element > .form-field > .form-field-control');

        for (let i = 0; i < formFieldControls.length; i++) {

            if (formFieldControls[i].nodeName === 'INPUT' || formFieldControls[i].nodeName === 'TEXTAREA') {

                if (formFieldControls[i].nodeName === 'INPUT' && formFieldControls[i].type.toString() === 'file') {
                    out[formFieldControls[i].name] = formFieldControls[i].files;
                } else {
                    out[formFieldControls[i].name] = formFieldControls[i].value;
                }

            } else if (formFieldControls[i].nodeName === 'SELECT') {

                let values = [];

                out[formFieldControls[i].name] = '';

                for (let o = 0; o < formFieldControls[i].options.length; o++) {
                    if (formFieldControls[i].options[o].selected === true) {
                        values[values.length] = formFieldControls[i].options[o].value;
                    }
                }
                if (values.length > 0) {
                    out[formFieldControls[i].name] = values.join(',');
                }
            } else if (formFieldControls[i].classList.contains('form-radios')) {

                let radioInputs = formFieldControls[i].querySelectorAll('label > input');

                out[formFieldControls[i].getAttribute('name')] = '';

                for(let r=0; r < radioInputs.length; r++) {
                    if (radioInputs[r].checked) {
                        out[formFieldControls[i].getAttribute('name')] = radioInputs[r].value.toString();
                    }
                }
            } else if (formFieldControls[i].classList.contains('form-checkboxes')) {

                let checkboxInputs = formFieldControls[i].querySelectorAll('label > input');
                let values = [];
                out[formFieldControls[i].getAttribute('name')] = '';

                for(let r=0; r < checkboxInputs.length; r++) {
                    if (checkboxInputs[r].checked) {
                        values[values.length] = checkboxInputs[r].value.toString();
                    }
                }
                if (values.length > 0) {
                    out[formFieldControls[i].getAttribute('name')] = values.join(',');
                }
            }
        }//end for

        return out;
    }
    /**
     * @param fields
     */
    fromErrorArray(fields = {})
    {
        let self = this, formFieldControls, formFieldError, formElement, formFieldControlsName;

        formFieldControls = self.#formElement.querySelectorAll('.form-element > .form-field > .form-field-control');

        for (let i = 0; i < formFieldControls.length; i++) {

            formFieldControlsName = formFieldControls[i].getAttribute('name');
            formElement = formFieldControls[i].parentElement.parentElement;
            formFieldError = formElement.querySelector('.form-error-div');

            if (formElement && formFieldError) {

                if (fields[formFieldControlsName] !== undefined) {

                    if (!formElement.classList.contains('error')) {
                        formElement.classList.add('error');
                    }

                    if (!formFieldError.classList.contains('form-error')) {
                        formFieldError.classList.add('form-error');
                    }

                    formFieldError.innerHTML = fields[formFieldControlsName];

                } else {

                    if (formElement.classList.contains('error')) {
                        formElement.classList.remove('error');
                    }

                    if (formFieldError.classList.contains('form-error')) {
                        formFieldError.classList.remove('form-error');
                    }

                    formFieldError.innerHTML = formFieldError.getAttribute('data-field-desc') ? formFieldError.getAttribute('data-field-desc') : '&nbsp;';
                }

            }
        }
    }
    /**
     *
     * @param fieldName
     * @param defValue
     * @returns {undefined|*}
     */
    getFieldValue(fieldName, defValue = undefined)
    {
        let self = this;

        let fieldValues = self.toArray();


        if (fieldValues[fieldName] !== undefined) {
            return fieldValues[fieldName];
        }

        return defValue;
    }
    /**
     *
     * @param fieldName
     * @param fieldValue
     */
    setFieldValue(fieldName, fieldValue)
    {
        let self = this;
        let fieldValues = {};
        fieldValues[fieldName] = fieldValue;
        self.fromArray(fieldValues);
    }
    /**
     *
     * @returns {*[]}
     */
    getFieldNames()
    {
        let self = this, formFieldControls, out = [];

        formFieldControls = self.#formElement.querySelectorAll('.form-element > .form-field > .form-field-control');

        for (let i = 0; i < formFieldControls.length; i++) {
            out[out.length] = formFieldControls[i].getAttribute('name');
        }
        return out;
    }
    /**
     *
     * @returns {{}}
     */
    getReadOnlyFields()
    {
        let self = this, formFieldControls, formFieldControlsName, inputs, out = {};

        formFieldControls = self.#formElement.querySelectorAll('.form-element > .form-field > .form-field-control');

        for (let i = 0; i < formFieldControls.length; i++) {
            formFieldControlsName = formFieldControls[i].getAttribute('name');

            if (formFieldControls[i].nodeName === 'INPUT' || formFieldControls[i].nodeName === 'TEXTAREA') {

                out[formFieldControlsName] = formFieldControls[i].readOnly;

            } else if (formFieldControls[i].nodeName === 'SELECT') {

                out[formFieldControlsName] = formFieldControls[i].disabled;

            } else if (formFieldControls[i].classList.contains('form-radios') || formFieldControls[i].classList.contains('form-checkboxes')) {

                inputs = formFieldControls[i].querySelectorAll('label > input');
                out[formFieldControlsName] = false;
                for(let r=0; r < inputs.length; r++) {
                    if (inputs[r].disabled !== false) {
                        out[formFieldControlsName] = true;
                        break;
                    }
                }
            }
        }
        return out;
    }
    /**
     *
     * @param fieldValues
     */
    setReadOnlyFields(fieldValues)
    {
        let self = this, formFieldControls, formFieldControlsName, fieldNames, inputs;

        formFieldControls = self.#formElement.querySelectorAll('.form-element > .form-field > .form-field-control');
        fieldNames = fieldValues.jsArrayKeys();

        for (let i = 0; i < formFieldControls.length; i++) {
            formFieldControlsName = formFieldControls[i].getAttribute('name');

            if (fieldNames.jsInArray(formFieldControlsName)) {
                if (formFieldControls[i].nodeName === 'INPUT' || formFieldControls[i].nodeName === 'TEXTAREA') {

                    formFieldControls[i].readOnly = fieldValues[formFieldControlsName];

                } else if (formFieldControls[i].nodeName === 'SELECT') {

                    formFieldControls[i].disabled = fieldValues[formFieldControlsName];

                } else if (formFieldControls[i].classList.contains('form-radios') || formFieldControls[i].classList.contains('form-checkboxes')) {

                    inputs = formFieldControls[i].querySelectorAll('label > input');

                    for(let r=0; r < inputs.length; r++) {
                        inputs[r].disabled = fieldValues[formFieldControlsName];
                    }
                }
            }
        }
    }
    /**
     * @param fieldNames string|array - '*' | 'key1,key2' | ['key1','key2']
     * @param value boolean
     */
    setReadOnly(fieldNames = '*', value = true)
    {
        let self = this, formFieldControls, formFieldControlsName, inputs;

        if (typeof fieldNames === "string") {
            if (fieldNames === '*') {
                fieldNames = self.getFieldNames();
            } else {
                fieldNames = fieldNames.split(',');
            }
        }

        formFieldControls = self.#formElement.querySelectorAll('.form-element > .form-field > .form-field-control');

        for (let i = 0; i < formFieldControls.length; i++) {
            formFieldControlsName = formFieldControls[i].getAttribute('name');

            if (fieldNames.jsInArray(formFieldControlsName)) {
                if (formFieldControls[i].nodeName === 'INPUT' || formFieldControls[i].nodeName === 'TEXTAREA') {

                    formFieldControls[i].readOnly = value;

                } else if (formFieldControls[i].nodeName === 'SELECT') {

                    formFieldControls[i].disabled = value;

                } else if (formFieldControls[i].classList.contains('form-radios') || formFieldControls[i].classList.contains('form-checkboxes')) {

                    inputs = formFieldControls[i].querySelectorAll('label > input');

                    for(let r=0; r < inputs.length; r++) {
                        inputs[r].disabled = value;
                    }
                }
            }
        }
    }

}
