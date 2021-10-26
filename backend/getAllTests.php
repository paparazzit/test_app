<?php 
require 'core/init.php';



if($_SERVER['REQUEST_METHOD'] === "POST"){
    $tests = getAllTests();
    
   echo json_encode($tests);
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>