let TjsPost = function(jsYusam, jsWait) {
    this.jsYusam = jsYusam;
    this.jsWait = jsWait;
    this.lang = window.jsLangFunc('TjsPost');
};

TjsPost.prototype = {
    /**
     *
     * @param requestUri : string
     * @param requestData : object
     * @param responseCallback : function (statusCode, response, headers){}
     * @param showJsWait : boolean
     */
    request(requestUri, requestData, responseCallback, showJsWait = true)
    {
        let self = this;
        let xhr = new XMLHttpRequest();
        let networkError = self.lang.networkError;

        try {

            if (showJsWait) {
                self.jsWait.show();
            }
            let multipartFormData = false;
            let requestDataIsFormData = false;
            let formData = new FormData();

            if (typeof requestData === 'object' && requestData.constructor.name === 'FormData') {
                requestDataIsFormData = true;
            } else {
                for (const [key, value] of Object.entries(requestData)) {
                    if (typeof value === 'object' && value.constructor.name === 'FileList') {
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
            xhr.setRequestHeader('X-CSRF-TOKEN', self.jsYusam.headMetaContent('csrf-token'));

            if (requestDataIsFormData === true) {
                xhr.send(requestData);
            } else {
                if (multipartFormData === true) {
                    xhr.send(formData);
                } else {
                    xhr.setRequestHeader('Content-type', 'application/json');
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

                                console.log("responseCallback is not function");

                            }

                        } else {

                            let errorMessage = networkError;

                            if (xhr.response.errorMessage !== undefined) {
                                errorMessage = xhr.response.errorMessage;
                            }

                            responseCallback(xhr.status, {
                                'status' : 'error',
                                'errorMessage': errorMessage
                            }, responseHeaders);

                        }

                    } finally {

                        if (showJsWait) {
                            self.jsWait.hide();
                        }

                    }
                }
            };

        } catch (e) {

            if (showJsWait) {
                self.jsWait.hide();
            }

        }
    }
}

export default TjsPost;