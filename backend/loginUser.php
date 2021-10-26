<?php 
require 'core/init.php';
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);


// loginUser($name, $password);
loginUser($email, $password);
// echo $user;
   
}
else{
    echo 'NEMAS OVLASCENJE ZA OVU STRANICU';
    
}

?>