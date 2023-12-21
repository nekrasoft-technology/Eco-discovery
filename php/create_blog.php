<?php

print_r($_POST);

$user = "u2364565_read_bl";
$pass = "55zx25kp3!";

$db = new PDO("mysql:host=localhost;dbname=u2364565_default", $user, $pass);

addPreviewBlog($db);

function addPreviewBlog($_db){
    $post_category = trim($_POST['category']);
    $post_user_name = trim($_POST['user_name']);
    $post_user_avatar = trim($_POST['user_avatar']);
    $post_date_publish = trim($_POST['date_publish']);
    $post_image_preview = trim($_POST['image_preview']);
    $post_name_blog = trim($_POST['name_blog']);
    $post_description_blog = trim($_POST['description_blog']);
    $post_time_view = trim($_POST['time_view']);
    $post_like_count = trim($_POST['like_count']);
    $post_comment_count = trim($_POST['comment_count']);
    $post_repost_count = trim($_POST['repost_count']);
    $post_tags = trim($_POST['tags']);

    $sql = "INSERT INTO blogs(category, user_name, user_avatar,
    date_publish, image_preview, name_blog, description_blog,
    time_view, like_count, comment_count, repost_count, tags) 
    VALUES(:m_category, :m_user_name, :m_user_avatar, :m_date_publish,
    :m_image_preview, :m_name_blog, :m_desc_blog, :m_time_view, 
    :m_like_count, :m_comment_count, :m_repost_count, :m_tags)";

    $stmt = $_db -> prepare($sql);

    $stmt -> bindParam(":m_category", $post_category);
    $stmt -> bindParam(":m_user_name", $post_user_name);
    $stmt -> bindParam(":m_user_avatar", $post_user_avatar);
    $stmt -> bindParam(":m_date_publish", $post_date_publish);
    $stmt -> bindParam(":m_image_preview", $post_image_preview);
    $stmt -> bindParam(":m_name_blog", $post_name_blog);
    $stmt -> bindParam(":m_desc_blog", $post_description_blog);
    $stmt -> bindParam(":m_time_view", $post_time_view);
    $stmt -> bindParam(":m_like_count", $post_like_count);
    $stmt -> bindParam(":m_comment_count", $post_comment_count);
    $stmt -> bindParam(":m_repost_count", $post_repost_count);
    $stmt -> bindParam(":m_tags", $post_tags);

    $stmt -> execute();
}
