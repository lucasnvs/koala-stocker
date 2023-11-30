<?php
include "../test-session.php";
include "../../connection.php";
include "../checkFile.php";
include "../testAuth.php";

header("Content-Type: application/json");

try {

    if(!testAuth("ADMIN")) {
        echo json_encode([
            "status" => "error",
            "message" => "Sem permissão para realizar essa ação!",
        ]);
        exit;
    }

    $post = filter_input_array(INPUT_POST);
    $file = $_FILES["file-upload"];
    $fileExtension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
    
    if (!isset($post["name"]) || !isset($post["typeQuantity"]) || !isset($file)) {
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
            ]);
            exit;
        }
    }

    checkFile($file);

    $tmpFile = $file["tmp_name"];
    $targetFile = "../../../backend/upload/products_imgs/" . md5(microtime()) . "." . $fileExtension;

    if (move_uploaded_file($tmpFile, $targetFile)) {
        $sql = "CALL insert_produto(?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$post["name"], $post["typeQuantity"], $targetFile]);

        echo json_encode([
            "status" => "success",
            "message" => "Produto criado com sucesso!",
        ]);
        exit;
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Erro ao realizar upload.",
        ]);
        exit;
    }

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
    ]);
}
