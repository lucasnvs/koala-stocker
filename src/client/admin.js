import { buildHeader } from "./header.js";
import { confirmCard, toastMessage } from "./dialog.js";
import { cardOutClick } from "../utils.js";

const cardProduct = document.getElementById("product-register");
const edit_card = document.getElementById("edit-product-register");

cardOutClick();
buildHeader();
updateProdutos();

function updateProdutos() {
    document.getElementById("list").innerHTML = "";
    fetch("./backend/api/produtos/get-produtos.php").then(async res => {
        let data = await res.json();
        console.log(data);
        if(data.status == "success") {
            data.body.forEach(element => {
                adminProdutoItem(element);
            });
        }
    })
}

function toggleCard(card) {
    card.classList.toggle("hidden");
}
document.getElementById("edit-close-card-product").onclick = () => toggleCard(edit_card)

document.getElementById("add-item").onclick = () => toggleCard(cardProduct);
document.getElementById("close-card-product").onclick = function() {
    toggleCard(cardProduct);
    document.getElementById("title-item").value = "";
    document.getElementById("file-input").value = "";
    document.getElementById("typeQuantity").value = "";
}

const formProductRegister = document.getElementById("form-product-register");
formProductRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = new FormData(formProductRegister);

    let selectValue = document.getElementById("typeQuantity").value;
    formData.append("typeQuantity", selectValue);

    const response = await fetch("./backend/api/produtos/post-produtos.php", {
        method: "POST",
        body: formData
    }).then(res => res.json());

    if (response.status == "success") {
        toggleCard(cardProduct);
        document.getElementById("title-item").value = "";
        selectValue = "";
        document.getElementById("file-input").value = "";
        updateProdutos();
    }
    
    toastMessage(response.message, response.status);
})


const editForm = document.getElementById("edit-form-product-register");
const editFormData = new FormData(editForm);

editForm.addEventListener("submit", async (e) =>{
    e.preventDefault();

    let nameValue = document.getElementById("edit-title-item").value;

    editFormData.append("name", nameValue);

    const response = await fetch("./backend/api/produtos/update-produtos.php", {
        method: "POST",
        body: editFormData
    }).then(res => res.json())

    if(response.status == "success") {
        toggleCard(edit_card);
        updateProdutos();
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
        document.getElementById("edit-typeQuantity").value = object.tipo_quantidade;
        document.getElementById("edit-title-item").value = object.nome;
        let selectValue = document.getElementById("edit-typeQuantity").value;

        editFormData.append("typeQuantity", selectValue);
        editFormData.append("id_produto", object.id_produto);
        editFormData.append("image_path", object.image_path);

        toggleCard(edit_card);
    })

    removeButton.addEventListener("click", async () => {
        
        let confirm = await confirmCard(`Ao clicar em sim você ira apagar "${object.nome}" da base de dados. Não podendo recuperá-lo, tem certeza?`).then(res => res).catch(res => res);

        if(!confirm) return

        let formData = new FormData();
        formData.append("id_produto", object.id_produto)
        formData.append("image_path", object.image_path)
        
        const response = await fetch("./backend/api/produtos/delete-produtos.php", {
            method: "POST",
            body: formData
        }).then(res => res.json());

        if(response.status == "success") {
            updateProdutos();
        }

        toastMessage(response.message, response.status)
    })

    document.getElementById("list").appendChild(productItem);
}