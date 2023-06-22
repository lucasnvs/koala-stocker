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

const db = localStorage;

// criando objetos / padroes de tabelas sao criados quando nao existe nem uma tabela com a chave

const newObject = (object) => {
    return object;
}

const FK_newObject = ( object, idFKName, id ) => {
    object[idFKName] = id;
    return object;
};
