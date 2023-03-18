<div class="entry">
    <h3>TjsToggles</h3>

    <div class="toggles jsToggles">

        <div class="toggle">
            <h4 class="toggle-header ">Toggle One</h4>

            <div class="toggle-box">
                <p class="ta_j">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>

        <div class="toggle">
            <h4 class="toggle-header ">Toggle Two</h4>

            <div class="toggle-box">
                <p class="ta_j">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>

        <div class="toggle">
            <h4 class="toggle-header ">Toggle Three</h4>

            <div class="toggle-box">
                <p class="ta_j">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    </div>

    <div class="clear"></div>

    <div class="h-sep-1"></div>

    <h3>TjsTabs</h3>

    <div class="jsTabs">

        <ul class="tabs-nav-h">
            <li class="active"><a >One</a></li>
            <li><a >Two</a></li>
            <li><a >Three</a></li>
        </ul>

        <div class="tabs">
            <!-- tab 1 -->
            <div class="tab">
                <div class="tab-inner">
                    <p class="ta_j">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
                </div>
            </div>

            <!-- tab 2 -->
            <div class="tab">
                <div class="tab-inner">
                    <p class="ta_j">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p class="ta_j">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
                </div>
            </div>

            <!-- tab 3 -->
            <div class="tab">
                <div class="tab-inner">
                    <p class="ta_j">Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio.</p>
                </div>
            </div>
        </div>

    </div>

    <div class="h-sep-1"></div>

    <h3>TjsWait</h3>
    <p><button class="button button-black" id="button_js_wait">Show (5 sec)</button></p>

    <h3>TjsMsg</h3>
    <p>
        <button class="button button-black" id="dialogInfo">Info</button>
        <button class="button button-black" id="dialogSuccess">Success</button>
        <button class="button button-black" id="dialogError">Error</button>
        <button class="button button-black" id="dialogWarning">Warning</button>
        <button class="button button-black" id="dialogConfirm">Confirm</button>
        <button class="button button-black" id="dialogDeleteConfirm">Delete Confirm</button>
        <button class="button button-black" id="dialogInputForm">Input Form</button>
        <button class="button button-black" id="dialogInputFormConfirm">Input Form Confirm</button>
        <button class="button button-black" id="dialogInputFormConfirmAdd">Input Form Confirm Add</button>
        <button class="button button-black" id="dialogInputFormConfirmSave">Input Form Confirm Save</button>
        <button class="button button-black" id="dialogInputFormConfirmDel">Input Form Confirm Del</button>
    </p>

    <h3>TjsForm First</h3>
    <div id="jsFormFirstPlacement">
    </div>
    <p><button class="button button-black" id="jsFormFirst_save">First Save</button></p>
    <div class="clear"></div>
</div>

{literal}
<script type="text/javascript">

    window.jsGlob.winReady(function(){

        new TjsTabs('.jsTabs');

        new TjsToggles('.jsToggles');

        document.querySelector("#button_js_wait").addEventListener('click', function (e){
            window.jsWait.show(5);
        });
        document.querySelector("#dialogInfo").addEventListener('click', function (e){
            window.jsMsg.dialogInfo(this.innerHTML);
        });
        document.querySelector("#dialogSuccess").addEventListener('click', function (e){
            window.jsMsg.dialogSuccess(this.innerHTML);
        });
        document.querySelector("#dialogError").addEventListener('click', function (e){
            window.jsMsg.dialogError(this.innerHTML);
        });
        document.querySelector("#dialogWarning").addEventListener('click', function (e){
            window.jsMsg.dialogWarning(this.innerHTML);
        });
        document.querySelector("#dialogConfirm").addEventListener('click', function (e){
            window.jsMsg.dialogConfirm(this.innerHTML);
        });
        document.querySelector("#dialogDeleteConfirm").addEventListener('click', function (e){
            window.jsMsg.dialogDeleteConfirm(this.innerHTML);
        });

        document.querySelector("#dialogInputForm").addEventListener('click', function (e){
            let jsInputForm = new TjsForm('jsInputForm', {});
            jsInputForm.addFieldInputText('text1', {
                'fieldLabel' : 'text1',
                'readOnly' : false,
            });
            window.jsMsg.dialogInputForm(jsInputForm);
        });

        function dialogInputFormConfirm(typ = 'def')
        {
            let jsInputForm = new TjsForm('jsInputForm', {
                'formActionUri' : function(fieldValues) {
                    if (fieldValues['text1'] === 'error') {
                        return js_json_error('Invalid values', {
                            'text1': 'some error',
                        })
                    } else {
                        return js_json_ok(fieldValues)
                    }
                },
                'onFormActionSave' : function (res) {
                    console.log('onFormActionSave', res);
                }
            });
            jsInputForm.addFieldInputText('text1', {
                'fieldLabel' : 'text1',
                'readOnly' : false,
                'fieldValue' : 'error',
            });
            if (typ === 'add') {
                window.jsMsg.dialogInputFormConfirmAdd(jsInputForm);
            } else if (typ === 'save') {
                window.jsMsg.dialogInputFormConfirmSave(jsInputForm);
            } else if (typ === 'del') {
                window.jsMsg.dialogInputFormConfirmDelete(jsInputForm);
            } else {
                window.jsMsg.dialogInputFormConfirm(jsInputForm);
            }
        }

        document.querySelector("#dialogInputFormConfirm").addEventListener('click', function (e){
            dialogInputFormConfirm('def');
        });

        document.querySelector("#dialogInputFormConfirmAdd").addEventListener('click', function (e){
            dialogInputFormConfirm('add');
        });

        document.querySelector("#dialogInputFormConfirmSave").addEventListener('click', function (e){
            dialogInputFormConfirm('save');
        });

        document.querySelector("#dialogInputFormConfirmDel").addEventListener('click', function (e){
            dialogInputFormConfirm('del');
        });

        let jsFormFirst = new TjsForm('jsFormFirst', {
            'formActionUri' : window.location.pathname + '/js-form-first-save',
            'onFormActionSave' : function (res) {
                //console.log('onFormActionSave', res);
            }
        });

        jsFormFirst.addFieldInputText('text1', {
            'fieldLabel' : 'text1',
            'readOnly' : false,
        });
        jsFormFirst.addFieldInputText('text2', {
            'fieldLabel' : 'text2',
            'readOnly' : true,
        });
        jsFormFirst.addFieldCheckboxes('check1', {
            'fieldLabel' : 'check1',
            'readOnly' : false,
            'fieldOptions' : [
                {'value': '1', 'html' :' val 1'},
                {'value': '2', 'html' :' val 2'},
                {'value': '3', 'html' :' val 3'},
            ],
            'inline' : true,
        });
        jsFormFirst.addFieldCheckboxes('check2', {
            'fieldLabel' : 'check2',
            'readOnly' : true,
            'fieldOptions' : [
                {'value': '1', 'html' :' val 1'},
                {'value': '2', 'html' :' val 2'},
                {'value': '3', 'html' :' val 3'},
            ],
            'inline' : false,
        });
        jsFormFirst.addFieldRadios('radio1', {
            'fieldLabel' : 'radio1',
            'readOnly' : false,
            'fieldOptions' : [
                {'value': '1', 'html' :' val 1'},
                {'value': '2', 'html' :' val 2'},
                {'value': '3', 'html' :' val 3'},
            ],
            'inline' : true,
        });
        jsFormFirst.addFieldRadios('radio2', {
            'fieldLabel' : 'radio2',
            'readOnly' : true,
            'fieldOptions' : [
                {'value': '1', 'html' :' val 1'},
                {'value': '2', 'html' :' val 2'},
                {'value': '3', 'html' :' val 3'},
            ],
            'inline' : false,
        });
        jsFormFirst.addFieldSelect('select1', {
            'fieldLabel' : 'select1',
            'readOnly' : false,
            'fieldOptions' : [
                {'value': '1', 'html' :' val 1'},
                {'value': '2', 'html' :' val 2'},
                {'value': '3', 'html' :' val 3'},
            ],
        });
        jsFormFirst.addFieldInputHidden('tableId', 12345);
        jsFormFirst.addFieldSelect('select2', {
            'fieldLabel' : 'select2',
            'readOnly' : true,
            'fieldOptions' : [
                {'value': '1', 'html' :' val 1'},
                {'value': '2', 'html' :' val 2'},
                {'value': '3', 'html' :' val 3'},
            ],
        });

        jsFormFirst.addFieldSelect('savingMode', {
            'fieldLabel' : 'savingMode',
            'fieldOptions' : [
                {'value': 'ok', 'html' : 'Saving OK'},
                {'value': 'error', 'html' : 'Saving Error'},
            ],
        });

        let jsTableDiv = js_create_el('div','jsTable');
        jsFormFirst.addFieldExtraFormFieldElement('searchId', jsTableDiv, {
            'fieldLabel' : 'searchId',
        });
        let jsTable = new TjsTable(jsTableDiv, {
            'initLocationSearch': false,
            'replaceHistorySearch': false,
            'settings' : {
                'renderPanelTable': false,
            },
            'requestUri' : function(params) {
                //console.log(params);

                let data = [];

                for(let i=1; i <= 20; i++) {
                    data[data.length] = {
                        'id': i,
                        'email': 'email'+i+'@domain.zone',
                    };
                }

                return js_json_ok({
                    'query' : params,
                    'data' :  data,
                });
            },
            'fields' : [
                {
                    'width' : '20%',
                    'fieldName' : 'id',
                    'fieldLabel' : 'ID',
                    'filter': {
                        'type': 'select',
                        'options': [
                            {'value': '', 'innerHTML' : ''},
                            {'value': '1', 'innerHTML' : 'ID 1'},
                            {'value': '2', 'innerHTML' : 'ID 2'},
                        ],
                    },
                    'onDrawDataCell': function(td, row){},
                    'onDrawFooterCell': function(td, rows){},
                },
                {
                    'fieldName' : 'email',
                    'fieldLabel' : 'E-mail',
                    'filter': {
                        'type': 'text',
                    },
                    'onDrawDataCell': function(td, row){},
                    'onDrawFooterCell': function(td, rows){},
                },
                {
                    'width' : '1%',
                    'fieldName' : '',
                    'fieldLabel' : '&nbsp;',
                    'onDrawDataCell': function(td, row){
                        td.innerHTML = '';
                        let a = document.createElement('a');
                        a.classList.add('button');
                        a.classList.add('button-black');
                        a.innerHTML = '...';
                        a.href="#";
                        a.addEventListener('click', function (){
                            alert('test');
                        });
                        td.append(a);
                    },
                    'onDrawFooterCell': function(td, rows){},
                }
            ],
            'onRowSelected': function(row){
                if (row !== undefined) {
                    jsFormFirst.setFieldValue('searchId', row['id']);
                } else {
                    jsFormFirst.setFieldValue('searchId', '');
                }
            },
        });
        jsTable.open();

        /*jsFormFirst.fromArray({
            'text1': 'value1',
            'text2': 'value2',
            'check1': 2,
            'check2': 2,
            'radio1': 2,
            'radio2': 2,
            'select1': 2,
            'select2': 2,
        });*/

        jsFormFirst.fromErrorArray({
            'searchId': 'invalid value',
        })

        jsFormFirst.appendForSelector('#jsFormFirstPlacement');

        /*let saveReadOnlyFields = jsFormFirst.getReadOnlyFields();
        jsFormFirst.setReadOnly();
        jsFormFirst.setReadOnlyFields(saveReadOnlyFields);*/


        document.querySelector("#jsFormFirst_save").addEventListener('click', function (e){
            jsFormFirst.save(function(res){
                console.log("onButtonClickSaveCallback", res);

            });
            //console.log(jsFormFirst.toArray());
            //jsFormFirst.fromErrorArray({});
            //jsFormFirst.setReadOnly(['text2','check2','radio2','select2'], false);
        });


        /*const vertical_menu = document.getElementById('vertical_menu');

        if (vertical_menu) {

            const verticalMenuActive = vertical_menu.querySelector('.vertical-menu-active');
            if (verticalMenuActive) {
                verticalMenuActive.scrollIntoView({block: "center", inline: "center"});
            }

            const resizeObserver = new ResizeObserver(() => {
                const verticalMenuActive = vertical_menu.querySelector('.vertical-menu-active');
                if (verticalMenuActive) {
                    verticalMenuActive.scrollIntoView({block: "center", inline: "center"});
                }
            });

            resizeObserver.observe(vertical_menu);
        }*/
    });

</script>
{/literal}
