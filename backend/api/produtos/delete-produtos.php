<?php
include "../test-session.php";
include "../../connection.php";
include "../testAuth.php";

header("Content-Type: application/json");

if(!testAuth("ADMIN")) {
    echo json_encode([
        "status" => "error",
        "message" => "Sem permissão para realizar essa ação!",
    ]);
    exit;
}

$post = filter_input_array(INPUT_POST);

$id_produto = $post["id_produto"];
$fileLocation = $post["image_path"];

if(!isset($id_produto) || empty($id_produto)) {
    echo json_encode([
        "status" => "error",
        "message" => "Valores não enviados corretamente!",
    ]);
    exit;
}

$sql = "DELETE FROM produtos WHERE id_produto = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id_produto]);

if(file_exists( $fileLocation )){
    if(unlink($fileLocation)) {
        echo json_encode([
            "status" => "success",
            "message" => "Produto deletado com sucesso!",
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Falha ao apagar o arquivo!",
        ]);
        exit;
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Falha ao apagar o arquivo!",
    ]);
    exit;
}