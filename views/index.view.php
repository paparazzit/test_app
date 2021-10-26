<?php
 require 'inc/top.php';
require 'inc/navbar.php';     
?>

    <div class="container">
        <div class="row mt-5">
            <div class="col-3 " id="profesori">
                <?php require 'views/professours.view.php';?>
            </div>
            <div class="col-7 offset-2"  >
                <h3>Testovi</h3>
               <div class="d-flex  flex-wrap" id="testovi">
               <!-- <?php require 'views/allTests.view.php'?> -->
               </div>
            </div>
        </div>
    </div>

<?php 
require 'inc/bottom.php';
?>