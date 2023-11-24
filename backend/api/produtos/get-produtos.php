<?php
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

$response = [];

try {
    $rs = $conn->prepare("SELECT * FROM produtos;");
    $rs->execute();

    while($row = $rs->fetch(PDO::FETCH_OBJ)) {
        $response["body"][] = $row;
    }

    echo json_encode([
        "status" => "success",
        "message" => "Produtos encontrados!",
        "body" => $response["body"]
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
    ]);
}