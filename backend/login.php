<?php
    include "connection.php";
    header("Content-Type: application/json");
    $response = [];

    
    $email = filter_input(INPUT_POST, "email_login");
    $password = filter_input(INPUT_POST, "pass_login");

    if(!isset($email) || !isset($password)) return;

    $sql = "SELECT id_user, senha, user_role FROM users WHERE email = :emailUser";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam("emailUser", $email);
    $stmt->execute();
    $queryResult = $stmt->fetch();


    if(password_verify($password, $queryResult["senha"])) {
        // gerar hash de auth;
        $authHash = "dafsdfrgg";
        session_start();
        $_SESSION["user_id"] = $queryResult["id_user"];
        $_SESSION["user_role"] = $queryResult["user_role"];
        $_SESSION["Authorization"] = $authHash;

        $response["status"] = 200;
        $response["message"] = "Logado com sucesso!";
    }
    
    echo json_encode($response);
    // escrever em csv as auth (id usuario; hash)