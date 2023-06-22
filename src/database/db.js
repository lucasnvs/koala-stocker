Storage.prototype.get = function(key) {
    var tableObject = this.getItem(key);
    return tableObject && JSON.parse(tableObject);
};

Storage.prototype.set = function(key, object) { // pra ficar redondo
    let data = this.get(key);
    if(data === null) {
        data = [];
    }
    data.push(object)
    this.setItem(key, JSON.stringify(data));

    let testData = this.get(key); // pega de novo para checar
    let testDataString = JSON.stringify(testData[ testData.length - 1]);
    let objectString = JSON.stringify(object);

    if (testData.length == 0 || testDataString === objectString) { // checa para ver se funcionou
        return true;
    }
    return false;
};

const db = localStorage;
