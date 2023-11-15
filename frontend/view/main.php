<?php
session_start(); 
if(!isset($_SESSION["Authorization"])) {
    header("Location: ../../../index.php");
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
    <link rel="stylesheet" href="../styles/global.css">
    <link rel="stylesheet" href="../styles/subclasses.css">
    <link rel="stylesheet" href="../styles/components.css">
    <link rel="stylesheet" href="../styles/main.css">
    <script type="module" src="../src/client/main.js" async></script>
</head>
<body>
    <header id="header">
        <img src="../assets/icons/Logo.png" class="logo" alt="logo koala stocker">

        <div class="user">
            <h3><span id="user-name">Usuário</span><img src="../assets/icons/caret-down.svg"></h3>
            <ul id="top-menu-options">
                <li><a id="disconnect">Desconectar</a></li>
            </ul>
        </div>
    </header>
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
                <h2>Cadastrar alimento</h2><button id="close-card-grocery" class="btn-close"></button>
            </div>
            <div class="grocery">
                <aside>
                    <p>Caso você tenha comprado um alimento que não tenha cadastrado ainda, <a id="add-item" href="#">cadastre agora.</a></p>
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
    <div id="product-register" class="hidden card-frame"> <!--  add class hidden  -->
        <div class="card appear">
            <div class="top-bar">
                <h2>Cadastrar alimento</h2><button id="close-card-product" class="btn-close"></button>
            </div>
            <form id="form-product-register" class="product-register">
                <input id="title-item" type="text" name="name" placeholder="Nome do Alimento...">
                <h4>Qual medida você deseja usar para este alimento?</h4>
                <div class="radio-container">
                    <input type="radio" id="radioUnit" value="UNIDADE" name="typeQuantity">
                    <label for="radioUnit">Unidade</label>
                    <input type="radio" id="radioKg" value="KILOGRAMA" name="typeQuantity">
                    <label for="radioKg">Kilogramas(Kg)</label>
                    <input type="radio" id="radioLt" value="LITRO" name="typeQuantity">
                    <label for="radioLt">Litros</label>
                </div>

                <input id="file-input" type="file" name="file-upload">
                <input id="btn-product-submit" class="btn" type="submit" value="Cadastrar">
            </form>
        </div>
    </div>

</body>
</html>