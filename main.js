import './style.css'

import Utils from './utils.js';
import Element from './src/element.js';


//create list of elements with class 'tasks' and add them to the list
let app = new Element('#app');

let newTask = new Element('#newTask');
let tasksList = new Element('#tasks');

newTask.registerEvent('keyup', (e) => {
    if(e.keyCode === 13) {
        let task = new Element('li', true, newTask.getValue());
        tasksList.addElement(task);
        newTask.setValue('');

        task.registerEvent('dblclick', () => {
            task.remove();
        });
    }
});

app.addElement(tasksList);
