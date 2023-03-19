"use strict";

class TjsMsg extends TjsMsgBase
{
    constructor(options = {})
    {
        super(options);
    }
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogInfo(mainMessage, newOptions = {}) {

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
    }
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogSuccess(mainMessage, newOptions = {}) {

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
    }
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogError(mainMessage, newOptions = {}) {

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
    }
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogWarning(mainMessage, newOptions = {}) {

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
    }
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogConfirm(mainMessage, newOptions = {}) {

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
    }
    /**
     *
     * @param mainMessage
     * @param newOptions
     */
    dialogDeleteConfirm(mainMessage, newOptions = {}) {

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
    }


    dialogInputForm(jsForm, msgOptions = {}) {

        let self = this;

        let options = js_object_merge_deep({
            'formTitle' : '&nbsp;',
            'formWidth': 320,
            'buttons': {}
        }, msgOptions);

        self.formCustom({
            formTitle: options.formTitle,
            onFormContent(el){
                el.append(jsForm.form());
            },
            formWidth: options.formWidth,
            buttons: options.buttons,
        });
    }

    dialogInputFormConfirm(jsForm, msgOptions = {}) {

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
        }, msgOptions);

        options.buttons.ok.onClick = function(formIndex) {
            self.save(
                function(res){
                    if (res['response']['status'] === 'ok') {
                        self.formClose(res.callbackOptions.jsFormParentFormIndex);
                    }
                },
                {},
                {'jsFormParentFormIndex' : formIndex}
            );
        };

        self.dialogInputForm(jsForm, options);
    }


    dialogInputFormConfirmAdd(jsForm) {

        let self = this;
        self.dialogInputFormConfirm(jsForm,{
            'formTitle' : self.lang.dialog.formAddTitle,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.addTitle,
                },
            }
        });
    }

    dialogInputFormConfirmSave(jsForm) {

        let self = this;
        self.dialogInputFormConfirm(jsForm,{
            'formTitle' : self.lang.dialog.formSaveTitle,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.saveTitle,
                },
            }
        });
    }

    dialogInputFormConfirmDelete(jsForm)
    {
        let self = this;
        self.dialogInputFormConfirm(jsForm,{
            'formTitle' : self.lang.dialog.formDeleteTitle,
            'buttons': {
                'ok': {
                    'title' : self.lang.button.deleteTitle,
                },
            }
        });
    }
}
