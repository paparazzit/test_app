<ul id="profList">
    <?php foreach($professors as $prof):?>
        <li class="profesori" data-prof ="<?php echo $prof['id']?>"><?php  echo $prof['name']?></li>
        <?php endforeach?>
</ul>