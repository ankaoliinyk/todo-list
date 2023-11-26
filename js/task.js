import {Storage} from "./storage.js";

export class Task {
    constructor(content, isCompleted, id, index) {
        this.index = index;
        this.content = content;
        this.isCompleted = isCompleted;
        this.storage = new Storage();
        if (id) {
            this.id = id;
        }else {
            this.id = this.storage.add(this.content, this.isCompleted, this.index);
        }
    }
    asElement() {
        let span = document.createElement("span");
        span.innerHTML = this.content;
        if (this.isCompleted) {
            span.classList.add("completed");
        }
        let icon = document.createElement("i");
        icon.classList.add("far", "fa-trash-alt", "delete");
        let li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.dataset.itemId = this.id;
        li.appendChild(span);
        li.appendChild(icon);
        this.addEvents(li);
        return li;
    }
    addEvents(li) {
        li.querySelector("i").addEventListener("click", (event) => {
            let element = event.target.parentElement;
            this.storage.remove(element.dataset.itemId)
            element.remove();
        });
        li.addEventListener("click", (event) => {
            if (event.target.tagName == "SPAN") {
                event.target.classList.toggle("completed");
            } else if (event.target.tagName == "LI") {
                event.target.querySelector("span").classList.toggle("completed");
            }
            this.isCompleted=!this.isCompleted;
            this.storage.update(li.dataset.itemId, this.isCompleted);
        })
    }
}