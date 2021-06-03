<?php

include './Header.php';
include './DbConn.php';

$result=array();

$data=json_decode(file_get_contents("php://input"));
$cid = $data->cid;
$email = $data->email;
$sql = "SELECT quantity FROM cart WHERE cid=$cid AND email='$email' ";
$res = mysqli_query($conn,$sql);
$quantity=0;
while($row = mysqli_fetch_assoc($res)){
    $quantity = $row['quantity'];
}
$quantity--;
$sql =" UPDATE cart set quantity=$quantity WHERE cid=$cid AND email='$email'";
$res=mysqli_query($conn,$sql);

if($res){
    $result["message"]="Deleted Successfully";
    $result["status"] = "true";
}
else{
    $result["message"] = "Fail";
    $result["status"] = "false";
    echo mysqli_error($conn);
}

echo json_encode($result);

?>