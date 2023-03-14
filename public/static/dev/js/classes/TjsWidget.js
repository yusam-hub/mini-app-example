let TjsWidget = function(tagId, options = {}) {

    let defOptions = {
        'uri': null,
        'data': null,
        'onDataChanged' : function(el,data){},
    };

    this.options = js_object_merge_deep(defOptions, options);

    this.el = document.getElementById(tagId);

    if (typeof(this.options.onDataChanged) === "function") {
        this.options.onDataChanged(this.el, this.options.data);
    }
};

TjsWidget.prototype = {
    /**
     *
     * @param params
     */
    updateData: function(params = {})
    {
        let self = this;

        window.jsPost.request(self.options.uri, params, function (statusCode, response, headers) {
            if (statusCode === 200) {
                self.options.data = response.data;
                if (typeof(self.options.onDataChanged) === "function") {
                    self.options.onDataChanged(self.el, self.options.data);
                }
            } else {
                self.options.data = null;
                if (typeof(self.options.onDataChanged) === "function") {
                    self.options.onDataChanged(self.el, self.options.data);
                }
            }
        });
    },
    /**
     *
     * @returns {null}
     */
    getData: function()
    {
        let self = this;
        return self.options.data;
    }
}

