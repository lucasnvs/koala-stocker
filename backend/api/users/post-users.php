<?php
include "../../connection.php";

header("Content-Type: application/json");

function getIdByEmail($conn, $email) {
    $sql = "SELECT id_user FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);
    
    return $stmt->fetch(PDO::FETCH_ASSOC)["id_user"];
}

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
function checkPasswordFormat($password) { // minimo 5 caracteres // incluem minimo 1 minuscula e 1 numero
    $regex = '/^(?=.*[a-z])(?=.*\d).{5,}$/';

    if (preg_match($regex, $password)) {
        return true;
    } else {
        return false;
    }
}

try {
    $data = filter_input_array(INPUT_POST);

    if (!isset($data["password"]) || !isset($data["email"]) || !isset($data["fullname"])) {
        echo json_encode([
            "status" => "error",
            "message" => "Dados não enviados corretamente!",
        ]);
        exit;
    }

    $email = strtoupper($data["email"]);
    $password = $data["password"];
    $fullname = strtoupper($data["fullname"]);

    if(!checkPasswordFormat($password) || !checkEmailFormat($email)) {
        echo json_encode([
            "status" => "error",
            "message" => "Email ou Senha em formato incompatível!",
        ]);
        exit;
    }

    $existsInDB = checkEmail($conn, $email);
    if ($existsInDB) {
        echo json_encode([
            "status" => "error",
            "message" => "Email já existe!",
        ]);
        exit;
    }

    $encrypted = password_hash($password, PASSWORD_BCRYPT);
    $sql = "CALL insert_user(?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$fullname, $email, $encrypted]);

    $idCriado = getIdByEmail($conn, $email);

    session_start();
    $_SESSION["user"]["email"] = $email;
    $_SESSION["user"]["name"] = $fullname;
    $_SESSION["user"]["role"] = "DEFAULT";
    $_SESSION["user"]["id"] = $idCriado;

    echo json_encode([
        "status" => "success",
        "message" => "Usuário cadastrado com sucesso!",
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
    ]);
}
