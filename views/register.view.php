<?php
 require 'inc/top.php';
require 'inc/navbar.php';     
?>

<div class="container">
    <h2 class="display-4 text-center my-5"><?php echo $pageTitle?></h2>
    <div class="row">
        <div class="col-6 offset-3">
            <form action="register.php" method="POST" class="form " id="register">
                <div class="form-group mb-3">
                    <label for="name">Name</label>
                    <input type="text" name="name" placeholder="name" class="form-control">
                </div>

                <div class="form-group mb-3">
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Email" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Password" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="confirmPassword">Confirm password</label>
                    <input type="password" name="confirmPassword" placeholder="Password" class="form-control">
                </div>
                <div class="form-group mb-3">
                
                    <button id="registerBtn" class="btn btn-primary form-control">Register</button>
                </div>
                <div class="form-group">
                    <p class="errorMsg" id="regNotification"></p>
                </div>
            </form>
        </div>
    </div>
</div>

<?php 
require 'inc/bottom.php';
?>