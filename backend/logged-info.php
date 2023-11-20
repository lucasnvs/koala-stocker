<?php
include "test-session.php";
$response = [];

$response["status"] = "sucess";
$response["username"] = $_SESSION["user_name"];
$response["role"] = $_SESSION["user_role"];

echo json_encode($response);