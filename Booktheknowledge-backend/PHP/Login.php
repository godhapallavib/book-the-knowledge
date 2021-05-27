<?php
include './Header.php';
include './DbConn.php';

$email = $_POST['email'];
$password = $_POST['password'];

$result = array();

$sql = "SELECT * FROM login where email='$email' AND password='$password'";
$res = mysqli_query($conn,$sql);
$rowcount = mysqli_num_rows($res);

if($rowcount > 0){
    $result["message"] = "Login Successful";
    $result["status"] = "true";
}
else{
    $result["message"] = "Incorrect email/password";
    $result["status"] = "false";
}

echo json_encode($result);
?>