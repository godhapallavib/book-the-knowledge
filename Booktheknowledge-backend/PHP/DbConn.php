<?php
$conn = mysqli_connect('172.17.0.3','root','password','booktheknowledge');
if(!$conn){
    echo mysqli_connect_error();
}
?>