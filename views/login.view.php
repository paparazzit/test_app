<div class="container">
    <h2 class="display-4 text-center my-5"><?php echo $pageTitle?></h2>
    <div class="row">
    <div class="col-6 offset-3">
            <form  method="POST" class="form" id="loginUser">
                <div class="form-group mb-3">
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Email" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Password" class="form-control">
                </div>
                
                <div class="form-group mb-3">
                
                    <button id="loginBtn" class="btn btn-primary form-control">Login</button><br><br>
                    <p class="float-end">If you don't have an account please<a href="register.php"> register</a></p>
                </div>
                <div class="form-gorup">
                    <p class="errorMsg" id="regNotification"></p>
                </div>
            </form>
        </div>
    </div>
</div>