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

const itemAddCard = ( object ) => {
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
        if(object.typeQuantity == "KG") {
            total += .5;
        }
        if(object.typeQuantity == "UNIT") {
            total += 1;
        }
        renderTotal();
    })
    unaddBtn.addEventListener("click", () => {
        if(total <= 0) return;
        if(object.typeQuantity == "KG") {
            total -= .5;
        }
        if(object.typeQuantity == "UNIT") {
            total -= 1;
        }
        renderTotal();
    })
    renderTotal();

    submit.addEventListener("click", () => {
        if(total == 0) return
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
const componentCreation = {
    itemAddCard: itemAddCard
}
