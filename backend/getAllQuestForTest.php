<?php 
require 'core/init.php';

if($_SERVER['REQUEST_METHOD'] === "POST"){
    
    $start =$_POST['start'];
    $qNo = $_POST['page'];
    
    $id = filter_var($_POST['testId'], FILTER_SANITIZE_STRING);
    $question = getNextQuestion($id, $qNo, $start);
    if($question){
        echo json_encode($question);
    }else{
        echo json_encode("nema vise");
    }
   
   
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>