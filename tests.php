<?php 
$pageTitle = 'Testovi';
require 'backend/core/init.php';
$professors = getAllUsers();

    require 'views/index.view.php';

?>