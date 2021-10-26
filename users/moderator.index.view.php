
<?php 

require 'views/inc/top.php';
require 'views/inc/navbar.php';
?>

<div class="container">
    <div class="row mt-5">
        <div class="col-3"><?php require 'inc/sideBar.php'?></div>
        <div class="col-7 offset-1 " >
            <div id="createTestView" class="view border p-3"><?php require 'inc/createTestForm.php'?></div>
            <div id="allTestTable" class="view"><?php require 'inc/allTestTable.php'?></div>
            <div id="editTestsView" class="view"><?php require 'inc/editTests.php'?></div>
            <div id="editLastTest" class="view"><?php require 'inc/editLastTest.php'?></div>
        </div>             
    </div>
</div>


<?php require 'views/inc/bottom.php'?>