<?php 
ob_start();
require "backend/core/init.php";
session_destroy();
header("location:index.php");
ob_end_flush();
?>