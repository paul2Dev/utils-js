import './style.css'

import Utils from './utils.js';
import Element from './src/element.js';

let button = new Element('.push');
button.registerEvent('click', () => {
    Utils.logText('button clicked');
});

button.dispatchEvent('click');

button.addClass('test-class');
//button.removeClass('test-class');

button.addStyle('color', 'red');
button.addStyle('background-color', 'blue');

console.log(button.getAttribute('class'));

button.addAttribute('id', 'test');   
