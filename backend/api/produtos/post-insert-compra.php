<?php 
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

$user_session_id = $_SESSION["user_id"];

$post = filter_input_array(INPUT_POST);
$itens = json_decode($post["data"], true);

try {
    if(!isset($itens)) {
        echo json_encode([
            "status" => "error",
            "message" => "Sem itens enviados na requisição!",
        ]);
        exit;
    }

    foreach($itens as $item) {
        $sql = "CALL compra_feita(?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$user_session_id, $item["id_produto"], $item["quantidade"]]);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Compras salvas com sucesso!",
        "body" => $itens,
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
    ]);
}
