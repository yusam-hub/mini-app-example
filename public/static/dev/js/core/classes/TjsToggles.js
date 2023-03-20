"use strict";
class TjsToggles extends TjsBase
{
    #selectors;
    constructor(selectors, options = {}) {
        super(options);
        this.#selectors = selectors;
        this.#init();
    }

    #init(selectors, options)
    {
        let self = this;

        let elements = document.querySelectorAll(self.#selectors);

        elements.forEach(function (el, index, arr){

            let divToggles = el.querySelectorAll('.toggle');

            for(let d=0; d < divToggles.length; d++) {

                let toggleHeaderEl = divToggles[d].querySelector('.toggle-header');
                let toggleBoxEl = toggleHeaderEl.parentElement.querySelector('.toggle-box');

                self.#showHideBox(toggleHeaderEl, toggleBoxEl);

                toggleHeaderEl.addEventListener('click',function(){
                    if (this.classList.contains('toggle-open')) {
                        this.classList.remove('toggle-open');
                    } else {
                        this.classList.add('toggle-open');
                    }
                    self.#showHideBox(this, this.parentElement.querySelector('.toggle-box'));
                    return false;
                });
            }

        });
    }
    /**
     *
     * @param toggleHeaderEl
     * @param toggleBoxEl
     * @private
     */
    #showHideBox(toggleHeaderEl, toggleBoxEl){
        if (toggleHeaderEl.classList.contains('toggle-open')) {
            if (toggleBoxEl.classList.contains('display-none')) {
                toggleBoxEl.classList.remove('display-none');
            }
        } else {
            if (!toggleBoxEl.classList.contains('display-none')) {
                toggleBoxEl.classList.add('display-none');
            }
        }
    }
}