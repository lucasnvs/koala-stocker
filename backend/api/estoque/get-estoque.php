<?php
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

$user_session_id = $_SESSION["user"]["id"];

$response["body"] = [];

try {
    $rs = $conn->prepare("CALL pegar_estoque_usuario(?)");
    $rs->execute([$user_session_id]);

    while($row = $rs->fetch(PDO::FETCH_OBJ)) {
        $response["body"][] = $row;
    }

    echo json_encode([
        "status"=> "success",
        "message" => "Estoque encontrado com sucesso!",
        "body" => $response["body"]
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status"=> "error",
        "message" => $e->getMessage(),
    ]);
}