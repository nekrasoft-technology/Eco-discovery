<?php
$email = trim($_GET['e']);

$user = "u2364565_read_bl";
$pass = "55zx25kp3!";

$db = new PDO("mysql:host=localhost;dbname=u2364565_default", $user, $pass);

if($email != null){
    echo json_encode(getUserFromEmail($db, $email));
    return;
}

function getUserFromEmail($_db, $_e){
    $sql = "SELECT * FROM users WHERE email='$_e'";

    $stmt = $_db->prepare($sql);
    $stmt->execute();
    $res = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = $row['email']."*".$row['user_name']."*".$row['user_avatar']."*".$row['followers']."*".$row['verify']."*".$row['followed'];
    }

    return $res;
}