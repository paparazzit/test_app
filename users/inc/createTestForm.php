<section id="createTest">
            <form  class="form" method="#" id="createTestForm">
                <h2 class="display-5 text-center">Create new test </h2>
                <input type="hidden" name="id" value="<?php echo $_SESSION['userId']?>">
                
                <div class="form-group mb-3">
                    <label for="testName">Test name</label>
                    <input type="text" name="testName" placeholder="test name" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="testSbj">Test Subject</label>
                    <input type="text" name="testSbj" placeholder="test subject" class="form-control">
                </div>
                <div class="form-group">
                    <p class="errorMsg" id="regNotification"></p>
                </div>
                <a href="#" class="btn btn-primary form-control mb-3" id="createNewTestBtn" >Create test</a>
                
            </form>
            <div id="TestNotification"></div>
        </section>