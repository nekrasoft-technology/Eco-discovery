<?php
$login = trim($_POST['login']);
$pass = trim($_POST['pass']);

// Функция для генерации случайной строки
function generateCode($length = 6) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";
    $code = "";
    $clen = strlen($chars) - 1;
    while (strlen($code) < $length) {
            $code .= $chars[mt_rand(0,$clen)];
    }
    return $code;
}

$link=mysqli_connect("localhost", "u2364565_read_bl", "55zx25kp3!", "u2364565_default");

if(!$link){
    die("Connection failed");
}else{
    mysqli_set_charset($link, "utf8");
}

if($login == '' || $pass == '') {
    //echo "Ошибка. Заполните все поля";
    $error = array();
    $error[0] = "530";
    echo json_encode($error);
    return;
}else{
    $query = mysqli_query($link,"SELECT id, pass, user_name FROM users WHERE email='".mysqli_real_escape_string($link,$login)."' LIMIT 1");
    $data = mysqli_fetch_assoc($query);

    // Сравниваем пароли
    if($data['pass'] == $pass)
    {
        // Генерируем случайное число и шифруем его
        $hash = md5(generateCode(10));

        if(!empty($_POST['not_attach_ip']))
        {
            // Если пользователя выбрал привязку к IP
            // Переводим IP в строку
            $insip = ", user_ip=INET_ATON('".$_SERVER['REMOTE_ADDR']."')";
        }

        // Записываем в БД новый хеш авторизации и IP
        mysqli_query($link, "UPDATE users SET hash='".$hash."' WHERE id='".$data['id']."'");

        // Ставим куки
        //setcookie("id", $data['id'], time()+60*60*24*30, "/");
        //setcookie("hash", $hash, time()+60*60*24*30, "/", null, null, true); // httponly !!!

        // Переадресовываем браузер на страницу проверки нашего скрипта
        //header("Location: check.php"); exit();
        
        

        
        $db = new PDO("mysql:host=localhost;dbname=u2364565_default", "u2364565_read_bl", "55zx25kp3!");
        echo json_encode(setUser($db, $data));
    }
    else
    {
        //print "Вы ввели неправильный логин/пароль";
        $error = array();
        $error[0] = "530";
        echo json_encode($error);
    }
}

function setUser($_db, $_data){
    $sql = "SELECT * FROM users";

    $stmt = $_db->prepare($sql);
    $stmt->execute();
    $res = array();

    while($row = $stmt->fetch()){
        $res[$row['id']] = ($row['user_name']."*".$row['email']."*".$row['followed']);
    }

    return $res[$_data['id']];
}