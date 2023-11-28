import { toastMessage } from "./dialog.js";
import { BACKEND_PATH, itensGroceryList, renderListGroceryCard, renderStock } from "./main.js";

function itemAddCard(object) {
    let body = document.createElement("div");
    body.classList = "card item";

    let img = document.createElement("img");
    img.src = object.image_path;

    let container = document.createElement("div");
    container.className = "le"

    let p = document.createElement("p");
    p.textContent = object.nome;
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
        let minPlaceholder;
        switch(object["tipo_quantidade"]) {
            case "KILOGRAMA": minPlaceholder = "KG";
                break;
            case "UNIDADE": minPlaceholder = "UN";
                break;
            case "LITRO": minPlaceholder = "LT";
                break;
        }
        quantSpan.textContent = `${total} ${minPlaceholder}`;
    }
    renderTotal();


    addBtn.addEventListener("click", () => {
        switch(object["tipo_quantidade"]) {
            case "KILOGRAMA": total += .5;
                break;
            case "UNIDADE": total += 1;
                break;
            case "LITRO": total += 1;
                break;
        }

        renderTotal();
    })

    unaddBtn.addEventListener("click", () => {
        if (total <= 0) return;
        switch(object["tipo_quantidade"]) {
            case "KILOGRAMA": total -= .5;
                break;
            case "UNIDADE": total -= 1;
                break;
            case "LITRO": total -= 1;
                break;
        }

        renderTotal();
    })

    submit.addEventListener("click", () => {
        if (total == 0) return
        let productObj = {
            id_produto: object.id_produto,
            nome: object.nome,
            quantidade: total, // valor a ser adicionado
            tipo_quantidade: object["tipo_quantidade"]
        }
        itensGroceryList.addValue(productObj);
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

function groceryCard(object) {
    console.log(object)
    let div = document.createElement("div");
    div.classList = "grocery-list-card";

    let h2 = document.createElement("h2");
    h2.textContent = object.nome;

    let span = document.createElement("span");
    span.innerHTML = `Listar ${object["produtos"].length} itens <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" fill="#FFF"/></svg>`;

    span.addEventListener("click", () => {
        ul.classList.toggle("hidden");
    })
    let ul = document.createElement("ul");
    ul.classList = "list hidden";

    object["produtos"].forEach(element => {
        let li = document.createElement("li");
        li.textContent = `${element.nome} - ${element.quantidade} ${element.tipo_quantidade}`
        ul.appendChild(li);
    });

    let btn = document.createElement("button");
    btn.textContent = "Usar";
    btn.className = "btn";

    btn.addEventListener("click", async () => {
            let formData = new FormData();
            formData.append('data', JSON.stringify(object["produtos"]));
        
            const response = await fetch(BACKEND_PATH+"api/produtos/post-insert-compra.php", {
                method: "POST",
                body: formData
            }).then(res => res.json());

            if(response.status == "success") {
                renderStock();
            }

            toastMessage(response.message, response.status);
    });

    div.appendChild(h2);
    div.appendChild(span);
    div.appendChild(ul);
    div.appendChild(btn);

    return div;
}

export const components = {
    itemAddCard,
    groceryCard,
}
