import { buildHeader } from "./header.js";
import { toastMessage } from "./dialog.js";

let card = document.getElementById("product-register");

buildHeader();

fetch("./backend/api/produtos/get-produtos.php").then(async res => {
    let data = await res.json();
    console.log(data);
    if(data.status == "success") {
        data.body.forEach(element => {
            adminProdutoItem(element);
        });
    }
})

function toogleCardNewItem() {
    card.classList.toggle("hidden");
}

document.getElementById("add-item").onclick = toogleCardNewItem();
document.getElementById("close-card-product").onclick = toogleCardNewItem();

const formProductRegister = document.getElementById("form-product-register");
formProductRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = fetch("./backend/api/produtos/post-produtos.php", {
        method: "POST",
        body: new FormData(formProductRegister)
    }).then(res => res.json());

    if (response.status == "success") {
        toogleCardNewItem();
        document.getElementById("title-item").value = "";
        document.querySelector("input[name='typeQuantity']").checked = "";
        document.getElementById("file-input").value = "";
    }
    
    toastMessage(response.message, response.status);
})

function adminProdutoItem(object) {
    document.getElementById("list").innerHTML += `
    <div class="product-item">
        <div class="product-label">
            <p><b>Id:</b> ${object.id_produto}</p>
        </div>
        <div class="product-label">
            <p><b>Nome:</b> ${object.nome}</p>
        </div>
        <div class="product-label">
            <p><b>Tipo Quantidade:</b> ${object.tipo_quantidade}</p>
        </div>
        <div class="product-label-img">
            <p><b>Imagem:</b></p>
            <img src="${object.image_path}" alt="Imagem de ${object.nome}">
        </div>
        <div class="options">
            <button class="btn blue">Editar</button>
            <button class="btn red">Remover</button>
        </div>
    </div>
    `;

}