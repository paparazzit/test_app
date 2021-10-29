<?php 
require 'core/init.php';



if($_SERVER['REQUEST_METHOD'] === "POST"){
    
    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $question = getSingleQuestion($id);
    
   echo json_encode($question);

    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>