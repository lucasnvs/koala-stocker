<?php

function checkFile($file) {
    $supportedExtension = ["jpg", "jpeg", "png"];
    $MB1 = 1000000;
    $fileExtension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

    if ($file["error"] == UPLOAD_ERR_INI_SIZE || $file["size"] > 5 * $MB1) {
        echo json_encode([
            "status" => "error",
            "message" => "Arquivo excedeu limite de tamanho.",
        ]);
        exit;
    }

    if (!in_array($fileExtension, $supportedExtension)) {
        echo json_encode([
            "status" => "error",
            "message" => "Apenas arquivos JPG, JPEG, PNG são permitidos.",
        ]);
        exit;
    }
}