<?php
$search = trim($_GET['b']);
$search_email = trim($_GET['e']);

$user = "u2364565_read_bl";
$pass = "55zx25kp3!";

$db = new PDO("mysql:host=localhost;dbname=u2364565_default", $user, $pass);

// $connection = mysqli_connect("localhost","u2364565_read_bl","55zx25kp3!","u2364565_default");
// if(!$connection){
//     die("Connection failed");
// }else{
//     mysqli_set_charset($connection, "utf8");
//     echo "Подключен ";
// }

if($search == 'all'){
    echo json_encode(getBlogs($db));
    return;
}else{
    //echo $search;
}

if($search_email != null){
    echo json_encode(getBlogsToEmail($db, $search_email));
    return;
}

function getBlogs($_db){
    $sql = "SELECT * FROM blogs";

    $stmt = $_db->prepare($sql);
    $stmt->execute();

    $res = array();
    $category = array();
    $user_name = array();
    $user_avatar = array();
    $date_publish = array();
    $image_preview = array();
    $name_blog = array();
    $description_blog = array();
    $time_view = array();
    $like_count = array();
    $comment_count = array();
    $repost_count = array();
    $tags = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = ($row['category'] . "*"
        . getNameFromEmails($_db)[$row['id']] . "*" . getAvatarFromEmails($_db)[$row['id']] . "*"
        . $row['date_publish'] . "*" . $row['image_preview'] . "*"
        . $row['name_blog'] . "*" . $row['description_blog'] . "*"
        . $row['time_view'] . "*" . $row['like_count'] . "*"
        . $row['comment_count'] . "*" . $row['repost_count'] . "*"
        . $row['tags']);
    }

    return $res;
}

function getBlogsToEmail($_db, $_e){
    $sql = "SELECT * FROM blogs WHERE user_email='$_e'";

    $stmt = $_db->prepare($sql);
    $stmt->execute();
    $res = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = ($row['category'] . "*"
        . getNameFromEmail($_db, $_e)[$row['id']] . "*" . getAvatarFromEmail($_db, $_e)[$row['id']] . "*"
        . $row['date_publish'] . "*" . $row['image_preview'] . "*"
        . $row['name_blog'] . "*" . $row['description_blog'] . "*"
        . $row['time_view'] . "*" . $row['like_count'] . "*"
        . $row['comment_count'] . "*" . $row['repost_count'] . "*"
        . $row['tags']);
    }

    return $res;
}

function getNameFromEmail($_db, $_email){
    $sql = "SELECT * FROM users WHERE email='$_email'";

    $stmt = $_db->prepare($sql);
    $stmt->execute();
    $res = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = $row['user_name'];
    }

    return $res;
}

function getAvatarfromEmail($_db, $_email){
    $sql = "SELECT * FROM users WHERE email='$_email'";

    $stmt = $_db->prepare($sql);
    $stmt->execute();
    $res = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = $row['user_avatar'];
    }

    return $res;
}

function getNameFromEmails($_db){
    $sql = "SELECT * FROM users";

    $stmt = $_db->prepare($sql);
    $stmt->execute();
    $res = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = $row['user_name'];
    }

    return $res;
}

function getAvatarFromEmails($_db){
    $sql = "SELECT * FROM users";

    $stmt = $_db->prepare($sql);
    $stmt->execute();
    $res = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = $row['user_avatar'];
    }

    return $res;
}