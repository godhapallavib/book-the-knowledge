<?php

include './Header.php';
include './DbConn.php';
$data=json_decode(file_get_contents("php://input"));

$sql = "SELECT * FROM cart where email='$data->email'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($res,MYSQLI_ASSOC);
echo json_encode(['result'=>$row]);

?>