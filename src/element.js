export default class Element {
    constructor(selector = null, newElement = false) {
        if(newElement == true) {
            this.element = document.createElement(selector);
        } else {
            this.element = document.querySelector(selector);
        }
    }

    /*
    * Register an event on the element
    * @param {string} event - The event to register
    * @param {function} callback - The callback to execute when the event is triggered
    * @return {void}
    */

    registerEvent(event, callback) {
        this.element.addEventListener(event, callback);
    }

    /*
    * Remove an event from the element
    * @param {string} event - The event to remove
    * @param {function} callback - The callback to remove
    * @return {void}
    */


    unregisterEvent(event, callback) {
        this.element.removeEventListener(event, callback);
    }

    /*
    * Dispatch an event on the element
    * @param {string} event - The event to dispatch
    * @return {void}
    */

    dispatchEvent(event) {
        this.element.dispatchEvent(new Event(event));
    }

    /*
    * Register events on the element
    * @param {object} events - The events to register
    * @return {void}
    */

    registerEvents(events) {
        events.forEach(event => {
            this.registerEvent(event.event, event.callback);
        });
    }

    /*
    * Add a class to the element
    * @param {string} className - The class to add
    * @return {void}
    */

    addClass(className) {
        this.element.classList.add(className);
    }

    /*
    * Remove a class from the element
    * @param {string} className - The class to remove
    * @return {void}
    */ 
    
    removeClass(className) {
        this.element.classList.remove(className);
    }

    /*
    * get classList from the element
    * @return {array} - The classList
    */
    
    getClassList() {
        return this.element.classList;
    }

    /*
    * Add a style to the element
    * @param {string} property - The style property to add
    * @param {string} value - The style value to add
    * @return {void}
    */ 

    addStyle(style, value) {
        this.element.style[style] = value;
    }

    /*
    * Add styles to the element
    * @param {object} styles - The styles to add
    * @return {void}
    */ 

    addStyles(styles) {
        styles.forEach(style => {
            this.addStyle(style.style, style.value);
        });
    }

    /*
    * add attribute to the element
    * @param {string} attribute - The attribute to add
    * @param {string} value - The attribute value to add
    * @return {void}
    */ 

    addAttribute(attribute, value) {
        this.element.setAttribute(attribute, value);
    }

    /*
    * remove attribute from the element
    * @param {string} attribute - The attribute to remove
    * @return {void}
    */ 

    removeAttribute(attribute) {
        this.element.removeAttribute(attribute);
    }

    /*
    * get attribute from the element
    * @param {string} attribute - The attribute to get
    * @return {string} - The attribute value
    */ 

    getAttribute(attribute) {
        return this.element.getAttribute(attribute);
    }

    /*
    * get height of the element
    * @return {number} - The height of the element
    */

    getHeight() {
        return this.element.offsetHeight;
    }

    /*
    * get width of the element
    * @return {number} - The width of the element
    */  

    getWidth() {
        return this.element.offsetWidth;
    }

    /*
    * get text of the element
    * @return {string} - The text of the element
    */

    getText() {
        return this.element.innerText;
    }

    /*
    * get html of the element
    * @return {string} - The html of the element
    */

    getHtml() {
        return this.element.innerHTML;
    }

    /*
    * remove the element
    * @return {void}
    */

    remove() {
        this.element.remove();
    }
}