export class ListaUnitaria {
    #array;
    #id_name;

    constructor(idName) {
        this.#array = [];
        this.#id_name = idName; 
    }

    getValues() {
        return this.#array;
    }

    setValues(arr) {
        this.#array = arr;
    }

    addValue(item) {
        for(let i = 0; i < this.#array.length; i++) {
            let el = this.#array[i];

            if(el[this.#id_name] == item[this.#id_name]) {
                console.log("Id do item já presente na lista!");
                el["quantidade"] += item["quantidade"];
                return;
            } 
        }

        this.#array.push(item);
    }

    getSize() {
        return this.#array.length;
    }

    clear() {
        this.#array = [];
    }
}