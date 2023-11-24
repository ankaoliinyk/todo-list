import {Task} from "./task.js"

export class TaskList {
    constructor() {
        this.element = document.querySelector("ul.list-group");
        this.placeholder = document.querySelector("figure.placeholder");
    }
    addTask(content) {
        let task = new Task(content);
        this.element.appendChild(task.asElement());
        this.placeholder.classList.add("hidden")
    }
}