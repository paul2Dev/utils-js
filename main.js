import './style.css'

import Utils from './utils.js';
import Element from './src/element.js';


//create list of elements with class 'tasks' and add them to the list
let app = new Element('#app');

// let tasksList = new Element('ul', true);

// let task1 = new Element('li', true, 'task1');
// task1.addStyle('color', 'red');

// let task2 = new Element('li', true, 'task2');
// task2.addStyle('color', 'green');

// let task3 = new Element('li', true, 'task3');
// task3.addStyle('color', 'blue');



// let tasks = [task1, task2, task3];

// console.log(task2);

// tasksList.addElements(tasks);

// app.addElement(tasksList);

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


