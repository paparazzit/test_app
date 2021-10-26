<?php 
require 'core/init.php';



if($_SERVER['REQUEST_METHOD'] === "POST"){
    $testId = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $testName = filter_var($_POST['testName'], FILTER_SANITIZE_STRING);

    $testSbj = filter_var($_POST['testSbj'], FILTER_SANITIZE_STRING);
    $myTest = updateTest($testId, $testName, $testSbj);
  
    if($myTest){
      $test = getSingleTest($testId);
      echo json_encode($test);
    
    }else{
        echo"Imamo neku gresku";
    }
    
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>