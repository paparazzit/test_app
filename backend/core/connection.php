<?php 
// set DNS - data base source name

$dns ='mysql:host=' . HOST .'; dbname=' . DB;

try{
    $pdo =new PDO($dns, USER, PASSWORD);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e){
echo "CONNECTION FAILED: " .$e->getMessage();
}

?>