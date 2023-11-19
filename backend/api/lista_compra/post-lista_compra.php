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

$user_session_id = $_SESSION["user_id"];

$post = filter_input_array(INPUT_POST);
$itens = json_decode($post["data"], true);

$response = array();
$response["status"] = "error";
$response["message"] = "Nenhuma ação realizada!";
$response["body"] = $itens;

$listName = $post["list_name"];

try {
    if(!isset($itens) || !isset($listName)) {
        $response["status"] = "error";
        $response["message"] = "Há valores que não foram enviados na requisição!";
        echo json_encode($response);
        exit;
    }

    $listaID = criaListaRetornaId($conn, $listName, $user_session_id);

    foreach($itens as $item) {
        $sql = "CALL add_produto_lista(?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$item["id_produto"], $listaID ,$item["quantidade"]]);
    }

    $response["status"] = "sucess";
    $response["message"] = "Lista de Compras salva com sucesso!";
    echo json_encode($response);
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}


