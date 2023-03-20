"use strict";
class TjsUrlDataConnector extends TjsDataConnector
{
    #url;
    #jsPost;
    #showJsWait;
    constructor(url, showJsWait, jsPost = undefined, options = {}) {

        super(options);
        this.#url = url;
        this.#showJsWait = showJsWait;
        this.#jsPost = jsPost;
        if (this.#jsPost === undefined) {
            this.#jsPost = window.jsPost;
        }
    }

    getRequestData()
    {
        return {};
    }

    doFetch(params)
    {
        let self = this;
        this.#jsPost.request(this.#url, js_object_merge_deep(this.getRequestData(), params), function (status, response, responseHeaders) {
            if (response.status === 'ok') {
                self.dataSource.data = response.data;
            } else {
                self.dataSource.doDataUndefined();
            }
        }, this.#showJsWait);
    }
}