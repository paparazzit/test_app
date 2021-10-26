
<?php 

require 'views/inc/top.php';
require 'views/inc/navbar.php';
?>

<div class="container">
    <div class="row">
        <h2 class="text-center">Edit test: <br>
            <span ><?php echo $currentTest['testName']?></span></h2>
            <div class="col-7 offset-1" >

            <form  class="form" method="#" id="editTestInfo">
                <input type="hidden" name='id' value="<?php echo $currentTest['id']?>">
                <div class="form-group mb-3">
                    <label for="testName">Test name</label>
                    <input type="text" name="testName" placeholder="test name" value="<?php echo $currentTest['testName']?>" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="testSbj">Test Subject</label>
                    <input type="text" name="testSbj" placeholder="test subject" class="form-control" value="<?php echo $currentTest['testSbj']?>">
                </div>
                <div class="form-group">
                    <p class="errorMsg" id="regNotification"></p>
                </div>
                <a href="#" class="btn btn-primary form-control mb-3" id="createQBtn" >Confirm and create questions</a>
                
            </form>
            <div id="TestNotification"></div>
            </div>
           <div class="col-3 offset-1">
              
           <?php require 'inc/questions.aside.php'?>
           </div>
    </div>
</div>


<?php require 'views/inc/bottom.php'?>

