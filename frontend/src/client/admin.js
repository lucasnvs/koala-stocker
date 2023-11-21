import { sucessMSG } from "./dialog.js";

document.getElementById("disconnect").addEventListener("click", () => {
    fetch("../../../backend/logout.php").then(async res => {
        window.location.href = "../../index.php";
    })
});

fetch("../../../backend/api/produtos/get-produtos.php").then(async res => {
    let data = await res.json();
    if(data.status == "sucess") {
        data.body.forEach(element => {
            adminProdutoItem(element);
        });
    }
})

const card_newItem = document.getElementById("product-register");

document.getElementById("add-item").addEventListener("click", () => {
    card_newItem.classList.toggle("hidden");
});
document.getElementById("close-card-product").addEventListener("click", () => {
    card_newItem.classList.toggle("hidden");
});

const formProductRegister = document.getElementById("form-product-register");
formProductRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("../../../backend/api/produtos/post-produtos.php", {
        method: "POST",
        body: new FormData(formProductRegister)
    }).then(async res => {
        let data = await res.json();
        if (data.status == "sucess") {
            card_newItem.classList.toggle("hidden");
            document.getElementById("title-item").value = "";
            document.querySelector("input[name='typeQuantity']").checked = "";
            document.getElementById("file-input").value = "";

            sucessMSG("Item criado com sucesso!");
        }
    })
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