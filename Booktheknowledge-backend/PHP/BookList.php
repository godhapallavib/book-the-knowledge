<?php

include './Header.php';
include './DbConn.php';

$sql = "SELECT * FROM booklist";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($res,MYSQLI_ASSOC);
echo json_encode(['result'=>$row]);
?>