<?php 
require 'core/init.php';

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = filter_var($_POST['testId'], FILTER_SANITIZE_STRING);
    // $id = file_get_contents('php://input');
    
        $totalPoints = testPoints($id);
       
        updateTotalPoints($totalPoints, $id);
        // echo json_encode($totalPoints);
        echo json_encode('Ok');
  

    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>