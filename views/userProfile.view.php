<div class="container">
    <h2 class="display-4 text-center"><?php echo ucfirst($currentUser->name) ?> profile Page</h2>
    <div class="row mt-4">
        
        <div class="col-6 offset-3">
        <div class="changeProfile">
               <div class="form-group">
                   <input   type="text" name="editName" value="<?php echo $currentUser->name?>"> <button data-id="<?php echo $currentUser->id?>" id="changeName" class="btn btn-primary">Change</button>
               </div>
               <div class="form-group">
                   <input type="text" name="editEmail" value="<?php echo $currentUser->email?>"> <button data-id="<?php echo $currentUser->id?>" id="changeEmail" class="btn btn-primary">Change</button>
               </div>
               <div class="form-group">
                   <p>Password</p><button id="changePass" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Change</button>
               </div>
               <?php if($currentUser->role === "admin"): ?>
                <div class="form-group">
                   <select name="userRole" id="changeRole" data-id="<?php echo $currentUser->id?>">
                       <option value="admin" selected>Admin</option>
                       <option value="moderator" >Moderator</option>
                       <option value="guest" >Guest</option>
                   </select>
               </div>
                <?php endif?>
           </div>
        </div>
    </div>
</div>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Change Password for <?php echo $currentUser->name?></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form  method="POST" class="form" id="changePasswordForm">
            <input id="passUserId" type="hidden" value="<?php echo $currentUser->id?>">
            <div class="form-group mb-3">
                <label for="oldPassword">Old password</label>
                <input type="password" name="oldPassword" placeholder="passowrd" class="form-control">
            </div>
            <div class="form-group mb-3">
                <label for="password">New password</label>
                <input type="password" name="password" placeholder="passowrd" class="form-control">
            </div>
            <div class="form-group mb-3">
                <label for="confirmPassword">Confirm password</label>
                <input type="password" name="confirmPassword" placeholder="passowrd" class="form-control">
            </div>
            <div class="form-group">
                    <p class="errorMsg" id="regNotification"></p>
                </div>
        </form>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="updatePassword" data-id="<?php echo $currentUser->id?>">Save changes</button>
      </div>
    </div>
  </div>
</div>