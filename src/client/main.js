const list = document.getElementById('stock-list');
const groceryList = document.getElementById('grocery-list');
const card_grocery = document.getElementById("card-grocery");
const card_newItem = document.getElementById("product-register");

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

document.getElementById("user-name").innerHTML = loggedUser.name;
// renders

async function renderStock(items) {

    if (!items) {
        items = await localStorage.getWhereUserId("item", loggedUser.id);
        if(!items) return;
    };
    console.log(items)
    list.innerHTML = "";
    items.forEach(item => {
        var text = `
            <li>
                <div class="item_stock">
                <div class="img-container">
                    <img src=${item.img}>
                </div>
                    <h3>${item.name}</h3>
                    <p>Quantidade</p>
                    <p><span class="red">${item.quantity}</span> ${item.typeQuantity}</p>
                </div>                 
            </li>`
        list.innerHTML += text;
    })
}
renderStock();
// renderGroceryList
for (let index = 0; index < 3; index++) {
    var text = `                <li>
    <div class="grocery-list-card">
        <h2>Dieta Semanal Vegana</h2>
        <span>Listar 14 itens <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" fill="#FFF"/></svg></span>
        <ul class="list">
        </ul>
        <p>Valor estimado: <span>R$76.80</span></p>
        <button class="btn">Usar</button>
    </div>
</li>`
    groceryList.innerHTML += text;
}

async function renderItemListGroceryCard(items) {
    let list = document.getElementById("item-list");
    if (!items) {
        items = await localStorage.getWhereUserId("item", loggedUser.id);
        if(!items) return;
    };

    list.textContent = "";
    items.forEach( item => {
        let li = document.createElement("li");
        let comp = componentCreation.itemAddCard(item);
        li.appendChild(comp)
        list.appendChild(li);
    })
}
renderItemListGroceryCard();

// search in stock
const searchStock = document.getElementById('searchInStock');

searchStock.addEventListener('input', async (e) => {
    let value = e.target.value.toLowerCase();
    let items = await localStorage.getWhereUserId("item", loggedUser.id);
    let resSearch = items.filter(item => item.name.toLowerCase().includes(value));
    renderStock(resSearch);
});

const searchGrocery = document.getElementById('search-grocery-item');

searchGrocery.addEventListener('input', async (e) => {
    let value = e.target.value.toLowerCase();
    let items = await localStorage.getWhereUserId("item", loggedUser.id);
    let resSearch = items.filter(item => item.name.toLowerCase().includes(value));
    renderItemListGroceryCard(resSearch);
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
// cards handling

///// card grocery
document.getElementById("btnAddGroceryList").addEventListener("click", () => {
    card_grocery.classList.toggle("hidden");
});

document.getElementById("close-card-grocery").addEventListener("click", () => {
    card_grocery.classList.toggle("hidden");
});

///// card 
document.getElementById("add-item").addEventListener("click", () => {
    card_newItem.classList.toggle("hidden");
});
document.getElementById("close-card-product").addEventListener("click", () => {
    card_newItem.classList.toggle("hidden");
});

document.getElementById("btn-product-submit").addEventListener("click", () => {
    const radioUnit = document.getElementById("radioUnit");
    const radioKg = document.getElementById("radioKg");
    const imageInput = document.getElementById("file-input");
    const title = document.getElementById("title-item");
    let unit = radioUnit.checked;
    let kg = radioKg.checked;

    let measureChosen;
    if (unit) measureChosen = "UNIT";
    if (kg) measureChosen = "KG";

    let file = imageInput.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var imageContent = event.target.result;

        var product = {
            name: title.value,
            typeQuantity: measureChosen,
            quantity: 0,
            img: imageContent
        }

        console.log(product);
        if(localStorage.set("item", FK_newObject(product, "fkUserId", loggedUser.id))) {
            title.value = "";
            radioKg.checked = false;
            radioUnit.checked = false;
            imageInput.value = "";
            card_newItem.classList.toggle("hidden");
            renderStock();
        }
    }

    reader.readAsDataURL(file);
})