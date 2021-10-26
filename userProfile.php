<?php 
$pageTitle='Users';
require 'backend/core/init.php';
if(!isLogged()){
    header('Location: index.php');
}else{
    $id = $_SESSION['userId'];
    $currentUser = getSingle($id);
    require 'views/inc/top.php';
    require 'views/inc/navbar.php';
    
    require 'views/userProfile.view.php';
    require 'views/inc/bottom.php';
}
?>



