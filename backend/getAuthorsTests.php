<?php 
require 'core/init.php';



if($_SERVER['REQUEST_METHOD'] === "POST"){
    
    $userId = $_SESSION['userId'];
    $tests = getTestByAuthId($userId);
    
   echo json_encode($tests);

    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>