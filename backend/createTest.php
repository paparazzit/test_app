<?php 
require 'core/init.php';
if($_SERVER['REQUEST_METHOD'] === "POST"){
    $testName = filter_var($_POST['testName'], FILTER_SANITIZE_STRING);
    $authorId = filter_var($_POST['authorId'], FILTER_SANITIZE_STRING);
    $testSbj = filter_var($_POST['testSbj'], FILTER_SANITIZE_STRING);
    $user = getSingle($authorId);
    if($user){      
        $authorName = $user->name;
        $createdTest = createTest($authorId, $authorName, $testName, $testSbj);
        if($createdTest){
          echo json_encode(getTestByName($testName));
        
           
        }else{
            echo json_encode('failed');
        }
    }
}else{
    echo json_encode('NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI');
}
?>