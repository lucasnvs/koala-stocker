const db = localStorage;

Storage.prototype.get = function(key) {
    var tableObject = this.getItem(key);
    return tableObject && JSON.parse(tableObject);
};

Storage.prototype.set = function(key, newObject = []) { // pra ficar redondo
    let data = this.get(key);
    if(data === null) {
        data = [];
    }

    data.push(newObject)
    this.setItem(key, JSON.stringify(data));

    let testData = this.get(key); // pega de novo para checar
    let testDataString = JSON.stringify(testData[ testData.length - 1]);
    let objectString = JSON.stringify(newObject);

    if (testData.length == 0 || testDataString === objectString) { // checa para ver se funcionou
        return true;
    }
    return false;
};

// criando objetos / padroes de tabelas sao criados quando nao existe nem uma tabela com a chave

const newObject = (object) => {
    return object;
}

const FK_newObject = ( object, idFKName, id ) => {
    object[idFKName] = id;
    return object;
};

const fetchData = async () => {
    var items = await fetch("src/database/data.json").then( res => res.json());     
    return items;
}

async function addDefaultItems() {
    db.clear();
    var user0 = {
        name: "Matheus",
        undername: "Lima",
        email: "matheus@email.com",
        pass: "pastel2020",
    }

    await db.set('users', newObject(user0))

    let items = await fetchData();
    items.forEach( product => {
        db.set("compras", FK_newObject(product, "fkUserId", 0))
    });
}

addDefaultItems()
// necessario adicionar id diretamente no objeto pessoa, usar o indice so funcionaria na situação que usei, tem reformular o codigo