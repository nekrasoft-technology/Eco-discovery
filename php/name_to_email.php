<?php
$name = trim($_GET['n']);

$user = "u2364565_read_bl";
$pass = "55zx25kp3!";

$db = new PDO("mysql:host=localhost;dbname=u2364565_default", $user, $pass);

if($name != null){
    echo json_encode(getUserFromEmail($db, $name));
    return;
}

function getUserFromEmail($_db, $_e){
    $sql = "SELECT * FROM users WHERE user_name='$_e'";

    $stmt = $_db->prepare($sql);
    $stmt->execute();
    $res = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = $row['email'];
    }

    return $res;
}