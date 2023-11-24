<?php
session_start();
if (!isset($_SESSION["user"])) {
    header("Location: ./index.php");
}
if ($_SESSION["user"]["role"] != "ADMIN") {
    header("Location: ./main.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/gif" href="../assets/icons/logo_img.png">
    <title>Koala's - Admin</title>
    <link rel="stylesheet" href="./styles/global.css">
    <link rel="stylesheet" href="./styles/subclasses.css">
    <link rel="stylesheet" href="./styles/components.css">
    <link rel="stylesheet" href="./styles/admin.css">
    <script src="./src/client/admin.js" async type="module"></script>
</head>

<body>
    <header id="header"></header>
    <div id="main">
        <div class="mid-section">
            <div class="top-table-actions">
                <button id="add-item" class="btn">Adicionar novo item</button>
            </div>
            <div id="list">
            </div>
        </div>
    </div>
    <div id="product-register" class="hidden card-frame">
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