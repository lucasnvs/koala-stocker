const list = document.getElementById('stock-list');

for (let index = 0; index < 20; index++) {
    var text = `                <li>
    <div class="item_stock">
        <img src="../assets/imgs/arroz_namorado.jpg">
        <h3>Ovos Brancos</h3>
        <p>Quantidade</p>
        <p><span class="red">12</span> unidades</p>
    </div>                 
</li>`
    list.innerHTML += text;
}