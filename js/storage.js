export class Storage {
    constructor() {
        this.prefix = "todo-";
    }
    getRanHex(size) {
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }
    newId(){
        return this.prefix+ this.getRanHex(20);
    }
    add(content, isCompleted, index) {
        let data = {
            content: content,
            isCompleted: isCompleted,
            index: index
        }
        let id = this.newId()
        localStorage.setItem(id, JSON.stringify(data))
        return id;
    }
    update(id, isCompleted) {
        let data = localStorage.getItem(id);
        if(data) {
            let result = JSON.parse(data)
            result.isCompleted = isCompleted;
            localStorage.setItem(id, JSON.stringify(result));
        }
    }
    remove(id) {
        localStorage.removeItem(id)
    }
    getAll() {
        let keys = Object.keys(localStorage);
        let sortedKeys = keys.sort((a, b)=> {
            if (a.startsWith(this.prefix) && b.startsWith(this.prefix)) {
                let firstData = JSON.parse(localStorage.getItem(a));
                let secondData = JSON.parse(localStorage.getItem(b));
                return firstData.index-secondData.index;
            }
            return 0;
        })
        return sortedKeys.reduce((result, key)=>{
            if (key.startsWith(this.prefix)) {
                let data = localStorage.getItem(key);
                result[key] = JSON.parse(data);
            }
            return result;
        }, {})
    }
    clear() {
        localStorage.clear();
    }
}