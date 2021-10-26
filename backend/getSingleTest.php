<?php 
require 'core/init.php';



if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $test = getSingleTest($id);
   echo json_encode($test);
// echo json_encode($id);
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>