import './style.css'

import Utils from './utils.js';
import Element from './src/element.js';

let button = new Element('.push');
button.registerEvent('click', () => {
    Utils.logText('button clicked');
});

button.dispatchEvent('click');
