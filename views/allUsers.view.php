<div class="container">
    <h2><?php echo getUserBySession()->name?></h2>
    <div class="row">
        <div class="allUsersView col-8 offset-2">
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created at</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="allUsersTable">
                   <?php foreach($users as $user) :?>
                    <tr>
                        <td><?php echo $user['name']?></td>
                        <td><?php echo $user['email']?></td>
                        <td><?php echo $user['created_at']?></td>
                        <td><?php echo $user['role']?></td>
                        
                        <td><button class="btn btn-warning editUser" data-id="<?php echo $user['id']?>" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td>
                        <td><button class="btn btn-danger deleteUser" id="<?php echo $user['id']?>">Delete</button></td>
                    </tr>
                    <?php endforeach;?>
                </tbody>
            </table>
        </div>
    </div>


    <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="editModal">
          
                   <form  id="editUser">
                   <input type="hidden" name="id">
                   <div class="form-group mb-3">
                    <label for="name">Name</label>
                    <input type="text" name="name" placeholder="name" class="form-control">
                </div>

                <div class="form-group mb-3">
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Email" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <select name="role" id="selectRole">
                        
                       
                    </select>
                </div>
                
                <div class="form-group mb-3">
                
                    <button id="updateUser" class="btn btn-primary form-control">Update</button>
                </div>
                <div class="form-group">
                    <p class="errorMsg" id="regNotification"></p>
                </div>
                   </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
</div>

