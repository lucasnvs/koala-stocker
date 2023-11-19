<?php
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

$user_session_id = $_SESSION["user_id"];

$response = array();
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
    $response["status"] = "error";
    $response["body"] = $e->getMessage();
    echo  json_encode($response);
}

// requisitar do banco todas as listas do usuario
// requisitar todos os itens da lista x de cada id de lista e concatenar no body