<?php
include "test-session.php";

echo json_encode([
    "status" => "success",
    "message" => "Usuário logado",
    "user" => $_SESSION['user'],
]);