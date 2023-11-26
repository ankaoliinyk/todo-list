import { Task } from "./task.js";
import { Storage } from "./storage.js";

export class TaskList {
    constructor() {
        this.element = document.querySelector("ul.list-group");
        this.placeholder = document.querySelector("figure.placeholder");
        this.searchFormInput = document.querySelector("form.search input");
        this.buttonClear = document.querySelector("button.clear");
        this.storage = new Storage();
        this.addEvents();
        let todos = this.storage.getAll()
        for (const key in todos) {
            this.addTask(todos[key].content, todos[key].isCompleted, key, todos[key].index)
        }
    }
    addTask(content, isCompleted, id, index) {
        if (index == null) {
            index = this.newIndex()
        }
        let task = new Task(content, isCompleted, id, index);
        this.element.appendChild(task.asElement());
        this.placeholder.classList.add("hidden");
        this.buttonClear.classList.remove("hidden");
    }
    newIndex() {
        let lastData = Object.values(this.storage.getAll()).pop();
        let lastIndex = 0;
        if (lastData) {
            lastIndex = lastData.index;
        }
        return lastIndex + 1;
    }
    addEvents() {
        this.element.addEventListener("DOMSubtreeModified", (event) => {
            if (this.element.children.length == 0) {
                this.placeholder.classList.remove("hidden");
                this.buttonClear.classList.add("hidden");
            }
        })
        this.searchFormInput.parentElement.addEventListener("submit", e => e.preventDefault());
        this.searchFormInput.addEventListener("keyup", e => {
            const value = this.searchFormInput.value.toLowerCase().trim();
            this.filterItems(value);
        });
        this.buttonClear.addEventListener("click", (event)=> {
            this.element.innerHTML = "";
            this.storage.clear();
        })

    }
    filterItems(value) {
        Array.from(this.element.children).forEach((li) => {
            if (!li.textContent.toLowerCase().includes(value)) {
                li.classList.add("filtred");
            } else {
                li.classList.remove("filtred");
            }
        });
    };
}