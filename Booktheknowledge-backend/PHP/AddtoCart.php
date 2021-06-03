<?php

include './Header.php';
include './DbConn.php';

$result=array();

$id=$_POST['id'];
$email = $_POST['email'];
$sql ="SELECT * FROM cart where id=$id AND email='$email'";
$res = mysqli_query($conn,$sql);
$count=0;
while($row = mysqli_fetch_assoc($res)){
    $count++;
}
if($count >=1){
    $result["message"]="Product already added!";
    $result["status"] = "false";
}

else{
    $sql = "SELECT * FROM booklist where id=$id";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
    $img = $row['img'];
    $title = $row['title'];
    $author = $row['author'];
    $price = $row['price'];

    $result = array();
    $sql_insert = "INSERT INTO cart(email,id,img,title,author,quantity,price) VALUES(
                '$email',$id,'$img','$title','$author',1,$price)";
    $res_insert = mysqli_query($conn,$sql_insert);
    if($res_insert){
        $result["message"]="Added to Cart";
        $result["status"] = "true";
    }
    else{
        $result["message"] = "Couldn't add to cart";
        $result["status"] = "false";
        echo mysqli_error($conn);
    }
}
echo json_encode($result);
?>