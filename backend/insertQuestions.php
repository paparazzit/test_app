<?php 
require 'core/init.php';



if($_SERVER['REQUEST_METHOD'] === "POST"){
    $testId = filter_var($_POST['test_id'], FILTER_SANITIZE_STRING);
    $question = filter_var($_POST['question'], FILTER_SANITIZE_STRING);
    $answer_a = filter_var($_POST['answer_a'], FILTER_SANITIZE_STRING);
    $answer_b = filter_var($_POST['answer_b'], FILTER_SANITIZE_STRING);
    $points = filter_var($_POST['points'], FILTER_SANITIZE_STRING);
    $authorId = $_SESSION['userId'];
    
    if(insertQuestion($testId, $question, $answer_a, $answer_b, $points, $authorId)){
        echo 'ok';
    }else{
        echo 'not ok';
    }
    
    
   
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>