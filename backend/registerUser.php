<?php 
require 'core/init.php';

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
    $pass_hashed = password_hash($password, PASSWORD_DEFAULT);
    
    registerUser($name, $email, $pass_hashed);
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>