<?php 
ob_start();
require 'core/init.php';
if($_SERVER['REQUEST_METHOD'] === "POST"){
    
    $userId = $_SESSION['userId'];
    $tests = getTestByAuthId($userId);
    
   echo json_encode($tests);

    
}else{
    header('Location:index.php');
    // require 'index.php';
    
}
ob_end_flush();

?>