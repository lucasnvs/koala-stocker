const comprasList = await fetch('../src/database/ItemsDefault.json').then(res => res.json());

const setMethodsDB = () => {
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
        if(!object) return;
        if(!object) throw new Error(`Chave - ${key} -  não encontrada ou não existe.`);
        return object.filter( item => item.fkUserId == id );
    };
    
    Storage.prototype.UpdateGroceryWhereId = function( id, param = {} ) {
        let object = this.get("item");
        if(!object) throw new Error(`Chave - ${key} -  não encontrada ou não existe.`);
    
        object.forEach( (ob) =>{
            if(ob.fkUserId == id) {
                if(ob.id == param.id) {
                    ob["quantity"] += param.value;
                }  
            }
        })
        localStorage.setItem("item", JSON.stringify(object));
    }
}

// criando objetos / padroes de tabelas sao criados quando nao existe nem uma tabela com a chave

export const newObject = (object) => {
    return object;
}

export const FK_newList = (list, id) => {
    let obList = { fkUserId: id, arr: list };
    return obList;
}

export const FK_newObject = (object, idFKName, id) => {
    object[idFKName] = id;
    return object;
};

var db = localStorage;

async function addDefaultItems() {
    let aux = JSON.parse(localStorage.getItem("users"));
    if(!aux) {
        console.log(JSON.parse(localStorage.getItem("users")))
    }
    
    var user0 = {
        name: "Matheus",
        undername: "Lima",
        email: "matheus@email.com",
        pass: "pastel2020",
    }

    if(db.getItem("users") == null) {
        db.set('users', newObject(user0))
        await comprasList.forEach(product => {
            localStorage.set("item", FK_newObject(product, "fkUserId", 1))
            console.log("Setando")
        });
    }
}


export { db, addDefaultItems, setMethodsDB };

// ()(

//   )