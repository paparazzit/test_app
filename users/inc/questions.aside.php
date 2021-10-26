<ul class ="list-group">
    <?php for($i =0; $i< count($myData); $i++):?>
        <li class="list-group-item" ><?php echo $i+1 ?> : 
        <?php if( strlen($myData[$i]['question'])>25)
        {echo substr($myData[$i]['question'], 0, 25)."..."; }
        else{echo $myData[$i]['question']; }?>
        </li>
     <?php endfor?>
</ul>