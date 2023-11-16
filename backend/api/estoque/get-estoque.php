<?php
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

$user_session_id = $_SESSION["user_id"];

$response = array();
$response["status"] = "error";

try {
    $rs = $conn->prepare("CALL pegar_estoque_usuario(?)");
    $rs->execute([$user_session_id]);
    $response["status"] = "sucess";

    while($row = $rs->fetch(PDO::FETCH_OBJ)) {
        $response["body"][] = $row;
    }

    echo json_encode($response);
} catch (Exception $e) {
    $response["status"] = "error";
    $response["body"] = $e->getMessage();
    echo  json_encode($response);
}