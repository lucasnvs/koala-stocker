const list = document.getElementById('stock-list');

for (let index = 0; index < 20; index++) {
    var text = `                <li>
    <div class="item_stock">
        <img src="../assets/imgs/arroz_namorado.jpg">
        <h3>Arroz Integral</h3>
        <p>Quantidade</p>
        <p><span class="red">3.5</span> kg</p>
    </div>                 
</li>`
    list.innerHTML += text;
}