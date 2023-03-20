"use strict";
class TjsUrlDataConnector extends TjsDataConnector
{
    #url;
    #jsPost;
    #showJsWait;
    constructor(dataSource, url, showJsWait, jsPost = undefined, options = {}) {

        super(dataSource, options);
        this.#url = url;
        this.#showJsWait = showJsWait;
        this.#jsPost = jsPost;
        if (this.#jsPost === undefined) {
            this.#jsPost = window.jsPost;
        }
    }

    doFetch(params)
    {
        let self = this;
        this.#jsPost.request(this.#url, params, function (status, response, responseHeaders) {
            if (response.status === 'ok') {
                self.dataSource.data = response.data;
            } else {
                self.dataSource.doDataUndefined();
            }
        }, this.#showJsWait);
    }
}