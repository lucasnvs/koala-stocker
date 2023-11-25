<?php
$raiz = $_SERVER['DOCUMENT_ROOT'];

$config = json_decode(file_get_contents($raiz . "/config.json"), true);

$host = $config["mysql"]["HOST"];
$user = $config["mysql"]["USER"];
$password = $config["mysql"]["MYSQL_PASSWORD"];
$database = $config["mysql"]["MYSQL_DATABASE"];
$port = $config["mysql"]["MYSQL_PORT_LOCAL"];

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

$conn = new PDO(
    "mysql:host=$host;port=$port;dbname=$database", $user, $password, $options
);