<?php 
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

$user_session_id = $_SESSION["user_id"];

$post = filter_input_array(INPUT_POST);
$itens = json_decode($post["data"], true);

$response = array();
$response["status"] = "error";
$response["message"] = "Nenhuma ação realizada!";
$response["body"] = $itens;

try {
    if(!isset($itens)) {
        $response["status"] = "error";
        $response["message"] = "Sem itens enviados na requisição!";
        echo json_encode($response);
        exit;
    }

    foreach($itens as $item) {
        $sql = "CALL compra_feita(?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$user_session_id, $item["id_produto"], $item["quantidade"]]);
    }

    $response["status"] = "sucess";
    $response["message"] = "Compras salvas com sucesso!";
    echo json_encode($response);
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
