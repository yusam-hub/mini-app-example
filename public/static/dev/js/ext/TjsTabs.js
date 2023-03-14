let TjsTabs = function(selectors, options = {}) {

    this.jsYusam = window.jsYusam;

    this._init(selectors, options);
};

TjsTabs.prototype = {

    _init: function (selectors, options)
    {
        let self = this;
        let elements = document.querySelectorAll(selectors);

        elements.forEach(function (el, index, arr){

            let subElements = el.querySelectorAll('ul > li > a');

            let subSelectedInd = -1;

            for(let i=0; i < subElements.length; i++) {

                if (subElements[i].parentElement.classList.contains('active')) {
                    subSelectedInd = i;
                }

                subElements[i].parentElement.setAttribute('data-index', i);

                subElements[i].parentElement.addEventListener('click', function(){
                    if (!this.querySelector('a').href || this.querySelector('a').href.includes('#')) {
                        self._selectTabByIndex(this.parentElement.querySelectorAll('li'), this.getAttribute('data-index'));
                        self._showHideTabContent(this.parentElement.parentElement.querySelectorAll('.tabs > .tab'), this.getAttribute('data-index'));
                        return false;
                    }
                });
            }

            if (subSelectedInd < 0) {
                subSelectedInd = 0;
                subElements[subSelectedInd].parentElement.classList.add('active');
            }

            self._showHideTabContent(el.querySelectorAll('.tabs > .tab'), subSelectedInd);
        });
    },
    /**
     *
     * @param elements arr
     * @param selectedInd number
     * @private
     */
    _showHideTabContent: function(elements, selectedInd){
        for(let i=0; i < elements.length; i++) {
            if (!elements[i].classList.contains('display-none')) {
                elements[i].classList.add('display-none');
            }
            if (selectedInd.toString() === i.toString()) {
                elements[i].classList.remove('display-none');
            }
        }
    },
    /**
     *
     * @param elements arr
     * @param selectedInd number
     * @private
     */
    _selectTabByIndex: function(elements, selectedInd){
        for(let i=0; i < elements.length; i++) {
            if (elements[i].classList.contains('active')) {
                elements[i].classList.remove('active');
            }
            if (selectedInd.toString() === i.toString()) {

                elements[i].classList.add('active');
            }
        }
    },
}

export default TjsTabs;
