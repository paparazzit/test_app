<?php 
if(isset($_GET['id'])){
    $id = filter_var($_GET['id'], FILTER_SANITIZE_STRING);
    $test = getSingleTest($id);
    $questionsCount = getQuestionCount($id);
    
    require "views/takeATest.view.php";
   
}else{
    header("location: index.php");
}


?>