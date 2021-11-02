<?php 
ob_start();
require 'backend/core/init.php';
$pageTitle= "take a test";
if(!isLogged()){
    header('Location: login.php');
} else{
    require 'views/inc/top.php';
    require 'views/inc/navbar.php';
    require 'backend/processTest.php';
    require 'views/inc/bottom.php';
}

ob_start();

?>