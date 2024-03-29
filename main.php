<?php
session_start(); 
if(!isset($_SESSION["user"])) {
    header("Location: ./index.php");
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/gif" href="../assets/icons/logo_img.png">
    <title>Koala's - Dashboard</title>
    <link rel="stylesheet" href="./styles/global.css">
    <link rel="stylesheet" href="./styles/subclasses.css">
    <link rel="stylesheet" href="./styles/components.css">
    <link rel="stylesheet" href="./styles/main.css">
    <script type="module" src="./src/client/main.js" async></script>
</head>
<body>
    <header id="header"></header>
    <main id="main">
        <section id="grocery">
            <div class="space topbottom">
                <h2>Você andou fazendo alguma compra recentemente?</h2>
                <button id="btnAddGroceryList" class="btn space topbottom all">Adicionar agora</button>
            </div>
            <h2 class="title space topbottom">Compras recorrentes</h2>
            <div id="container-grocery-list">
                <ul id="grocery-list">
                </ul>
            </div>
        </section>
        <section id="stock">
            <div class="top-config">
                <h1>Meu estoque</h1>
                <input id="searchInStock" placeholder="Pesquisar produto...">
                <button class="btn">Visualizar receitas disponíveis</button>
            </div>
            <div id="container-stock">
                <ul id="stock-list">
                </ul>
            </div>
        </section>
    </main>
    <div id="card-grocery" class="hidden card-frame">
        <div class="card appear">
            <div class="top-bar">
                <h2>Cadastrar compra</h2><button id="close-card-grocery" class="btn-close"></button>
            </div>
            <div class="grocery">
                <aside>
                    <input id="search-grocery-item" type="text" placeholder="Nome do alimento...">
                    <ul id="item-list">
                    </ul>
                </aside>
                <div class="container">
                    <div class="list-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Alimento</th>
                                    <th>Quantidade</th>
                                </tr>
                            </thead>
                            <tbody id="item-table">
                            </tbody>
                        </table>
                    </div>
                    <div class="btn-container">
                        <button id="create-grocery-list" class="btn"><img src="../assets/icons/carrinho.png"></button>
                        <button id="save-grocery-list" class="btn">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="name-card" class="hidden card-frame">
        <div class="card appear" style="max-width: 500px;">
            <div class="top-bar">
                <h2>Cadastrar lista de compras</h2><button id="close-name-card" class="btn-close"></button>
            </div>
            <input id="list-name" type="text" name="list-name" placeholder="Nome da lista...">
            <button id="btn-name-card" class="btn all">Criar</button>
        </div>
    </div>
</body>
</html>