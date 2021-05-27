<?php
include './Header.php';
include './DbConn.php';

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$result = array();

$sql = "SELECT * FROM register WHERE email='$email'";
$res = mysqli_query($conn,$sql);
$rowcount = mysqli_num_rows($res);
if($rowcount >0){
    $result["message"] = "User already exists.Please Login";
    $result["status"] = "false";
}
else{
    $sql = "INSERT INTO register VALUES('$name','$email','$password')";
    $sql_login = "INSERT INTO login VALUES('$email','$password')";
    $res = mysqli_query($conn,$sql);
    $res_login = mysqli_query($conn,$sql_login);
    if($res && $res_login){
        $result["message"] = "Registration Successful.Please Login";
        $result["status"] = "true";
    }
    else{
        $result["message"] = "Registration Failed";
        $result["status"] = "false";
    }
}

echo json_encode($result);
?>