<?php 
require 'core/init.php';

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $oldPass = filter_var($_POST['oldPassword'], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
    $confirmPass = filter_var($_POST['confirmPassword'], FILTER_SANITIZE_STRING);
   
    if(changePassword($id, $oldPass, $password)){
        echo ('ok');
    }else{
        echo ('not ok');
    }
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}
?>