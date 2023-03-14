let TjsForm = function(formName, options = {}) {

    this.jsYusam = window.jsYusam;

    this.jsMsg = window.jsMsg;

    this.jsPost = window.jsPost;

    this._formElement = document.createElement('form');

    this._submitButtons = [];
    this._submitAButtons = [];

    this.defOptions = {
        'formName': formName,
        'formId': formName,
        'formAction': '#',
        'formMethod': 'post',
        'formActionUri' : window.location.pathname + window.location.search.toString(),
        'formActionConfirmMessage' : window.jsLangFunc('TjsMsg','content.messagePerform'),
        'onFormActionSave' : function(res){
            //console.log("jsForm.onFormActionSave", response);
        },
        'formFieldDefs': {},
    }

    this.options = this.jsYusam.mergeDeep(this.defOptions, options);

    this._init();

};

TjsForm.prototype = {

    _init: function()
    {
        let self = this;

        self._formElement.classList.add('form');
        self._formElement.classList.add('form-block');
        self._formElement.classList.add('form-fullwidth');
        self._formElement.method = self.options.formMethod;
        self._formElement.action = self.options.formAction;
        self._formElement.name = self.options.formName;
        self._formElement.id = self.options.formId;

        self.addFields(self.options.formFieldDefs);
    },
    /**
     *
     * @param fieldName
     * @param newOptions
     * @param formFieldControl
     * @returns {HTMLDivElement}
     * @private
     */
    _addField: function(formFieldControl, fieldName, newOptions = {})
    {
        let self = this;

        let options = self.jsYusam.mergeDeep({
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
        formField.append(formFieldError);
        formElement.append(formClear);
        self._formElement.append(formElement);

        return formFieldControl;
    },
    /**
     *
     * @param fieldDefs
     */
    addFields: function (fieldDefs = {}) {
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
    },
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldInputText: function(fieldName, newOptions = {})
    {
        let self = this;

        let options = self.jsYusam.mergeDeep({
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
    },
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldInputFile: function(fieldName, newOptions = {})
    {
        let self = this;

        let options = self.jsYusam.mergeDeep({
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
    },
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldTextArea: function(fieldName, newOptions = {})
    {
        let self = this;

        let options = self.jsYusam.mergeDeep({
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
    },
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldSelect: function(fieldName, newOptions = {})
    {
        let self = this;

        let options = self.jsYusam.mergeDeep({
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
    },
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldRadios: function(fieldName, newOptions = {})
    {
        let self = this;

        let options = self.jsYusam.mergeDeep({
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
    },
    /**
     *
     * @param fieldName string
     * @param newOptions object
     * @returns {HTMLInputElement}
     */
    addFieldCheckboxes: function(fieldName, newOptions = {})
    {
        let self = this;

        let options = self.jsYusam.mergeDeep({
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

        let values = options.fieldValue.split(',');

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
    },
    /**
     *
     * @param fieldName string
     * @param fieldValue string
     * @returns {HTMLInputElement}
     */
    addFieldInputHidden: function(fieldName, fieldValue)
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
        self._formElement.append(formElement);

        return formFieldControl;
    },
    /**
     *
     * @returns string
     */
    render: function()
    {
        return this._formElement.outerHTML;
    },
    /**
     *
     * @returns {HTMLFormElement}
     */
    form: function()
    {
        return this._formElement;
    },
    /**
     *
     * @param callback undefined|function - function(jsForm, callbackOptions){}
     * @param extraParams object
     * @param callbackOptions object
     * @returns {boolean}
     */
    save: function(callback = undefined, extraParams = {}, callbackOptions = {})
    {
        let self = this;

        if (!(typeof self.options.formActionUri === 'string' && self.options.formActionUri.length > 0)) return false;

        function post() {
            self.jsPost.request(self.options.formActionUri, Object.assign(self.toArray(), extraParams), function (statusCode, response, headers) {

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
        }

        if (!(typeof self.options.formActionConfirmMessage === 'string' && self.options.formActionConfirmMessage.length > 0)) {
            post();
            return true;
        }

        self.jsMsg.dialogConfirm(self.options.formActionConfirmMessage, {
            'buttons' : {
                'yes': {
                    'onClick' : function (formIndex) {
                        self.jsMsg.formClose(formIndex);
                        post();
                    }
                }
            }
        });

        return true;
    },
    /**
     *
     * @param res
     * @private
     */
    _doOnFormActionSave: function(res)
    {
        /**
         * Убираем старые ошибки ошибки
         */
        this.fromErrorArray([], true);

        /**
         * Если статус ERROR
         */
        if (res['response']['status'] === 'error' && typeof res['response']['errorData'] === 'object') {

            this.fromErrorArray(res['response']['errorData'], true);

            if (typeof res['response']['errorMessage'] === 'string') {
                this.jsMsg.dialogError(res['response']['errorMessage']);
            }

        } else if (res['response']['status'] === 'ok' && res['formId'] !== undefined) {

            /**
             * Очищаем контрол с файлами, так как мы успешно загрузили
             * @type {NodeListOf<Element>}
             */
            let formFieldControls = document.querySelectorAll('form#' + res['formId'] + ' > .form-element > .form-field > .form-field-control');
            for (let i = 0; i < formFieldControls.length; i++) {
                if (formFieldControls[i].nodeName === 'INPUT' && formFieldControls[i].type.toString() === 'file') {
                    formFieldControls[i].value = '';
                }
            }
        }

        if (typeof this.options.onFormActionSave === "function") {
            this.options.onFormActionSave(res);
        }
    },
    /**
     *
     * @param fields
     * @param afterRender
     */
    fromArray: function(fields = {}, afterRender = true)
    {
        let self = this, formFieldControls;

        if (afterRender === true) {
            formFieldControls = document.querySelectorAll('form#' + self.options.formId + ' > .form-element > .form-field > .form-field-control');
        } else {
            formFieldControls = self._formElement.querySelectorAll('.form-element > .form-field > .form-field-control');
        }

        for (let i = 0; i < formFieldControls.length; i++) {

            if (fields[formFieldControls[i].getAttribute('name')] !== undefined)
            {
                if (formFieldControls[i].nodeName === 'INPUT' || formFieldControls[i].nodeName === 'TEXTAREA') {
                    if (afterRender) {

                        formFieldControls[i].value = fields[formFieldControls[i].name].toString();

                    } else {

                        formFieldControls[i].defaultValue = fields[formFieldControls[i].name].toString();

                    }
                } else if (formFieldControls[i].nodeName === 'SELECT') {

                    if (formFieldControls[i].multiple) {

                        let values = fields[formFieldControls[i].name].toString().split(",");

                        if (afterRender) {

                            for (let o = 0; o < formFieldControls[i].options.length; o++) {
                                if (values.includes(formFieldControls[i].options[o].value)) {
                                    formFieldControls[i].options[o].selected = true;
                                } else {
                                    formFieldControls[i].options[o].selected = false;
                                }
                            }

                        } else {

                            for (let o = 0; o < formFieldControls[i].options.length; o++) {
                                if (values.includes(formFieldControls[i].options[o].value)) {
                                    formFieldControls[i].options[o].defaultSelected = true;
                                } else {
                                    formFieldControls[i].options[o].defaultSelected = false;
                                }
                            }
                        }

                    } else {

                        let values = fields[formFieldControls[i].name].toString().split(",");

                        if (afterRender) {

                            formFieldControls[i].value = values[0];

                        } else {

                            let item = formFieldControls[i].options.namedItem(formFieldControls[i].id + "_" + values[0]);

                            if (item) {
                                item.defaultSelected = true;
                            }
                        }
                    }
                } else if (formFieldControls[i].classList.contains('form-radios')) {

                    let radioInputs = formFieldControls[i].querySelectorAll('label > input');

                    for(let r=0; r < radioInputs.length; r++) {
                        if (afterRender) {
                            radioInputs[r].checked = radioInputs[r].value.toString() === fields[formFieldControls[i].getAttribute('name')].toString();
                        }  else {
                            radioInputs[r].defaultChecked = radioInputs[r].defaultValue.toString() === fields[formFieldControls[i].getAttribute('name')].toString();
                        }
                    }
                } else if (formFieldControls[i].classList.contains('form-checkboxes')) {

                    let checkboxInputs = formFieldControls[i].querySelectorAll('label > input');
                    let values = fields[formFieldControls[i].getAttribute('name')].split(",");

                    for(let r=0; r < checkboxInputs.length; r++) {
                        if (afterRender) {
                            checkboxInputs[r].checked = !!values.includes(checkboxInputs[r].value.toString());
                        }  else {
                            checkboxInputs[r].defaultChecked = !!values.includes(checkboxInputs[r].value.toString());
                        }
                    }
                }
            }//end !undefined
        }//end for
    },
    /**
     *
     * @param afterRender
     * @returns {{}}
     */
    toArray: function(afterRender = true)
    {
        let self = this, formFieldControls;

        let out = {};

        if (afterRender === true) {
            formFieldControls = document.querySelectorAll('form#' + self.options.formId + ' > .form-element > .form-field > .form-field-control');
        } else {
            formFieldControls = self._formElement.querySelectorAll('.form-element > .form-field > .form-field-control');
        }

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

                if (afterRender) {

                    for (let o = 0; o < formFieldControls[i].options.length; o++) {
                        if (formFieldControls[i].options[o].selected === true) {
                            values[values.length] = formFieldControls[i].options[o].value;
                        }
                    }

                } else {

                    for (let o = 0; o < formFieldControls[i].options.length; o++) {
                        if (formFieldControls[i].options[o].defaultSelected === true) {
                            values[values.length] = formFieldControls[i].options[o].value;
                        }
                    }
                }
                if (values.length > 0) {
                    out[formFieldControls[i].name] = values.join(',');
                }
            } else if (formFieldControls[i].classList.contains('form-radios')) {

                let radioInputs = formFieldControls[i].querySelectorAll('label > input');

                out[formFieldControls[i].getAttribute('name')] = '';

                for(let r=0; r < radioInputs.length; r++) {
                    if (afterRender) {
                        if (radioInputs[r].checked) {
                            out[formFieldControls[i].getAttribute('name')] = radioInputs[r].value.toString();
                        }
                    }  else {
                        if (radioInputs[r].defaultChecked) {
                            out[formFieldControls[i].getAttribute('name')] = radioInputs[r].defaultValue.toString();
                        }
                    }
                }
            } else if (formFieldControls[i].classList.contains('form-checkboxes')) {

                let checkboxInputs = formFieldControls[i].querySelectorAll('label > input');
                let values = [];
                out[formFieldControls[i].getAttribute('name')] = '';

                for(let r=0; r < checkboxInputs.length; r++) {
                    if (afterRender) {
                        if (checkboxInputs[r].checked) {
                            values[values.length] = checkboxInputs[r].value.toString();
                        }
                    }  else {
                        if (checkboxInputs[r].defaultChecked) {
                            values[values.length] = checkboxInputs[r].defaultValue.toString();
                        }
                    }
                }
                if (values.length > 0) {
                    out[formFieldControls[i].getAttribute('name')] = values.join(',');
                }
            }
        }//end for

        return out;
    },
    /**
     *
     * @param fields
     * @param afterRender
     */
    fromErrorArray: function(fields = {}, afterRender = true)
    {
        let self = this, formFieldControls, formFieldError, formElement, formFieldControlsName;

        if (afterRender === true) {
            formFieldControls = document.querySelectorAll('form#' + self.options.formId + ' > .form-element > .form-field > .form-field-control');
        } else {
            formFieldControls = self._formElement.querySelectorAll('.form-element > .form-field > .form-field-control');
        }

        for (let i = 0; i < formFieldControls.length; i++) {

            formFieldControlsName = formFieldControls[i].getAttribute('name');
            formElement = formFieldControls[i].parentElement.parentElement;
            formFieldError = formFieldControls[i].nextSibling;

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
    },
    /**
     *
     * @param fieldNames
     * @param value
     * @param afterRender
     */
    setReadOnly: function(fieldNames, value, afterRender = true)
    {
        let self = this, formFieldControls, formFieldControlsName, inputs;

        if (afterRender === true) {
            formFieldControls = document.querySelectorAll('form#' + self.options.formId + ' > .form-element > .form-field > .form-field-control');
        } else {
            formFieldControls = self._formElement.querySelectorAll('.form-element > .form-field > .form-field-control');
        }

        for (let i = 0; i < formFieldControls.length; i++) {
            formFieldControlsName = formFieldControls[i].getAttribute('name');

            if (fieldNames.includes(formFieldControlsName)) {
                if (formFieldControls[i].nodeName === 'INPUT' || formFieldControls[i].nodeName === 'TEXTAREA') {

                    formFieldControls[i].readOnly = value;

                } else if (formFieldControls[i].nodeName === 'SELECT') {

                    if (value) {
                        formFieldControls[i].setAttribute('disabled', true);
                    } else {
                        formFieldControls[i].removeAttribute('disabled');
                    }

                } else if (formFieldControls[i].classList.contains('form-radios') || formFieldControls[i].classList.contains('form-checkboxes')) {

                    inputs = formFieldControls[i].querySelectorAll('label > input');

                    for(let r=0; r < inputs.length; r++) {
                        if (afterRender) {
                            inputs[r].disabled = value;
                        }  else {
                            if (value) {
                                inputs[r].setAttribute('disabled', true);
                            } else {
                                inputs[r].removeAttribute('disabled');
                            }
                        }
                    }
                }
            }
        }
    }
}

export default TjsForm;