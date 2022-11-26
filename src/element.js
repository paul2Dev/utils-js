export default class Element {
    constructor(selector) {
        this.element = document.querySelector(selector);
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
}