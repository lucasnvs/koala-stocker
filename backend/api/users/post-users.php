<?php
include "../connection.php";

header("Content-Type: application/json");

function checkEmail($conn, $email) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);

    return $stmt->fetch();
}

try {
    $response = array();
    $response["status"] = "error";
    $response["message"] = "Dados não recebidos corretamente!";

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && isset($data["password"]) && isset($data["email"]) && isset($data["fullname"])) {
        $email = strtoupper($data["email"]);
        $fullname = strtoupper($data["fullname"]);

        $existsInDB = checkEmail($conn, $email);
        if ($existsInDB) {
            $response["status"] = "error";
            $response["message"] = "Email já existe!";
        } else {
            $encrypted = password_hash($data["password"], PASSWORD_BCRYPT);
            $sql = "INSERT INTO users (nome_completo, email, senha) VALUES (?, ?, ?);";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$fullname, $email, $encrypted]);

            $response["status"] = "success";
            $response["message"] = "Usuário cadastrado com sucesso!";
        }
    }

    echo json_encode($response);

} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
