<?php

include './Header.php';
include './DbConn.php';

$data=json_decode(file_get_contents("php://input"));


$sql = "SELECT price FROM cart where email='$data->email'";
$res = mysqli_query($conn,$sql);
$cost =0;
while($row = mysqli_fetch_assoc($res) ){
    $cost += $row['price'];
}
echo json_encode(['result'=>$cost]);
?>