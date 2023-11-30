import { buildHeader } from "./header.js";
import { toastMessage } from "./dialog.js";
import { cardOutClick } from "../utils.js";

let card = document.getElementById("product-register");

cardOutClick();
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

document.getElementById("add-item").onclick = () => toogleCardNewItem();
document.getElementById("close-card-product").onclick = function() {
    toogleCardNewItem();
    document.getElementById("title-item").value = "";
    document.getElementById("file-input").value = "";
    document.getElementById("typeQuantity").value = "";
}

const formProductRegister = document.getElementById("form-product-register");
formProductRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = new FormData(formProductRegister);

    let selectValue = document.getElementById("typeQuantity");
    formData.append("typeQuantity", selectValue);

    const response = await fetch("./backend/api/produtos/post-produtos.php", {
        method: "POST",
        body: formData
    }).then(res => res.json());

    if (response.status == "success") {
        toogleCardNewItem();
        document.getElementById("title-item").value = "";
        selectValue.value = "";
        document.getElementById("file-input").value = "";
    }
    
    toastMessage(response.message, response.status);
})

function adminProdutoItem(object) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.classList.add('card');

    const productLabel = document.createElement('div');
    productLabel.classList.add('product-label');
    
    const productIdLabel = document.createElement('p');
    productIdLabel.innerHTML = `<b>Id:</b> ${object.id_produto}`;
    productLabel.appendChild(productIdLabel);
    productItem.appendChild(productLabel);

    const productNameLabel = document.createElement('div');
    productNameLabel.classList.add('product-label');

    const productNameLabelText = document.createElement('p');
    productNameLabelText.innerHTML = `<b>Nome:</b> ${object.nome}`;
    productNameLabel.appendChild(productNameLabelText);
    productItem.appendChild(productNameLabel);

    const productQuantityTypeLabel = document.createElement('div');
    productQuantityTypeLabel.classList.add('product-label');

    const productQuantityTypeLabelText = document.createElement('p');
    productQuantityTypeLabelText.innerHTML = `<b>Tipo Quantidade:</b> ${object.tipo_quantidade}`;
    productQuantityTypeLabel.appendChild(productQuantityTypeLabelText);
    productItem.appendChild(productQuantityTypeLabel);

    const productLabelImg = document.createElement('div');
    productLabelImg.classList.add('product-label-img');
    const productImageLabel = document.createElement('p');
    productImageLabel.innerHTML = `<b>Imagem:</b>`;
    productLabelImg.appendChild(productImageLabel);

    const productImage = document.createElement('img');
    productImage.src = object.image_path;
    productImage.alt = `Imagem de ${object.nome}`;
    productLabelImg.appendChild(productImage);
    productItem.appendChild(productLabelImg);

    const options = document.createElement('div');
    options.classList.add('options');

    const editButton = document.createElement('button');
    editButton.id = 'btn-edit';
    editButton.classList.add('btn');
    editButton.classList.add('green');
    editButton.textContent = 'Editar';
    options.appendChild(editButton);

    const removeButton = document.createElement('button');
    removeButton.id = 'btn-remove';
    removeButton.classList.add('btn');
    removeButton.classList.add('red');
    removeButton.textContent = 'Remover';
    options.appendChild(removeButton);

    productItem.appendChild(options);


    editButton.addEventListener("click", () => {
        // reutilizar card de criar
        // setar valores do input
        // 
    })

    removeButton.addEventListener("click", () => {
        // card de certeza
        // se sim
        // faz req para excluir
        // se nao 
        // faz nada e fecha o card
    })

    document.getElementById("list").appendChild(productItem);
}