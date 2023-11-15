<?php
session_start(); 
if(!isset($_SESSION["Authorization"]) || !isset($_SESSION["user_id"])) {
    header("Location: ../../index.php");
}