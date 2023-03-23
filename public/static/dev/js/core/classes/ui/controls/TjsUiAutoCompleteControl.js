"use strict";
class TjsUiAutoCompleteControl extends TjsUiControlBase
{
    #el;
    #elInput;
    #currentFocus;
    #countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    constructor(options = {}) {
        let defOptions = {
        };
        super(js_object_merge_deep(defOptions, options));
        this.#init();
    }

    #init()
    {
        let self = this;
        self.#el = document.createElement('div');
        self.#elInput = document.createElement('input');
        self.#el.append(self.#elInput);
        self.#el.classList.add('autocomplete');

        self.#elInput.addEventListener("input", function(e) {
            let a, b, i, val = this.value;
            self.#removeItems();
            if (!val) {
                return false;
            }
            self.#currentFocus = -1;
            a = document.createElement("div");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < self.data.length; i++) {
                if (self.data[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    b = document.createElement("div");
                    b.innerHTML = "<strong>" + self.data[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += self.data[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + self.data[i] + "'>";
                    b.addEventListener("click", function(e) {
                        self.#elInput.value = this.getElementsByTagName("input")[0].value;
                        self.#removeItems();
                    });
                    a.appendChild(b);
                }
            }
        });

        self.#elInput.addEventListener("keydown", function(e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) {
                self.#currentFocus++;
                self.#addActiveItem(x);
            } else if (e.keyCode === 38) {
                self.#currentFocus--;
                self.#addActiveItem(x);
            } else if (e.keyCode === 13) {
                e.preventDefault();
                if (self.#currentFocus > -1) {
                    if (x) x[self.#currentFocus].click();
                }
            }
        });
        document.addEventListener("click", function (e) {
            self.#removeItems(e.target);
        });
    }

    get el()
    {
        return this.#el;
    }

    get elInput()
    {
        return this.#elInput;
    }

    get data()
    {
        return this.#countries;
    }

    #addActiveItem(x)
    {
        let self = this;
        if (!x) return false;
        this.#removeActiveItem(x);
        if (this.#currentFocus >= x.length) this.#currentFocus = 0;
        if (this.#currentFocus < 0) this.#currentFocus = (x.length - 1);
        x[this.#currentFocus].classList.add("autocomplete-active");
    }
    #removeActiveItem(x)
    {
        let self = this;
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    #removeItems(elmnt)
    {
        let self = this;
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== self.#elInput) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

}