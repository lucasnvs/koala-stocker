import { componentCreation } from "./componentCreation.js";
// import {db, setMethodsDB, FK_newList, FK_newObject } from "../database/db.js";
// import { loadingEffect } from "../utils.js";
// import { errMSG, sucessMSG } from "./dialog.js";


const BACKEND_PATH = "../../../backend/";

const list = document.getElementById('stock-list');
const groceryList = document.getElementById('grocery-list');
const card_grocery = document.getElementById("card-grocery");
const card_grocery_list = document.getElementById("item-table");
const card_grocery_list_item = document.getElementById("item-list");
const card_newItem = document.getElementById("product-register");


document.getElementById("disconnect").addEventListener("click", () => {
    fetch(BACKEND_PATH + "logout.php").then(async res => {
        window.location.href = "../../index.php";
    })
});

// export var loggedUser = JSON.parse(db.getItem("loggedUser"));
// loggedUser = {id: 1, name: "lucas"};
export var itensGroceryList = [];

// let username = document.getElementById("user-name");
// if(loggedUser) username.textContent = loggedUser.name;


// renders
async function render(paramDATA, element, build) {
    let values = paramDATA;
    if(typeof paramDATA === "string") {
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

export const renderStock = (param = "item") => render(param, list, (item) => {
    var text = `
    <li>
        <div class="item_stock">
        <div class="img-container">
            <img src=${item.img}>
        </div>
            <h3>${item.name}</h3>
            <p>Quantidade</p>
            <p><span>${item.quantity} ${item.typeQuantity}</span></p>
        </div>                 
    </li>`
    list.innerHTML += text;
})

// export const renderGroceryList = (param = "grocery") => render(param, groceryList, (item) => {
//     let comp = componentCreation.groceryCard(item);
//     groceryList.appendChild(comp);
// });

export const renderItemGroceryCard = (param = BACKEND_PATH+"api/produtos/get-produtos.php") => render(param, card_grocery_list_item, (item) => {
    let li = document.createElement("li");
    let comp = componentCreation.itemAddCard(item);
    li.appendChild(comp)
    card_grocery_list_item.appendChild(li);
})

// export const renderListGroceryCard = () => render(itensGroceryList, card_grocery_list, (item) => {
//     card_grocery_list.innerHTML += `<tr><td>${item.name}</td><td>${item.value} ${item.typeQuantity}</td></tr>`
// })

// //pre rendering 
// renderStock();
// renderGroceryList();
renderItemGroceryCard();

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

// document.getElementById("create-grocery-list").addEventListener("click", () => {
//     if(itensGroceryList.length == 0) {
//         errMSG("Não é possível salvar uma lista de compras vazia!");
//         return
//     };
//     db.set("grocery", FK_newList(itensGroceryList, loggedUser.id));
//     itensGroceryList = [];
//     loadingEffect(document.getElementById("create-grocery-list"), () => {
//         card_grocery.classList.toggle("hidden");
//         renderGroceryList()
//         renderListGroceryCard();
//         sucessMSG("A sua lista de compras foi salva com sucesso!");
//     })
// })

// document.getElementById("save-grocery-list").addEventListener("click", () => {
//     if(itensGroceryList.length == 0) {
//         errMSG("Não é possível salvar uma lista de compras vazia!");
//         return
//     }

//     itensGroceryList.forEach( item => {
//         db.UpdateGroceryWhereId( loggedUser.id, item );
//     })
//     itensGroceryList = [];
//     loadingEffect(document.getElementById("save-grocery-list"), () => {
//         card_grocery.classList.toggle("hidden");
//         renderStock();
//         renderListGroceryCard();
//         sucessMSG("Os itens da sua compra foram somados ao estoque!");
//     })
// })

// ///// card 
document.getElementById("add-item").addEventListener("click", () => {
    card_newItem.classList.toggle("hidden");
});
document.getElementById("close-card-product").addEventListener("click", () => {
    card_newItem.classList.toggle("hidden");
});

const formProductRegister = document.getElementById("form-product-register");
formProductRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(BACKEND_PATH + "api/produtos/post-produtos.php", {
        method: "POST",
        body: new FormData(formProductRegister)
    }).then(async res => {
        let data = await res.json();
        if (data.status == "sucess") {
            card_newItem.classList.toggle("hidden");
            renderStock();
            renderItemGroceryCard();
            sucessMSG("Item criado com sucesso!");
        }
    })

}
)