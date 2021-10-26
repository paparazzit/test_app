<?php 
$pageTitle = 'Home';
require 'backend/core/init.php';
$professors = getAllUsers();
$allTests = getAllTests();
if(!isLogged()){
    require 'views/index.view.php';
} 
else{
    if($_SESSION['userRole'] === 'admin'){
        // require 'users/admin.index.view.php';
        require 'users/moderator.index.view.php';
    }if($_SESSION['userRole'] === 'moderator'){
        require 'users/moderator.index.view.php';
    } if($_SESSION['userRole'] === 'guest'){
        require 'views/index.view.php';
    }
}

?>