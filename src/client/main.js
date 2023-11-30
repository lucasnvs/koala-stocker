import { components } from "./components.js";
import { ListaUnitaria } from "../ListaUnitaria.js";
import { cardOutClick, loadingEffect } from "../utils.js";
import { toastMessage } from "./dialog.js";
import { buildHeader } from "./header.js";

export const BACKEND_PATH = "./backend/";
export const itensGroceryList = new ListaUnitaria("id_produto");

const list = document.getElementById('stock-list');
const groceryList = document.getElementById('grocery-list');
const card_grocery = document.getElementById("card-grocery");
const card_grocery_list = document.getElementById("item-table");
const card_grocery_list_item = document.getElementById("item-list");
const name_card = document.getElementById("name-card");

cardOutClick();

async function render(paramDATA, element, build) {
    let values = paramDATA;
    if (typeof paramDATA === "string") {
        console.log(`Requisição em ${paramDATA}`);
        values = await fetch(paramDATA).then(res => res.json())
        values = values.body;
    }

    if (!values) return;
    console.log(values);
    element.innerHTML = "";
    values.forEach(item => {
        build(item);
    })
}

export const renderStock = (param = BACKEND_PATH + "api/estoque/get-estoque.php") => render(param, list, (item) => {
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

export const renderItemGroceryCard = (param = BACKEND_PATH + "api/produtos/get-produtos.php") => render(param, card_grocery_list_item, (item) => {
    let li = document.createElement("li");
    let comp = components.itemAddCard(item);
    li.appendChild(comp)
    card_grocery_list_item.appendChild(li);
})

export const renderGroceryList = (param = BACKEND_PATH + "api/lista_compra/get-lista_compra.php") => render(param, groceryList, (item) => {
    let comp = components.groceryCard(item);
    groceryList.appendChild(comp);
});

export const renderListGroceryCard = () => render(itensGroceryList.getValues(), card_grocery_list, (item) => {
    card_grocery_list.innerHTML += `<tr><td>${item.nome}</td><td>${item.quantidade} ${item.tipo_quantidade}</td></tr>`
})

buildHeader();
renderStock();
renderItemGroceryCard();
renderGroceryList();

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

function toogleCard(card) {
    card.classList.toggle("hidden");
}

document.getElementById("btnAddGroceryList").onclick = () => toogleCard(card_grocery);
document.getElementById("close-card-grocery").onclick = function() {
    itensGroceryList.clear();
    renderListGroceryCard();
    toogleCard(card_grocery);
}

document.getElementById("close-name-card").addEventListener("click", () => {
    toogleCard(name_card)
}) 

async function dialogInputName() {
    toogleCard(name_card);

    let input = document.getElementById("list-name");
    let myPro = new Promise((resolve, reject) => {
        document.getElementById("btn-name-card").addEventListener("click", () => {
            if (input.value.length < 3) {
                toastMessage("O nome da lista deve ter no minimo 3 letras!", "error")
            } else {
                toogleCard(name_card)
                resolve(input.value);
                input.value = "";
            }
        })

        document.getElementById("close-name-card").addEventListener("click", () => {
            reject("")
            input.value = "";
        })
    });

    return myPro;
}

document.getElementById("create-grocery-list").addEventListener("click", async () => {
    if (itensGroceryList.getSize() == 0) {
        toastMessage("Não é possível salvar uma lista de compras vazia!", "error");
        return;
    };

    let dialog_input_name = await dialogInputName().then(res => res).catch(err => err);
    
    if(dialog_input_name == null || dialog_input_name == undefined || dialog_input_name == "") {
        console.log("retorno")
        return;
    }

    let formData = new FormData();
    formData.append('data', JSON.stringify(itensGroceryList.getValues()));
    formData.append('list_name', dialog_input_name);

    const response = await fetch(BACKEND_PATH + "api/lista_compra/post-lista_compra.php", {
        method: "POST",
        body: formData
    }).then(res => res.json());

    if (response.status == "success") {
        itensGroceryList.clear();
    }

    loadingEffect(document.getElementById("create-grocery-list"), () => {
        card_grocery.classList.toggle("hidden");
        renderGroceryList()
        renderListGroceryCard();
    })

    toastMessage(response.message, response.status)
})

document.getElementById("save-grocery-list").addEventListener("click", async () => {
    if (itensGroceryList.getSize() == 0) {
        toastMessage("Não é possível salvar uma lista de compras vazia!", "error");
        return;
    }

    console.log(itensGroceryList.getValues())

    let formData = new FormData();
    formData.append('data', JSON.stringify(itensGroceryList.getValues()));

    const response = await fetch(BACKEND_PATH + "api/produtos/post-insert-compra.php", {
        method: "POST",
        body: formData
    }).then(res => res.json());

    if (response.status == "success") {
        itensGroceryList.clear();
    }
    if (response.status == "error") {
        throw new Error(response.message);
    }
    loadingEffect(document.getElementById("save-grocery-list"), () => {
        card_grocery.classList.toggle("hidden");
        renderStock();
        renderListGroceryCard();
    })

    toastMessage(response.message, response.status);
})