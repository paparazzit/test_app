<ul class ="list-group">
    <?php for($i =0; $i< count($myData); $i++):?>
        <li class="list-group-item questionBtn" data-question = "<?php echo $myData[$i]['id']?>"  data-bs-toggle="modal" data-bs-target="#exampleModal"><?php echo $i+1 ?> : 
        <?php if( strlen($myData[$i]['question'])>25)
        {echo substr($myData[$i]['question'], 0, 25)."..."; }
        else{echo $myData[$i]['question']; }?>
        </li>
     <?php endfor?>
</ul>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="questionTitle">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form action="" id="editQuestion" class="form">
                <h4 class="questionNo"></h4>
                <!-- <input type="hidden" value="<?php echo $currentTest['id']?>" name="test_id"> -->
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
                    <button class="btn btn-info" id="updateQuestion">Update</button> 
                   
                </div>
            </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>