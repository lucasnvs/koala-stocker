<?php
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

$user_session_id = $_SESSION["user"]["id"];

$response = [];
$response["status"] = "error";

try {
    $lists = [];

    $rs = $conn->prepare("CALL pegar_listas_usuario(?)");
    $rs->execute([$user_session_id]);

    while($row = $rs->fetch(PDO::FETCH_OBJ)) {
        $li;

        $li["id_lista"] =  $row->id_lista; 
        $li["nome"] =  $row->nome;  
        $lists[] = $li;
    }

    foreach ($lists as $li) {
        $rs = $conn->prepare("CALL pegar_lista(?)");
        $rs->execute([$li["id_lista"]]);
        $produtoArray = [];

        while($row = $rs->fetch(PDO::FETCH_OBJ)) {
            $produtoArray[] = $row;
        }
        $li["produtos"] = $produtoArray;

        $response["body"][] = $li;
    }

    $response["status"] = "sucess";
    echo json_encode($response);
} catch (Exception $e) {
    echo json_encode([
        "status"=> "error",
        "message"=> $e->getMessage()
    ]);
}