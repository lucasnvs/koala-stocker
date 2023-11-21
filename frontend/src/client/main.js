import { componentCreation } from "./componentCreation.js";
import { ListaUnitaria } from "../ListaUnitaria.js";
import { loadingEffect } from "../utils.js";
import { errMSG, sucessMSG } from "./dialog.js";


export const BACKEND_PATH = "../../../backend/";

const list = document.getElementById('stock-list');
const groceryList = document.getElementById('grocery-list');
const card_grocery = document.getElementById("card-grocery");
const card_grocery_list = document.getElementById("item-table");
const card_grocery_list_item = document.getElementById("item-list");

fetch(BACKEND_PATH+"logged-info.php").then(async res => {
    let data = await res.json();
    document.getElementById("user-name").innerHTML = data.username;
    console.log(data);
    if(data.role == "ADMIN") {
        document.getElementById("top-menu-options").insertAdjacentHTML("afterbegin", `<li><a href="admin.php">Admin</a></li>`);
    }
});

let allCardFrames = document.querySelectorAll(".card-frame");
allCardFrames.forEach(cardFrame => {
    cardFrame.addEventListener("click", e => {
        let target = e.target;
        if(target == cardFrame) {
            console.log("Clicou fora")
            cardFrame.classList.toggle("hidden")
        }
    })
})

document.getElementById("disconnect").addEventListener("click", () => {
    fetch(BACKEND_PATH + "logout.php").then(async res => {
        window.location.href = "../../index.php";
    })
});

// export var loggedUser = JSON.parse(db.getItem("loggedUser"));
// loggedUser = {id: 1, name: "lucas"};
export const itensGroceryList = new ListaUnitaria("id_produto");

// let username = document.getElementById("user-name");
// if(loggedUser) username.textContent = loggedUser.name;


// renders
async function render(paramDATA, element, build) {
    let values = paramDATA;
    if(typeof paramDATA === "string") {
        console.log(`Requisição em ${paramDATA}`);
        values = await fetch(paramDATA).then(res => res.json())
        values = values.body;
    }

    if (!values) return;
    console.log(values);
    element.innerHTML = "";
    values.forEach( item => {
        build(item);
    })
}

export const renderStock = (param = BACKEND_PATH+"api/estoque/get-estoque.php") => render(param, list, (item) => {
    var text = `
    <li>
        <div class="item_stock">
        <div class="img-container">
            <img src=${item.image_path}>
        </div>
            <h3>${item.nome}</h3>
            <p>Quantidade</p>
            <p><span>${item.quantidade} ${item.tipo_quantidade}</span></p>
        </div>                 
    </li>`
    list.innerHTML += text;
})

export const renderItemGroceryCard = (param = BACKEND_PATH+"api/produtos/get-produtos.php") => render(param, card_grocery_list_item, (item) => {
    let li = document.createElement("li");
    let comp = componentCreation.itemAddCard(item);
    li.appendChild(comp)
    card_grocery_list_item.appendChild(li);
})

export const renderGroceryList = (param = BACKEND_PATH+"api/lista_compra/get-lista_compra.php") => render(param, groceryList, (item) => {
    let comp = componentCreation.groceryCard(item);
    groceryList.appendChild(comp);
});

export const renderListGroceryCard = () => render(itensGroceryList.getValues(), card_grocery_list, (item) => {
    card_grocery_list.innerHTML += `<tr><td>${item.nome}</td><td>${item.quantidade} ${item.tipo_quantidade}</td></tr>`
})

// //pre rendering 
renderStock();
renderItemGroceryCard();
renderGroceryList();

// // search in stock
// const searchStock = document.getElementById('searchInStock');

// searchStock.addEventListener('input', async (e) => {
//     let value = e.target.value.toLowerCase();
//     let items = await db.getWhereUserId("item", loggedUser.id);
//     let resSearch = items.filter(item => item.name.toLowerCase().includes(value));
//     renderStock(resSearch);
// });

// const searchGrocery = document.getElementById('search-grocery-item');

// searchGrocery.addEventListener('input', async (e) => {
//     let value = e.target.value.toLowerCase();
//     let items = await db.getWhereUserId("item", loggedUser.id);
//     let resSearch = items.filter(item => item.name.toLowerCase().includes(value));
//     renderItemGroceryCard(resSearch);
// });

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// // cards handling

// ///// card grocery
document.getElementById("btnAddGroceryList").addEventListener("click", () => {
    card_grocery.classList.toggle("hidden");
});

document.getElementById("close-card-grocery").addEventListener("click", () => {
    card_grocery.classList.toggle("hidden");
});

document.getElementById("create-grocery-list").addEventListener("click", () => {
    if(itensGroceryList.getSize() == 0) {
        errMSG("Não é possível salvar uma lista de compras vazia!");
        return
    };


    let formData = new FormData();
    formData.append('data', JSON.stringify(itensGroceryList.getValues()));
    formData.append('list_name', "Lista 2 Teste"); // teste remover

    fetch(BACKEND_PATH+"api/lista_compra/post-lista_compra.php", {
        method: "POST",
        body: formData
    }).then(async res => {
        let data = await res.json();
        console.log(data)
    })


    itensGroceryList.clear();
    
    loadingEffect(document.getElementById("create-grocery-list"), () => {
        card_grocery.classList.toggle("hidden");
        renderGroceryList()
        renderListGroceryCard();
        sucessMSG("A sua lista de compras foi salva com sucesso!");
    })
})

document.getElementById("save-grocery-list").addEventListener("click", () => {
    if(itensGroceryList.getSize() == 0) {
        errMSG("Não é possível salvar uma lista de compras vazia!");
        return;
    }

    console.log(itensGroceryList.getValues())
    
    let formData = new FormData();
    formData.append('data', JSON.stringify(itensGroceryList.getValues()));

    fetch(BACKEND_PATH+"api/produtos/post-insert-compra.php", {
        method: "POST",
        body: formData
    }).then(async res => {
        let data = await res.json();
        console.log(data)
    })

    itensGroceryList.clear();
    
    loadingEffect(document.getElementById("save-grocery-list"), () => {
        card_grocery.classList.toggle("hidden");
        renderStock();
        renderListGroceryCard();
        sucessMSG("Os itens da sua compra foram somados ao estoque!");
    })
})