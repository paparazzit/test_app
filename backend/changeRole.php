<?php 
require 'core/init.php';

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $role = filter_var($_POST['userRole'], FILTER_SANITIZE_STRING);
   
    
   if (changeRole($id, $role)){
       echo 'ok';
   }else{
    echo "nesto je poslo po zlu";
   }
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>