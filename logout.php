<?php 
require 'backend/core/init.php';

session_destroy();
header('Location: index.php');
?>