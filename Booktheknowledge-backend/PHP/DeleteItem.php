<?php

include './Header.php';
include './DbConn.php';

$data=json_decode(file_get_contents("php://input"));
$result = array();
$cid =$data->cid;
$sql = "DELETE FROM cart WHERE cid = $cid";
$res = mysqli_query($conn,$sql);
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