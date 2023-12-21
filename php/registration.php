<?php
$login = trim($_POST['login']);
$pass = md5(md5(trim($_POST['pass'])));

$link=mysqli_connect("localhost", "u2364565_read_bl", "55zx25kp3!", "u2364565_default");

if(!$link){
    die("Connection failed");
}else{
    mysqli_set_charset($link, "utf8");
}

$err = [];

if(!preg_match("/^[a-zA-Z0-9]+$/",$login))
{
    $err[] = "Логин может состоять только из букв английского алфавита и цифр";
}

if(strlen($_POST['login']) < 3 or strlen($_POST['login']) > 30)
{
    $err[] = "Логин должен быть не меньше 3-х символов и не больше 30";
}

$query = mysqli_query($link, "SELECT id FROM users WHERE email='".mysqli_real_escape_string($link, $_POST['login'])."'");
//$result = mysqli_result($query);
if(mysqli_num_rows($query))
{
    $err[] = "Пользователь с таким логином уже существует в базе данных";
}

if(count($err) == 0)
    {

        //$login = $_POST['login'];

        // Убераем лишние пробелы и делаем двойное хеширование
        //$password = md5(md5(trim($_POST['password'])));

        mysqli_query($link,"INSERT INTO users SET email='".$login."', pass='".$password."'");
        //header("Location: login.php"); exit();
        $code_auth = array();
        $code_auth[0] = "200";
        echo json_encode($code_auth);
    }
    else
    {
        //print "<b>При регистрации произошли следующие ошибки:</b><br>";
        foreach($err AS $error)
        {
            //print $error."<br>"; 
        }
    }


    function setUser($_db, $_data){
        $sql = "SELECT * FROM users";
    
        $stmt = $_db->prepare($sql);
        $stmt->execute();
        $res = array();
    
        while($row = $stmt->fetch()){
            $res[$row['id']] = ($row['user_name']."*".$row['email']);
        }
    
        return $res[$_data['id']];
    }