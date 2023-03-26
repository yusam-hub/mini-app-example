"use strict";
class TjsPost extends TjsBase
{
    #jsWait;

    /**
     *
     * @param jsWait TjsWait
     * @param options object
     */
    constructor(jsWait, options = {}) {
        if (!(jsWait instanceof TjsWait)) {
            throw Error("jsWait is not instance of TjsWait");
        }
        super(options);
        this.#jsWait = jsWait;
    }

    request(requestUri, requestData, responseCallback, showJsWait = true)
    {
        let self = this;
        let xhr = new XMLHttpRequest();
        let networkError = self.lang.jsPropertyByDotKey('networkError');

        try {

            if (showJsWait) {
                self.#jsWait.show();
            }
            let multipartFormData = false;
            let requestDataIsFormData = false;
            let formData = new FormData();

            if (js_is_object(requestData) && requestData.constructor.name === 'FormData') {
                requestDataIsFormData = true;
            } else {
                for (const [key, value] of Object.entries(requestData)) {
                    if (js_is_object(value) && value.constructor.name === 'FileList') {
                        for (let i = 0; i < value.length; i++) {
                            formData.set(key + i, value[i]);
                            multipartFormData = true;
                        }
                        formData.set(key, value.length);
                    } else {
                        formData.set(key, value.toString());
                    }
                }

            }

            xhr.withCredentials = true;
            //xhr.timeout = 10000;
            xhr.responseType = 'json';
            xhr.open('POST', window.location.protocol + "//" + window.location.hostname + requestUri);
            xhr.setRequestHeader('Accept', 'application/json');

            if (requestDataIsFormData === true) {
                xhr.send(requestData);
            } else {
                if (multipartFormData === true) {
                    xhr.send(formData);
                } else {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(requestData));
                }
            }

            xhr.upload.onprogress = function (e) {
                let percent = '0';
                let percentage = '0%';

                if (e.lengthComputable) {
                    percent = Math.round((e.loaded / e.total) * 100);
                    percentage = percent + '%';
                }
                console.log(percentage, percent);
                console.log(e.loaded + ' / ' + e.total);
            };

            xhr.onreadystatechange = function() {

                if (xhr.readyState === 4) {

                    try {

                        let responseHeaders = xhr
                            .getAllResponseHeaders()
                            .split('\r\n')
                            .reduce((result, current) => {
                                let [name, value] = current.split(': ');
                                result[name] = value;
                                return result;
                            }, {});

                        delete responseHeaders[""];

                        if (xhr.status === 200) {

                            if (typeof (responseCallback) === 'function') {

                                responseCallback(xhr.status, xhr.response, responseHeaders);

                            } else {

                                throw Error("responseCallback is not function");

                            }

                        } else {

                            let errorMessage = networkError;
                            let errorData = {};

                            if (xhr.response.errorMessage !== undefined) {
                                errorMessage = xhr.response.errorMessage;
                            }

                            if (xhr.response.errorData !== undefined) {
                                errorData = xhr.response.errorData;
                            }

                            responseCallback(
                                xhr.status,
                                js_json_error(errorMessage, errorData),
                                responseHeaders
                            );

                        }

                    } finally {

                        if (showJsWait) {
                            self.#jsWait.hide();
                        }

                    }
                }
            };

        } catch (e) {

            if (showJsWait) {
                self.#jsWait.hide();
            }

        }
    }
}