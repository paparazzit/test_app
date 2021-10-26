<?php 
require 'core/init.php';

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
   
    if(deleteUser($id) ){
        echo 'ok';
    }else{
        echo "nesto drugo";
    }
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>