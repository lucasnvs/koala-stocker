<?php
include "connection.php";
header("Content-Type: application/json");

$email = filter_input(INPUT_POST, "email_login");
$password = filter_input(INPUT_POST, "pass_login");

if(!isset($email) || !isset($password)) {
    echo json_encode([
        "status" => "error",
        "message" => "Email e senha são obrigatórios!"
    ]);
    exit;
}

$sql = "SELECT nome_completo, id_user, senha, user_role FROM users WHERE email = :emailUser";
$stmt = $conn->prepare($sql);
$stmt->bindParam("emailUser", $email);
$stmt->execute();
$queryResult = $stmt->fetch();

if(!password_verify($password, $queryResult["senha"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Senha não confere!"
    ]);
    exit;
}

session_start();
$_SESSION["user"]["email"] = $email;
$_SESSION["user"]["name"] = $queryResult["nome_completo"];
$_SESSION["user"]["role"] = $queryResult["user_role"];

echo json_encode([
    "status" => "success",
    "message" => "Logado com sucesso!"
]);