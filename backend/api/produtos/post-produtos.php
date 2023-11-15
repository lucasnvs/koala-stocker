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

$response = array();
if(!testAuth("ADMIN")) {
    $response["status"] = "error";
    $response["message"] = "Sem permissão para realizar essa ação!";
    echo json_encode($response);
    exit;
}

$MB1 = 1000000;
$supportedExtension = ["jpg", "jpeg", "png"];

try {
    $response["status"] = "error";
    $response["message"] = "Dados não recebidos corretamente!";

    $post = filter_input_array(INPUT_POST);
    $file = $_FILES["file-upload"];
    $response["data"] = $_FILES;

    if (isset($post["name"]) && isset($post["typeQuantity"]) && isset($file)) {
        if ($_FILES["file-upload"]["error"] == UPLOAD_ERR_INI_SIZE || $_FILES["file-upload"]["size"] > 5000000) {
            $response["status"] = "error";
            $response["message"] = "Arquivo excedeu limite de tamanho.";
            echo json_encode($response);
            exit;
        }
        $fileExtension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

        if (!in_array($fileExtension, $supportedExtension)) {
            $response["status"] = "error";
            $response["message"] = "Apenas arquivos JPG, JPEG, PNG são permitidos.";
            exit;
        }

        $tmpFile = $_FILES["file-upload"]["tmp_name"];
        $targetFile = "../../../backend/upload/products_imgs/" . md5(microtime()) . "." . $fileExtension;

        if (move_uploaded_file($tmpFile, $targetFile)) {
            $sql = "CALL insert_produto(?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$post["name"], $post["typeQuantity"], $targetFile]);

            $response["status"] = "sucess";
            $response["message"] = "Produto salvo com sucesso!";
        } else {
            $response["status"] = "error";
            $response["message"] = "Erro ao realizar upload.";
            echo json_encode($response);
            exit;
        }
    }

    echo json_encode($response);
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
