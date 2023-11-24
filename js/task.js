export class Task {
    constructor(content) {
        this.content = content;
    }
    asElement() {
        let span = document.createElement("span");
        span.innerHTML = this.content;
        let icon = document.createElement("i");
        icon.classList.add("far", "fa-trash-alt", "delete");
        let li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.appendChild(span);
        li.appendChild(icon);
        this.addEvents(li);
        return li;
    }
    addEvents(li) {
        li.querySelector("i").addEventListener("click", (event) => {
            event.target.parentElement.remove();
        });
        li.addEventListener("click", (event) => {
            if (event.target.tagName == "SPAN") {
                event.target.classList.toggle("completed");
            } else if (event.target.tagName == "LI") {
                event.target.querySelector("span").classList.toggle("completed");
            }
            
        })
    }
}