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
        <div id="top">
            <button id="add-item" class="btn">Adicionar novo item</button>
            
        </div>
        <div id="list">
        </div>
    </div>


    <div id="product-register" class="hidden card-frame">
        <div class="card appear" style="max-width: 500px;">
            <div class="top-bar">
                <h2>Cadastrar alimento</h2><button id="close-card-product" class="btn-close"></button>
            </div>
            <form id="form-product-register" class="product-register">
                <input id="title-item" type="text" name="name" placeholder="Nome do Alimento...">
                <select id="typeQuantity">
                    <option selected disabled value="">Selecione qual medida deseja usar.</option>
                    <option value="UNIDADE">Unidade</option>
                    <option value="KILOGRAMA">Kilogramas (KG)</option>
                    <option value="LITRO">Litros</option>
                </select>

                <input id="file-input" type="file" name="file-upload">
                <input id="btn-product-submit" class="btn" type="submit" value="Cadastrar">
            </form>
        </div>
    </div>
</body>
</html>