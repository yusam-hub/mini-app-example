let TjsBlank = function(options = {}) {

    let defOptions = {
    };

    this.options = js_object_merge_deep(defOptions, options);

    this.lang = js_lang_func('TjsBlank');

    this._init();

};

TjsBlank.prototype = {

    _init: function()
    {
        let self = this;

        window.jsGlob.domLoaded(function(){
            self._createForm();
        });
    },
    _createForm: function () {
        let self = this;
    }
}
