<?php 
function getAllTests(){
    global $pdo;
    $stmt= $pdo->prepare("SELECT * FROM  tests");
    $stmt ->execute();
    $tests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $tests;
}

function getSingleTest($id){
    global $pdo;
    $stmt= $pdo->prepare("SELECT * FROM  tests WHERE id = ?");
    $stmt ->execute([$id]);
    $test = $stmt->fetch(PDO::FETCH_ASSOC);
    return $test;
}
function getTestByName($name){
    global $pdo;
    $stmt= $pdo->prepare("SELECT * FROM  tests WHERE testName =?");
    $stmt ->execute([$name]);
    $test = $stmt->fetch();
    return $test;
}
function getTestByAuthId($userId){
    global $pdo;
    $stmt = $pdo -> prepare("SELECT * FROM tests WHERE authorId = ? ");
    $stmt ->execute([$userId]);
    $tests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $tests;
}

function createTest($authorId, $authorName, $testName, $testSbj){
    global $pdo;
    $stmt= $pdo->prepare("SELECT * FROM  tests WHERE testName =?");
    $stmt ->execute([$testName]);
    $tests = $stmt->rowCount();

    if($tests >0){
        return false;
    }else{
    global $pdo;
    $stmt= $pdo->prepare("INSERT INTO tests (authorId, authorName, testName, testSbj) 
    VALUES(?, ?, ?, ?)");
    $stmt ->execute([$authorId, $authorName, $testName, $testSbj]);
    
    return true;
    }
}

function updateTest($testId, $testName, $testSbj){
    global $pdo;
    $stmt = $pdo ->prepare("UPDATE tests SET testName = ?, testSbj= ? WHERE id = ?");
   $stmt ->execute([$testName, $testSbj, $testId]);
    
   return true;
   
}

function insertQuestion($testId, $question, $answer_a, $answer_b, $points, $authorId){
   
    global $pdo;
    $stmt= $pdo->prepare("INSERT INTO questions (testId, question, answer_a, answer_b, points, authorId) 
    VALUES(?, ?, ?, ?, ?, ?)");
    $stmt ->execute([$testId, $question, $answer_a, $answer_b, $points, $authorId]);
    
    return true;
    
}
function getQuestionList($testId){
    global $pdo;
    $stmt = $pdo -> prepare("SELECT * FROM questions WHERE testId = ?");
    $stmt->execute([$testId]);
    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
    
    return $questions;
}

function deleteTest($id){
    global $pdo;
    $stmt = $pdo -> prepare("DELETE FROM tests WHERE id = ?");
    $stmt->execute([$id]);

    return true;
}
function  deleteTestQuestions($id){
    global $pdo;
    $stmt = $pdo -> prepare("DELETE FROM questions WHERE testId = ?");
    $stmt->execute([$id]);
    return 'ok';
}

function getNextQuestion($testId,$qNo, $start){
    global $pdo;
    
    
    $stmt = $pdo -> prepare("SELECT * FROM questions WHERE testId = ? LIMIT ". $start . ", ". $qNo);
    $stmt->execute([$testId]);
    $questions = $stmt->fetch();
    return $questions;
}
function getQuestionCount($testId){
    global $pdo;
    $stmt = $pdo -> prepare("SELECT * FROM questions WHERE testId = ?");
    $stmt->execute([$testId]);
    $questions = $stmt->rowCount();
    return $questions;
}
function getSingleQuestion($id){
    global $pdo;
    $stmt = $pdo -> prepare("SELECT * FROM questions WHERE id = ?");
    $stmt->execute([$id]);
    $question = $stmt->fetch();  
    return $question;
}
function updateQuestion( $question, $answer_a, $answer_b, $points,  $id){
    global $pdo;
    $stmt = $pdo ->prepare("UPDATE questions SET question = ?, answer_a = ?, answer_b = ?, points =?  WHERE id = ?");
   $stmt ->execute([ $question, $answer_a, $answer_b, $points, $id]);
    
   return true;
}
function testPoints($testId){
    global $pdo;
    $stmt = $pdo ->prepare("SELECT points FROM questions WHERE testId =?");
    $stmt ->execute([$testId]);
    $allQuestions = $stmt->fetchAll();
    $totalPoint= 0;
    for($i=0; $i<count($allQuestions); $i++){
        $totalPoint += $allQuestions[$i]->points;
    }

    return $totalPoint;
}
function updateTotalPoints($totalPoints, $id){
    global $pdo;
    $stmt = $pdo ->prepare("UPDATE tests SET  totalPoints= ? WHERE id = ?");
    $stmt ->execute([$totalPoints, $id]);
    
    return true;
}



?>