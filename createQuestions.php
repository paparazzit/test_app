<?php 
$pageTitle = 'Home';
require 'backend/core/init.php';

if(!isLogged()){
    require 'views/index.view.php';
} 
else{
    if($_SESSION['userRole'] === 'admin' || $_SESSION['userRole'] === 'moderator' ){
        $testId = $_GET['id'];
        $currentTest = getSingleTest($testId);
        $myData = getQuestionList($testId);
        require 'users/createQuestions.view.php';
    } if($_SESSION['userRole'] === 'guest'){
        require 'users/guest.index.view.php';
    }
}

?>