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
}