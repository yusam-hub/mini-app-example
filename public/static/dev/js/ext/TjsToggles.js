let TjsToggles = function(selectors, options = {}) {

    this.jsYusam = window.jsYusam;

    this._init(selectors, options);
};

TjsToggles.prototype = {

    _init: function (selectors, options)
    {
        let self = this;

        let elements = document.querySelectorAll(selectors);

        elements.forEach(function (el, index, arr){

            let divToggles = el.querySelectorAll('.toggle');

            for(let d=0; d < divToggles.length; d++) {

                let toggleHeaderEl = divToggles[d].querySelector('.toggle-header');
                let toggleBoxEl = toggleHeaderEl.parentElement.querySelector('.toggle-box');

                /*new JsYusamObserver(toggleBoxEl, function(typ, attributeName, target){
                    console.log("changed", typ, attributeName, target);
                });*/

                self._showHideBox(toggleHeaderEl, toggleBoxEl);

                toggleHeaderEl.addEventListener('click',function(){
                    if (this.classList.contains('toggle-open')) {
                        this.classList.remove('toggle-open');
                    } else {
                        this.classList.add('toggle-open');
                    }
                    self._showHideBox(this, this.parentElement.querySelector('.toggle-box'));
                    return false;
                });
            }

        });
    },
    /**
     *
     * @param toggleHeaderEl
     * @param toggleBoxEl
     * @private
     */
    _showHideBox: function(toggleHeaderEl, toggleBoxEl){
        if (toggleHeaderEl.classList.contains('toggle-open')) {
            if (toggleBoxEl.classList.contains('display-none')) {
                toggleBoxEl.classList.remove('display-none');
            }
        } else {
            if (!toggleBoxEl.classList.contains('display-none')) {
                toggleBoxEl.classList.add('display-none');
            }
        }
    },
}

export default TjsToggles;
