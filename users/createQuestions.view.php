<?php 

require 'views/inc/top.php';
require 'views/inc/navbar.php';
?>

<div class="container">
    <div class="row">
        <h2 class="text-center my-3 "><?php echo $currentTest['testName']?></h2>
        <div class="col-7 offset-1">
            <form action="" id="questionForm" class="form">
                <h4 class="questionNo"></h4>
                <input type="hidden" value="<?php echo $currentTest['id']?>" name="test_id">
                <div class="form-group mb-3">
                    <label for="question">Insert question text</label>
                    <input name="question"  class="form-control"></input>
                </div>
                <div class="form-group mb-3">
                    <label for="answer_a">Insert correct Answer</label>
                    <input type="text" name="answer_a" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="answer_b">Insert alternative answer</label>
                    <input type="text" name="answer_b" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="points">Question points</label>
                    <input type="text" name="points" class="form-control">
                </div>

                <div class="form-group">
                    <p class="errorMsg" id="regNotification"></p>
                </div>
                <div class="form-group d-flex justify-content-between">
                    <button class="btn btn-info" id="nextQBtn">Next question</button> 
                    <button class="btn btn-warning" id="finishQBtn">Finish</button>
                </div>
            </form>
            <div id="TestNotification"></div>
        </div>
        <div class="col-3 offset-1">
            <h5 class="text-center ">Questions</h5>
            <?php require 'inc/questions.aside.php'?>
        </div>
    </div>
</div>

<?php require 'views/inc/bottom.php'?>