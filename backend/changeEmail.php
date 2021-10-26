<?php 
require 'core/init.php';

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
   
    
   if (changeEmail($id, $email)){
       echo 'ok';
   }else{
    echo "nesto je poslo po zlu";
   }
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>