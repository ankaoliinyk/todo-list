import {TaskList} from "./task-list.js";

let taskList = new TaskList();
const addForm = document.querySelector("form.add");
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = addForm.add.value;

    if (inputValue.length) {
        taskList.addTask(inputValue);
    }
    
    addForm.add.value = "";
});