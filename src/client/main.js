import { components } from "./components.js";
import { ListaUnitaria } from "../ListaUnitaria.js";
import { loadingEffect } from "../utils.js";
import { toastMessage } from "./dialog.js";
import { buildHeader } from "./header.js";

export const BACKEND_PATH = "./backend/";

const list = document.getElementById('stock-list');
const groceryList = document.getElementById('grocery-list');
const card_grocery = document.getElementById("card-grocery");
const card_grocery_list = document.getElementById("item-table");
const card_grocery_list_item = document.getElementById("item-list");

buildHeader();

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

export const itensGroceryList = new ListaUnitaria("id_produto");

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
    let comp = components.itemAddCard(item);
    li.appendChild(comp)
    card_grocery_list_item.appendChild(li);
})

export const renderGroceryList = (param = BACKEND_PATH+"api/lista_compra/get-lista_compra.php") => render(param, groceryList, (item) => {
    let comp = components.groceryCard(item);
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

document.getElementById("btnAddGroceryList").addEventListener("click", () => {
    card_grocery.classList.toggle("hidden");
});

document.getElementById("close-card-grocery").addEventListener("click", () => {
    card_grocery.classList.toggle("hidden");
});

document.getElementById("create-grocery-list").addEventListener("click", async () => {
    if(itensGroceryList.getSize() == 0) {
        toastMessage("Não é possível salvar uma lista de compras vazia!", "error");
        return;
    };

    let formData = new FormData();
    formData.append('data', JSON.stringify(itensGroceryList.getValues()));
    formData.append('list_name', "Lista 2 Teste"); // teste remover

    const response = await fetch(BACKEND_PATH+"api/lista_compra/post-lista_compra.php", {
        method: "POST",
        body: formData
    }).then(res => res.json());

    if(response.status == "success") {
        itensGroceryList.clear();
    }
    
    loadingEffect(document.getElementById("create-grocery-list"), () => {
        card_grocery.classList.toggle("hidden");
        renderGroceryList()
        renderListGroceryCard();
    })

    // sucessMSG("A sua lista de compras foi salva com sucesso!");
})

document.getElementById("save-grocery-list").addEventListener("click", async () => {
    if(itensGroceryList.getSize() == 0) {
        toastMessage("Não é possível salvar uma lista de compras vazia!", "error");
        return;
    }

    console.log(itensGroceryList.getValues())
    
    let formData = new FormData();
    formData.append('data', JSON.stringify(itensGroceryList.getValues()));

    const response = await fetch(BACKEND_PATH+"api/produtos/post-insert-compra.php", {
        method: "POST",
        body: formData
    }).then(res => res.json());

    if(response.status == "success") {
        itensGroceryList.clear();
    }

    loadingEffect(document.getElementById("save-grocery-list"), () => {
        card_grocery.classList.toggle("hidden");
        renderStock();
        renderListGroceryCard();
    })

    toastMessage(response.message, response.status);
    // sucessMSG("Os itens da sua compra foram somados ao estoque!");
})