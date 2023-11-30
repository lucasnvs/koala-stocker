<?php

include "../test-session.php";
include "../../connection.php";
include "../checkFile.php";
include "../testAuth.php";

header("Content-Type: application/json");

function apagaArquivo($fileLocation) {
    if(file_exists( $fileLocation )){
        if(unlink($fileLocation)) {
            return true;
        }
    }

    return false;
}

try {
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
    
    $file = $_FILES["file-upload"];
    $fileExtension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

    if (!isset($post["name"]) || !isset($post["typeQuantity"])) {
        echo json_encode([
            "status" => "error",
            "message" => "Dados não enviados corretamente!",
        ]);
        exit;
    }

    foreach($post as $key) {
        if(empty($key)) {
            echo json_encode([
                "status" => "error",
                "message" => "Nenhum dos valores pode ser nulo!",
                "key" => $key
            ]);
            exit;
        }
    }

    if($file["size"] == 0) {
        $query = "UPDATE produtos SET nome = ?, tipo_quantidade = ? WHERE id_produto = ?"; // sem imagem
        $stmt = $conn->prepare($query);
        $stmt->execute([$post["name"], $post["typeQuantity"], $id_produto]);

    } else {
        checkFile($file);

        $tmpFile = $file["tmp_name"];
        $targetFile = "../../../backend/upload/products_imgs/" . md5(microtime()) . "." . $fileExtension;

        if(!apagaArquivo($fileLocation)) {
            echo json_encode([
                "status" => "error",
                "message" => "Erro ao tentar apagar imagem antiga",
            ]);
            exit;
        }

        if(move_uploaded_file($tmpFile, $targetFile)) {
            $query = "UPDATE produtos SET nome = ?, tipo_quantidade = ?, image_path = ? WHERE id_produto = ?"; 
            $stmt = $conn->prepare($query);
            $stmt->execute([$post["name"], $post["typeQuantity"], $targetFile, $id_produto]);
        }
    }

    echo json_encode([
        "status" => "success",
        "message" => "Produto atualizado com sucesso!",
    ]);


} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
    ]);
}