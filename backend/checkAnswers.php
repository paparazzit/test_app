<?php 
require 'core/init.php';
if($_SERVER['REQUEST_METHOD'] === "POST"){
      $testId = $_GET['testId'];
    $score =0;
    
    $i=0;
    $userAnswers = $_POST;
    $answers_a = [];
    $answers_b = [];
    $questions = getQuestionList($testId);
    $totalScore = testPoints($testId);
    $percentage = 0;
    $questionCount = count($questions);

foreach($questions as $question){
  array_push($answers_a, $question['answer_a']);
  array_push($answers_b, $question['answer_b']);
}
foreach($userAnswers as $key=>$answer){
    if($questions[$i]['answer_a'] === $answer || $questions[$i]['answer_b'] === $answer){
        $score += $questions[$i]['points'];
    }
    $i++;

}

$percentage = get_percentage($totalScore, $score);


$message = message($percentage);

    echo json_encode("YOUR TOTAL SCORE IS " . $score . " OUT OF: ".  $totalScore . " \r\n"."You have: ". $percentage ."%" ."\r\n " . $message) ;
    
    $answers_a = [];
    $answers_b = [];
    $score =0;
   
    
}else{
    echo 'NEMATE OVLASCENJA DA BUDETE NA OVOJ STRANICI';
}




?>