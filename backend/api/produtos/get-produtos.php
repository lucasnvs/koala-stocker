<?php
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

$response = array();
$response["status"] = "error";

try {
    $rs = $conn->prepare("SELECT * FROM produtos;");
    $rs->execute();
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