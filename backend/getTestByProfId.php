<?php 
require 'core/init.php';



if($_SERVER['REQUEST_METHOD'] === "POST"){
    
    $userId = $id = filter_var($_POST['userId'], FILTER_SANITIZE_STRING);;
    $tests = getTestByAuthId($userId);
    
   echo json_encode($tests);

    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>