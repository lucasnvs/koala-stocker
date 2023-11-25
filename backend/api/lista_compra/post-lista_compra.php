<?php 
include "../test-session.php";
include "../../connection.php";

header("Content-Type: application/json");

function criaListaRetornaId($conn, $listName, $user_session_id) {
    $sql = "CALL cria_lista(?,?, @listaID)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$listName, $user_session_id]);

    $stmt = $conn->query("SELECT @listaID AS listaID");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    return $row['listaID'];
}

$user_session_id = $_SESSION["user"]["id"];

$post = filter_input_array(INPUT_POST);
$itens = json_decode($post["data"], true);

$listName = $post["list_name"];

try {
    if(!isset($itens) || !isset($listName)) {
        echo json_encode([
            "status"=> "error",
            "message"=> "Há valores que não foram enviados na requisição!"
        ]);
        exit;
    }

    $listaID = criaListaRetornaId($conn, $listName, $user_session_id);

    foreach($itens as $item) {
        $sql = "CALL add_produto_lista(?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$item["id_produto"], $listaID ,$item["quantidade"]]);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Lista de Compras salva com sucesso!",
        "body" => $itens
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
    ]);
}