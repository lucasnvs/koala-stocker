<?php

$host = "mysql"; 
$user = "root";
$port = "3306";  
$password = getenv("MYSQL_PASSWORD");
$database = getenv("MYSQL_DATABASE");

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

$conn = new PDO(
    "mysql:host=$host;port=$port;dbname=$database", $user, $password, $options
);
