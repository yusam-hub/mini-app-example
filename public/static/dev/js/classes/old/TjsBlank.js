let TjsBlank = function(options = {}) {

    this.jsYusam = window.jsYusam;

    let defOptions = {
    };

    this.options = this.jsYusam.mergeDeep(defOptions, options);

    this.lang = window.jsLangFunc('TjsBlank');

    this._init();

};

TjsBlank.prototype = {

    _init: function()
    {
        let self = this;

        this.jsYusam.domLoaded(function(){
            self._createForm();
        });
    },
    _createForm: function () {
        let self = this;
    }
}

export default TjsBlank;
