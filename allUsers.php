<?php 
$pageTitle='Users';
require 'backend/core/init.php';
if(!isLogged()){
    header('Location: index.php');
}
require 'views/inc/top.php';
require 'views/inc/navbar.php';
?>
<?php if(getUserBySession()->role === 'admin'){
    $users = getAllUsers();
    require 'views/allUsers.view.php';
}
 else{
    header('Locaiton: index.php');
 }
?>



<?php require 'views/inc/bottom.php'?>