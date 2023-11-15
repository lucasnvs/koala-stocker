<?php
include "../../connection.php";

header("Content-Type: application/json");

function checkEmail($conn, $email) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);

    return $stmt->fetch();
}

function checkEmailFormat($email) {
    $regex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

    if (preg_match($regex, $email)) {
        return true;
    } else {
        return false;
    }
}
function checkPasswordFormat($password) { // minimo 5 caracteres // incluem minimo 1 letra maiuscula, 1 minuscula e 1 numero
    $regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/';

    if (preg_match($regex, $password)) {
        return true;
    } else {
        return false;
    }
}

try {
    $response = array();
    $response["status"] = "error";
    $response["message"] = "Dados não recebidos corretamente!";

    $data = filter_input_array(INPUT_POST);

    if (isset($data["password"]) && isset($data["email"]) && isset($data["fullname"])) {
        $email = strtoupper($data["email"]);
        $password = $data["password"];
        $fullname = strtoupper($data["fullname"]);

        if(!checkPasswordFormat($password) || !checkEmailFormat($email)) {
            $response["message"] = "Email ou Senha em formato incompatível!";
            echo json_encode($response);
            exit;
        }

        $existsInDB = checkEmail($conn, $email);
        if ($existsInDB) {
            $response["status"] = "error";
            $response["message"] = "Email já existe!";
        } else {
            $encrypted = password_hash($password, PASSWORD_BCRYPT);
            $sql = "CALL insert_user(?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$fullname, $email, $encrypted]);

            $response["status"] = "200";
            $response["message"] = "Usuário cadastrado com sucesso!";
        }
    }

    echo json_encode($response);

} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
