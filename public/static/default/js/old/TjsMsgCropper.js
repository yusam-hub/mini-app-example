let TjsMsgCropper = function(CropperClass) {
    this.CropperClass = CropperClass;
    this.lang = js_lang_func('TjsMsg');
};

TjsMsgCropper.prototype = {
    /**
     *
     * @param fileElement
     * @param newOptions
     */
    fileBind: function(fileElement, newOptions = {}) {

        let self = this;

        if (!fileElement) return;

        const options = js_object_merge_deep({
            'fileAccept' : '.png, .jpg, .jpeg',
            'requestUri' : window.location.pathname + window.location.search.toString(),
            'cropRounded': false,
            'cropSizes' : [
                {'w': 640, 'h': 480},
            ],
            'cropperClassOptions' : {
                preview : '.msg-cropper-preview-img',
            },
            'onPostCompleted': function(statusCode, response, headers) {

            }
        }, newOptions);

        let globalCropper;

        fileElement.accept = options.fileAccept;

        function saveCropper(uri, fieldName, onSuccessSavedCallback)
        {
            function getRoundedCanvas(sourceCanvas) {
                if (options.cropRounded !== true) {
                    return sourceCanvas;
                }
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                let width = sourceCanvas.width;
                let height = sourceCanvas.height;

                canvas.width = width;
                canvas.height = height;
                context.imageSmoothingEnabled = false;
                context.drawImage(sourceCanvas, 0, 0, width, height);
                context.globalCompositeOperation = 'destination-in';
                context.beginPath();
                context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
                context.fill();
                return canvas;
            }

            function saveFormData(formDataForSave)
            {
                window.jsPost.request(uri, formDataForSave, function (statusCode, response, headers) {
                    if (statusCode === 200 && response['status'] === 'ok') {
                        if (typeof onSuccessSavedCallback === 'function') {
                            onSuccessSavedCallback();
                        }
                    }
                    if (typeof options.onPostCompleted === 'function') {
                        options.onPostCompleted(statusCode, response, headers);
                    }
                });
            }

            let resultCanvas;
            let formData = new FormData();
            formData.set(fieldName, options.cropSizes.length);

            for(let i = 0; i < options.cropSizes.length; i++) {

                formData.set(fieldName+'CropSizeW'+i, options.cropSizes[i].w);
                formData.set(fieldName+'CropSizeH'+i, options.cropSizes[i].h);

                resultCanvas = getRoundedCanvas(globalCropper.getCroppedCanvas({
                    width: options.cropSizes[i].w,
                    height: options.cropSizes[i].h,
                    imageSmoothingEnabled: false,
                    imageSmoothingQuality: 'high',
                }));

                resultCanvas.toBlob(function (blob) {
                    formData.set(fieldName+i, blob);
                    if (i === options.cropSizes.length-1) {
                        saveFormData(formData);
                    }
                });
            }
        }

        function onFileElementChange()
        {
            const file = this.files[0];

            if (!file) return;

            if (!file.type.includes('image/')) return;

            const imageSrc = URL.createObjectURL(file);

            if (!imageSrc) return;

            let formDataHTML = [
                '<div class="msg-cropper-original-img-container',(options.cropRounded ? '-rounded' : ''),'">',
                '<img class="msg-cropper-original-img" src="" alt="">',
                '</div>',
                '<div class="msg-cropper-preview-img-container">',
                '<div class="msg-cropper-preview-img msg-cropper-preview-150',(options.cropRounded ? ' rounded' : ''),'"></div>',
                '<div class="msg-cropper-preview-img msg-cropper-preview-100',(options.cropRounded ? ' rounded' : ''),'"></div>',
                '<div class="msg-cropper-preview-img msg-cropper-preview-50',(options.cropRounded ? ' rounded' : ''),'"></div>',
                '</div>',
                '<div class="clear-both"></div>'
            ].join('');

            window.jsMsg.formCustom({
                formTitle: js_lang_func('TjsMsg', 'dialog.formSaveTitle'),
                formContent: formDataHTML,
                formWidth: '480px',
                onFormShow: function(formIndex){
                    const image = document.querySelector('#jmsgForm'+formIndex).querySelector('.msg-cropper-original-img');

                    image.addEventListener('load', function (){
                        const interval = setInterval(() => {
                            if (image.naturalWidth > 0 && image.naturalHeight > 0) {
                                clearInterval(interval);
                                window.jsMsg.formResize(formIndex);
                                globalCropper = new self.CropperClass(image, options.cropperClassOptions);
                            }
                        }, 20);
                    });

                    image.src = imageSrc;
                },
                onFormClose: function(formIndex){
                    if (globalCropper) {
                        globalCropper.destroy();
                    }
                    fileElement.value = '';
                },
                buttons: {
                    'save': {
                        'title' : js_lang_func('TjsMsg', 'button.saveTitle'),
                        'onClick': function(formIndex) {
                            const previewFormIndex = formIndex;
                            window.jsMsg.dialogConfirm(js_lang_func('TjsMsg', 'content.messageSave'), {
                                'buttons' : {
                                    'yes': {
                                        'onClick': function(formIndex) {
                                            window.jsMsg.formClose(formIndex);
                                            saveCropper(options.requestUri, fileElement.id, function(){
                                                window.jsMsg.formClose(previewFormIndex);
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    },
                    'cancel': {
                        'title' : js_lang_func('TjsMsg', 'button.cancelTitle'),
                        'onClick': function(formIndex) {
                            window.jsMsg.formClose(formIndex);
                        }
                    },
                },
            });
        }

        fileElement.addEventListener('change', onFileElementChange);
    }
}
