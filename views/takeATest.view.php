<div class="row">
    <div class="container">
        <div class="col-6 offset-3 ">
            <div class="testView show" id="test-intro">
                
            <h2 class="text-center mt-5"><?php echo $test['testName']?></h2>
            <div class="">
                <h5 class="text-center"><span><?php echo "Total points: " . $test['totalPoints']?></span></h5> 
                <h5 class="text-center"><span><?php echo "Test author: " . $test['authorName']?></span></h5> 
                <h5 class="text-center"><span><?php echo "Question No: " . $questionsCount?></span></h5> 
                <br>
                <button data-id="<?php echo $test['id']?>" id="takeThisTest" class="btn btn-primary form-control">Take this test</button>
            </div>
            </div>
            <div class="test-view d-none" id="questions">
                 <h3 class="text-center mt-5 mb-3"><?php echo $test['testName']?></h3>

                 <div id="questionForm">
                     <div id="question_text"></div>
                     <form action="#" class="form" id="question_form">
                        <div class="form-group">
                        <label for="answer">
                        </label>
                        <input id="myAnswer" type="text" name="answer" class="form-control">
                        </div>
                        <br>
                        <div class="form-group">
                            <button class="form-control btn btn-primary" id="nextQuestion">Next</button>
                        </div>
                     </form>
                 </div>
            </div>

        </div>
    </div>
</div>