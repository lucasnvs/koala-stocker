const comprasList =
    [
        {
            "name": "Arroz",
            "typeQuantity": "KG",
            "quantity": 2.3,
            "img": "../assets/imgs/arroz_namorado.jpg"
        },
        {
            "name": "Ovos Brancos",
            "typeQuantity": "UNIT",
            "quantity": 12,
            "img": "../assets/imgs/ovos.jpg"
        },
        {
            "name": "Leite Integral 1L",
            "typeQuantity": "UNIT",
            "quantity": 3,
            "img": "../assets/imgs/leite.png"
        },
        {
            "name": "Massa Penne",
            "typeQuantity": "KG",
            "quantity": 1.5,
            "img": "../assets/imgs/penne.png"
        }
    ]

Storage.prototype.get = function (key) {
    var tableObject = this.getItem(key);
    return tableObject && JSON.parse(tableObject);
};

Storage.prototype.set = function (key, object) { // pra ficar redondo
    let data = this.get(key);
    if (data === null) {
        data = [];
        object.id = 1;
    }
    object.id = data.length + 1;

    data.push(object)
    this.setItem(key, JSON.stringify(data));

    let testData = this.get(key); // pega de novo para checar
    let testDataString = JSON.stringify(testData[testData.length - 1]);
    let objectString = JSON.stringify(object);

    if (testData.length == 0 || testDataString === objectString) { // checa para ver se funcionou
        return true;
    }
    return false;
};

Storage.prototype.getWhereUserId = async function( key, id ) {
    let object = this.get(key);
    if(!object) throw new Error(`Chave - ${key} -  não encontrada ou não existe.`);
    return object.filter( item => item.fkUserId == id );
};

Storage.prototype.AddGroceryWhereId = function(key, id, param = {}) {
    let object = this.get(key);
    if(!object) throw new Error(`Chave - ${key} -  não encontrada ou não existe.`);

    for( let ob in object ) {
        if(ob.id == param.id) {
            ob["grocery"] += param.value;
        }
    }

    object.forEach( item => {
        if(item.fkUserId == id) return item;
    });
}
// criando objetos / padroes de tabelas sao criados quando nao existe nem uma tabela com a chave

const newObject = (object) => {
    return object;
}

const FK_newObject = (object, idFKName, id) => {
    object[idFKName] = id;
    return object;
};

async function addDefaultItems() {
    localStorage.removeItem("users");
    localStorage.removeItem("item"); // para nao dar sobreposição
    
    var user0 = {
        name: "Matheus",
        undername: "Lima",
        email: "matheus@email.com",
        pass: "pastel2020",
    }

    localStorage.set('users', newObject(user0))

    comprasList.forEach(product => {
        localStorage.set("item", FK_newObject(product, "fkUserId", 1))
    });
}

addDefaultItems()