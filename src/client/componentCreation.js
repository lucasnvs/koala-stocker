import { db } from "../database/db.js";
import { itensGroceryList, loggedUser, renderGroceryList, renderItemGroceryCard, renderListGroceryCard, renderStock } from "./main.js";

const card = (title, child = "") => {
    let cardFrame = document.createElement('div');
    cardFrame.className = "card-frame";

    let card = document.createElement('div');
    card.className = "card";

    let top_bar = document.createElement('div');
    top_bar.className = "top-bar";

    let cardTitle = document.createElement('h2');
    cardTitle.textContent = title;

    let btnClose = document.createElement('button');
    btnClose.className = "btn-close";

    btnClose.addEventListener('click', () => {
        cardFrame.remove();
    });

    top_bar.appendChild(cardTitle);
    top_bar.appendChild(btnClose);
    card.appendChild(top_bar);
    card.appendChild(child);
    cardFrame.appendChild(card);

    return cardFrame;
}

const itemAddCard = (object) => {
    let body = document.createElement("div");
    body.classList = "card item";

    let img = document.createElement("img");
    img.src = object.img;

    let container = document.createElement("div");
    container.className = "le"

    let p = document.createElement("p");
    p.textContent = object.name;
    let submit = document.createElement("button");
    submit.className = "btn";
    submit.textContent = "Adicionar";

    container.appendChild(p);
    container.appendChild(submit);

    let quant_container = document.createElement("div");
    quant_container.className = "quant-container";

    let addBtn = document.createElement("button");
    addBtn.textContent = "+";

    let quantSpan = document.createElement("span");
    quantSpan.textContent = "0 KG";

    let unaddBtn = document.createElement("button");
    unaddBtn.textContent = "-";

    quant_container.appendChild(addBtn);
    quant_container.appendChild(quantSpan);
    quant_container.appendChild(unaddBtn);
    /// lógica

    let total = 0;

    const renderTotal = () => {
        quantSpan.textContent = `${total} ${object.typeQuantity}`;
    }
    addBtn.addEventListener("click", () => {
        if (object.typeQuantity == "KG") {
            total += .5;
        }
        if (object.typeQuantity == "UNIT") {
            total += 1;
        }
        renderTotal();
    })
    unaddBtn.addEventListener("click", () => {
        if (total <= 0) return;
        if (object.typeQuantity == "KG") {
            total -= .5;
        }
        if (object.typeQuantity == "UNIT") {
            total -= 1;
        }
        renderTotal();
    })
    renderTotal();

    submit.addEventListener("click", () => {
        if (total == 0) return
        let productObj = {
            id: object.id,
            name: object.name,
            value: total, // valor a ser adicionado
            typeQuantity: object.typeQuantity
        }
        itensGroceryList.push(productObj);
        renderListGroceryCard();
        total = 0;
        renderTotal();
    });

    document.getElementById("save-grocery-list").addEventListener("click", () => {
        total = 0;
        renderTotal();
    });

    body.appendChild(img);
    body.appendChild(container);
    body.appendChild(quant_container);

    return body;
}

const groceryCard = ( { arr: object } ) => {

    let div = document.createElement("div");
    div.classList = "grocery-list-card";

    let h2 = document.createElement("h2");
    h2.textContent = "Compra";

    let span = document.createElement("span");
    span.innerHTML = `Listar ${object.length} itens <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" fill="#FFF"/></svg>`;


    span.addEventListener("click", () => {
        ul.classList.toggle("hidden");
    })
    let ul = document.createElement("ul");
    ul.classList = "list hidden";

    object.forEach(element => {
        let li = document.createElement("li");
        li.textContent = `${element.name} - ${element.value} ${element.typeQuantity}`
        ul.appendChild(li);
    });

    let btn = document.createElement("button");
    btn.textContent = "Usar";
    btn.className = "btn";

    btn.addEventListener("click", () => {
        object.forEach( item => {
            db.UpdateGroceryWhereId( loggedUser.id, item );
        })
        renderStock();
    });

    div.appendChild(h2);
    div.appendChild(span);
    div.appendChild(ul);
    div.appendChild(btn);

    console.log("renderizando");
    return div;
}

export const componentCreation = {
    itemAddCard: itemAddCard,
    groceryCard: groceryCard
}
