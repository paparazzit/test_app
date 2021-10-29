<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">


      <?php if(!isLogged()):?>
        <a href="index.php" class="navbar-brand">
        <?php echo $pageTitle?>
        </a>
        <?php else: ?>
          <a href="<?php echo 'userProfile.php?id='. $_SESSION['userId']?>" class="navbar-brand"> 
        <?php echo ucfirst(getUserBySession()->name)?>
        </a>
       
          <?php endif?>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto">
        <a class="nav-link active" aria-current="page" href="index.php">Home</a>
        <?php if(isLogged()) : ?>
          <a class="nav-link" href="logout.php">LogOut</a>
          <a class="nav-link" href="tests.php">Tests</a>
          <?php if(getUserBySession()->role === 'admin') :?>
            <a class="nav-link" href="allUsers.php">Users</a>
            <?php endif?>
          <?php else : ?>
            <a class="nav-link" href="login.php">Login</a>
        <a class="nav-link" href="register.php">Register</a>
          <?php endif;?>
        

        
      </div>
    </div>
  </div>
</nav>