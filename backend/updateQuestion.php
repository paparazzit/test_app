<?php 
require 'core/init.php';



if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    // $question = $_POST['question'];
    $question = filter_var($_POST['question'], FILTER_SANITIZE_STRING);
    $answer_a = filter_var($_POST['answer_a'], FILTER_SANITIZE_STRING);
    $answer_b = filter_var($_POST['answer_b'], FILTER_SANITIZE_STRING);
    $points = filter_var($_POST['points'], FILTER_SANITIZE_STRING);


    // echo json_encode($answer_a . " ".$answer_b . " ".$question ." ". $id);
    if (updateQuestion( $question, $answer_a, $answer_b, $points,  $id)){
        echo json_encode('ok');
    }else{
        echo json_decode('not ok');
    }
    // $myTest = updateTest($testId, $testName, $testSbj);
  
    // if($myTest){
    //   $test = getSingleTest($testId);
    //   echo json_encode($test);
    
    // }else{
    //     echo"Imamo neku gresku";
    // }
    
    
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>