<?php
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

function testAuth($role) {
    if($_SESSION["user_role"] == $role) {
        return true;
    }
    return false;
}

$MB1 = 1000000;
$supportedExtension = ["jpg", "jpeg", "png"];

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

    if ($_FILES["file-upload"]["error"] == UPLOAD_ERR_INI_SIZE || $_FILES["file-upload"]["size"] > 5 * $MB1) {
        echo json_encode([
            "status" => "error",
            "message" => "Arquivo excedeu limite de tamanho.",
        ]);
        exit;
    }

    if (!in_array($fileExtension, $supportedExtension)) {
        echo json_encode([
            "status" => "error",
            "message" => "Apenas arquivos JPG, JPEG, PNG são permitidos.",
        ]);
        exit;
    }

    $tmpFile = $_FILES["file-upload"]["tmp_name"];
    $targetFile = "../../../backend/upload/products_imgs/" . md5(microtime()) . "." . $fileExtension;

    if (move_uploaded_file($tmpFile, $targetFile)) {
        $sql = "CALL insert_produto(?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$post["name"], $post["typeQuantity"], $targetFile]);

        echo json_encode([
            "status" => "success",
            "message" => "Produto salvo com sucesso!",
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
