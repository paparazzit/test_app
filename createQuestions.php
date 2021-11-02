<?php ob_start();
$pageTitle = 'Home';
require 'backend/core/init.php';

if(!isLogged()){
    require 'views/index.view.php';
} 

else{
    if($_SESSION['userRole'] === 'admin' || $_SESSION['userRole'] === 'moderator' ){
        if(isset($_GET['id'])){
        $testId = $_GET['id'];
        $currentTest = getSingleTest($testId);
        $myData = getQuestionList($testId);
        require 'users/createQuestions.view.php';}
        else{
        // echo"NEMATE DOZOLU DA TO RADITE";
        header('Location: index.php');
            // require 'views/index.view.php';
        }
    } if($_SESSION['userRole'] === 'guest'){
        require 'users/guest.index.view.php';
    }
}
ob_end_flush();
?>