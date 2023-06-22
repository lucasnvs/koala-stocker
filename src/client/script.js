const list = document.getElementById('stock-list');
const groceryList = document.getElementById('grocery-list');

const fetchData = async () => {
    var items = await fetch("../src/database/data.json").then( res => res.json());     
    return items;
}

async function renderList(items) {

    if(!items) items = await fetchData();

    list.innerHTML = "";
    
    // "func verificaQuant" para verficar quantidade e pintar o span

    for (let i = 0; i < 4; i++) { // gambiarra para ter quantidade;
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
}
renderList();

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

const searchStock = document.getElementById('searchInStock');

searchStock.addEventListener('input', async (e) => {  
    let value = e.target.value.toLowerCase();
    let items = await fetchData();
    let resSearch = items.filter(item => item.name.toLowerCase().includes(value));
    renderList(resSearch);
});

// events de clique 

const btnAddGroceryList = document.getElementById("btnAddGroceryList");

btnAddGroceryList.addEventListener("click", () => {
    componentCreation.cardDialog();
});
