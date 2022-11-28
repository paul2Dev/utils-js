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

button.addStyles([
    {style: 'color', value: 'blue'},
    {style: 'background-color', value: 'red'}
]);
 
console.log(button.getHtml());

//create list of elements with class 'tasks' and add them to the list
let app = new Element('#app');

let tasksList = new Element('ul', true);

let tasks = [
    new Element('li', true, 'task1'),
    new Element('li', true, 'task2'),
    new Element('li', true, 'task3'),
]

tasksList.addElements(tasks);

app.addElement(tasksList);


