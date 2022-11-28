export default class Element {

    /*
    * constructor
    */
    
    constructor(selector = null, newElement = false, text = '') {
        if(newElement == true) {
            this.element = document.createElement(selector);
            this.setText(text);
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
    * get value of the element
    * @return {string} - The value of the element
    * @return {array} - The values of the element
    */

    getValue() {
        return this.element.value;
    }

    /*
    * set text of the element
    * @param {string} text - The text to set
    * @return {void}
    */ 

    setText(text) {
        this.element.innerText = text;
    }

    /*
    * set value of the element
    * @param {string} value - The value to set
    * @return {void}
    */

    setValue(value) {
        this.element.value = value;
    }

    /*
    * get html of the element
    * @return {string} - The html of the element
    */

    getHtml() {
        return this.element.innerHTML;
    }

    /*
    * set html of the element
    * @param {string} html - The html to set
    * @return {void}
    */ 
    
    setHtml(html) {
        this.element.innerHTML = html;
    }

    /*
    * remove the element
    * @return {void}
    */

    remove() {
        this.element.remove();
    }

    /*
    * append the elements to another element
    * @param {object} element - The element to append to
    * @return {void}
    */
   

    addElements(elements) {
        elements.forEach(element => {
            this.element.appendChild(element.element);
        });
    }

    /*
    * append the element to another element
    * @param {object} element - The element to append to
    * @return {void}
    */ 

    addElement(element) {
        this.element.appendChild(element.element);
    }

}