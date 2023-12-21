OpenSavedPageMobile(localStorage.getItem('idPageSave'));
function OpenSavedPageMobile(id){
    switch(id){
        case 0:
            OpenHomeMobile();
            break;
        case 3:
            OpenProfileMobile();
            break;    
    }
}


function checkForEnter(e, id){
    if(e.keyCode == 13){
      document.getElementById(id).click();
    }
}

//mobile finder
document.addEventListener('DOMContentLoaded', () => {
    const onScrollHeader = () => {
        const header = document.getElementById("header_mobile");
        let prevScroll = window.scrollY;
        let currentScroll;
        window.addEventListener('scroll', () => {
            currentScroll = window.scrollY;

            const headerHidden = () => header.classList.contains('hidden');

            if(currentScroll > (prevScroll+30) && !headerHidden()){
                header.classList.add('hidden');
            }
            if(currentScroll < prevScroll-30 && headerHidden()){
                header.classList.remove('hidden');
            }

            prevScroll = currentScroll;
        })
    }

    onScrollHeader();
});
function openSearchPanel(){
    document.getElementById("logoMobile").classList.remove('on');
    document.getElementById("searchPanel_mobile").classList.add('open');
    document.getElementById("btnSearchOpenMobile").classList.remove('on');
    document.getElementById("btnFilterMobile").classList.add('on');
    document.getElementById("btnCloseSearchMobile").classList.add('on');
}
function closeSearchPanel(){
    let string_search = document.getElementById("input_search_mobile").value;

    if(string_search != ""){
        document.getElementById("input_search_mobile").value = "";
    }else{
        document.getElementById("logoMobile").classList.add('on');
        document.getElementById("searchPanel_mobile").classList.remove('open');
        document.getElementById("btnSearchOpenMobile").classList.add('on');
        document.getElementById("btnFilterMobile").classList.remove('on');
        document.getElementById("btnCloseSearchMobile").classList.remove('on');
        document.getElementById("input_search_mobile").value = "";
    }
}
function StartSearchMobile(){
    var stringSearch = document.getElementById("input_search_mobile").value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/search_blog.php?b='+stringSearch, true); 
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText); 
        } else {
            alert( xhr.responseText );
        }
    }
}
function CreateBlog(){
    var category = "Экословарь";
    var user_name = "Эко открытие official";
    var user_avatar = "https://www.eco-discovery.ru/images/favicon/android-chrome-512x512.png";
    var date_publish = "03.12.2023";
    var image_preview = "https://n1s1.hsmedia.ru/3e/f7/ca/3ef7ca4afa1c8732f23b0876cc158573/728x364_1_105f20fb04ddc831f754f8178cabccc2@5000x2500_0xzgzGJtZV_8784614817724096627.jpg";
    var name_blog = "Что такое экология";
    var description_blog = "Любое живое существо (в том числе и человек) множеством невидимых нитей связано с тем, что его окружает: с неживой природой, с множеством других организмов, с тем, что сделано руками человека.";
    var time_view = "10 минут";
    var like_count = 10;
    var comment_count = 4;
    var repost_count = 1;
    var tags = "экология,термины,проблемы,решения";

    const xhr = new XMLHttpRequest();
    //var body = "login=" + encodeURIComponent(login) + "&pass=" + encodeURIComponent(pass);
    var body = 
      "category=" + encodeURIComponent(category) +
      "&user_name=" + encodeURIComponent(user_name) +
      "&user_avatar=" + encodeURIComponent(user_avatar) +
      "&date_publish=" + encodeURIComponent(date_publish) +
      "&image_preview=" + encodeURIComponent(image_preview) +
      "&name_blog=" + encodeURIComponent(name_blog) + 
      "&description_blog=" + encodeURIComponent(description_blog) +
      "&time_view=" + encodeURIComponent(time_view) + 
      "&like_count=" + encodeURIComponent(like_count) + 
      "&comment_count=" + encodeURIComponent(comment_count) + 
      "&repost_count=" + encodeURIComponent(repost_count) + 
      "&tags=" + encodeURIComponent(tags);

    xhr.open("POST", 'php/create_blog.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var data = (xhr.responseText);
            //var res = JSON.parse(data);
            console.log(data);
        }
    }
}


//create list
GetDataInCreate();
function GetDataInCreate(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/search_blog.php?b=all&e', true); 
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText); 
        } else {
            var data = (xhr.responseText);
            var res = JSON.parse(data);
            for(prop in res){
                var stringBlogData = res[prop].split("*"); 
                //console.log(stringBlogData);
                FillListBlogs(stringBlogData);
                //illListBlogsProfile(stringBlogData);
            }
        }
    }
}
function FillListBlogs(arr){
    let $fragment = new DocumentFragment();

    const $link_blog = document.createElement('li');
    $link_blog.classList.add('link_blog');
    const $link_blog_a = document.createElement('a');
    $link_blog_a.classList.add('link_blog_a');
    $link_blog_a.href = "#";

    const $user_info = document.createElement('a');
    $user_info.classList.add('link_blog_user_info_container');
    $user_info.href = "?u="+arr[1];

    const $user_avatar_container = document.createElement('div');
    $user_avatar_container.classList.add('link_blog_user_avatar_container');
    const $user_avatar = document.createElement('img');
    $user_avatar.classList.add('link_blog_user_avatar');
    $user_avatar.src=arr[2];
    $user_avatar_container.append($user_avatar);

    const $user_name_data_container = document.createElement('div');
    $user_name_data_container.classList.add('link_blog_user_name_data_container');
    const $user_name = document.createElement('p');
    $user_name.classList.add('link_blog_user_name');
    $user_name.textContent = arr[1];
    const $date_publish = document.createElement('p');
    $date_publish.classList.add('link_blog_data');
    $date_publish.textContent = arr[3];
    $user_name_data_container.append($user_name);
    $user_name_data_container.append($date_publish); 

    $user_info.append($user_avatar_container);
    $user_info.append($user_name_data_container);

    const $image_container = document.createElement('div');
    $image_container.classList.add('link_blog_image_container');
    const $preview_image = document.createElement('img');
    $preview_image.classList.add('link_blog_preview_image');
    $preview_image.src=arr[4];
    $image_container.append($preview_image);

    const $blog_name_container = document.createElement('div');
    $blog_name_container.classList.add('link_blog_name_container');
    const $blog_name = document.createElement('p');
    $blog_name.classList.add('link_blog_name');
    $blog_name.textContent = arr[5];
    $blog_name_container.append($blog_name);

    const $blog_description_container = document.createElement('div');
    $blog_description_container.classList.add('link_blog_description_container');
    const $blog_description = document.createElement('p');
    $blog_description.classList.add('link_blog_description');
    $blog_description.textContent = arr[6];
    $blog_description_container.append($blog_description);

    const $blog_feedback_container = document.createElement('div');
    $blog_feedback_container.classList.add('link_blog_feedback_container');

    const $blog_like_container = document.createElement('div');
    $blog_like_container.classList.add('link_blog_like_container');
    const $blog_like = document.createElement('img');
    $blog_like.classList.add('link_blog_like');
    $blog_like.src = "images/ic_like_eco_off.png";
    $blog_like_container.append($blog_like);
    $blog_feedback_container.append($blog_like_container);

    const $blog_comment_container = document.createElement('div');
    $blog_comment_container.classList.add('link_blog_comment_container')
    const $blog_comment = document.createElement('img');
    $blog_comment.classList.add('link_blog_comment');
    $blog_comment.src = "images/ic_comment_eco.png";
    $blog_comment_container.append($blog_comment);
    $blog_feedback_container.append($blog_comment_container);

    const $blog_view_time_container = document.createElement('div');
    $blog_view_time_container.classList.add('link_blog_watched_counter_container');
    const $blog_view_time = document.createElement('p');
    $blog_view_time.classList.add('link_blog_watched_counter');
    $blog_view_time.textContent = arr[7];
    $blog_view_time_container.append($blog_view_time);
    $blog_feedback_container.append($blog_view_time_container);

    const $blog_view_time_icon_container = document.createElement('div');
    $blog_view_time_icon_container.classList.add('link_blog_watched_icon_container');
    const $blog_view_time_icon = document.createElement('img');
    $blog_view_time_icon.classList.add('link_blog_watched_icon');
    $blog_view_time_icon.src = "images/ic_views_eco.png";
    $blog_view_time_icon_container.append($blog_view_time_icon);
    $blog_feedback_container.append($blog_view_time_icon_container);

    $link_blog_a.append($user_info);
    $link_blog_a.append($image_container);
    $link_blog_a.append($blog_name_container);
    $link_blog_a.append($blog_description_container);
    $link_blog_a.append($blog_feedback_container);

    $link_blog.append($link_blog_a);
    $fragment.append($link_blog);
    
    document.getElementById('list_blogs').append($fragment);
}


function GetDataInProfile($email){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/search_blog.php?b&e='+$email, true); 
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText); 
        } else {
            var data = (xhr.responseText);
            var res = JSON.parse(data);
            for(prop in res){
                var stringBlogData = res[prop].split("*"); 
                //console.log(stringBlogData);
                //FillListBlogs(stringBlogData);
                FillListBlogsProfile(stringBlogData);
            }
        }
    }
}
function FillListBlogsProfile(arr){
    let $fragment = new DocumentFragment();

    const $link_blog = document.createElement('li');
    $link_blog.classList.add('link_blog');
    const $link_blog_a = document.createElement('a');
    $link_blog_a.classList.add('link_blog_a');
    $link_blog_a.href = "#";

    const $user_info = document.createElement('a');
    $user_info.classList.add('link_blog_user_info_container');
    $user_info.href = "?u="+arr[1];

    const $user_avatar_container = document.createElement('div');
    $user_avatar_container.classList.add('link_blog_user_avatar_container');
    const $user_avatar = document.createElement('img');
    $user_avatar.classList.add('link_blog_user_avatar');
    $user_avatar.src=arr[2];
    $user_avatar_container.append($user_avatar);

    const $user_name_data_container = document.createElement('div');
    $user_name_data_container.classList.add('link_blog_user_name_data_container');
    const $user_name = document.createElement('p');
    $user_name.classList.add('link_blog_user_name');
    $user_name.textContent = arr[1];
    const $date_publish = document.createElement('p');
    $date_publish.classList.add('link_blog_data');
    $date_publish.textContent = arr[3];
    $user_name_data_container.append($user_name);
    $user_name_data_container.append($date_publish); 

    $user_info.append($user_avatar_container);
    $user_info.append($user_name_data_container);

    const $image_container = document.createElement('div');
    $image_container.classList.add('link_blog_image_container');
    const $preview_image = document.createElement('img');
    $preview_image.classList.add('link_blog_preview_image');
    $preview_image.src=arr[4];
    $image_container.append($preview_image);

    const $blog_name_container = document.createElement('div');
    $blog_name_container.classList.add('link_blog_name_container');
    const $blog_name = document.createElement('p');
    $blog_name.classList.add('link_blog_name');
    $blog_name.textContent = arr[5];
    $blog_name_container.append($blog_name);

    const $blog_description_container = document.createElement('div');
    $blog_description_container.classList.add('link_blog_description_container');
    const $blog_description = document.createElement('p');
    $blog_description.classList.add('link_blog_description');
    $blog_description.textContent = arr[6];
    $blog_description_container.append($blog_description);

    const $blog_feedback_container = document.createElement('div');
    $blog_feedback_container.classList.add('link_blog_feedback_container');

    const $blog_like_container = document.createElement('div');
    $blog_like_container.classList.add('link_blog_like_container');
    const $blog_like = document.createElement('img');
    $blog_like.classList.add('link_blog_like');
    $blog_like.src = "images/ic_like_eco_off.png";
    $blog_like_container.append($blog_like);
    $blog_feedback_container.append($blog_like_container);

    const $blog_comment_container = document.createElement('div');
    $blog_comment_container.classList.add('link_blog_comment_container')
    const $blog_comment = document.createElement('img');
    $blog_comment.classList.add('link_blog_comment');
    $blog_comment.src = "images/ic_comment_eco.png";
    $blog_comment_container.append($blog_comment);
    $blog_feedback_container.append($blog_comment_container);

    const $blog_view_time_container = document.createElement('div');
    $blog_view_time_container.classList.add('link_blog_watched_counter_container');
    const $blog_view_time = document.createElement('p');
    $blog_view_time.classList.add('link_blog_watched_counter');
    $blog_view_time.textContent = arr[7];
    $blog_view_time_container.append($blog_view_time);
    $blog_feedback_container.append($blog_view_time_container);

    const $blog_view_time_icon_container = document.createElement('div');
    $blog_view_time_icon_container.classList.add('link_blog_watched_icon_container');
    const $blog_view_time_icon = document.createElement('img');
    $blog_view_time_icon.classList.add('link_blog_watched_icon');
    $blog_view_time_icon.src = "images/ic_views_eco.png";
    $blog_view_time_icon_container.append($blog_view_time_icon);
    $blog_feedback_container.append($blog_view_time_icon_container);

    $link_blog_a.append($user_info);
    $link_blog_a.append($image_container);
    $link_blog_a.append($blog_name_container);
    $link_blog_a.append($blog_description_container);
    $link_blog_a.append($blog_feedback_container);

    $link_blog.append($link_blog_a);
    $fragment.append($link_blog);
    
    document.getElementById('list_blogs_profile').append($fragment);
}

function getUserInProfile($email){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/load_profile.php?e='+$email, true); 
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText); 
        } else {
            var data = (xhr.responseText);
            var res = JSON.parse(data);
            for(prop in res){
                var stringUserData = res[prop].split("*"); 
                //console.log(stringBlogData);
                FillUserProfile(stringUserData);
            }
        }
    }
}
function FillUserProfile(arr){
    var avatar = arr[2];
    var name = arr[1];
    var verify = arr[4];
    var followers = arr[3];
    var followed = arr[5].split(',');
    console.log(followed[0]);
    var action_btn_text = "Подписаться";

    if(auth != null){
        if(arr[0] == (auth.split("*"))[0]){
            action_btn_text = "Редактировать";
            console.log('Это ваш аккаунт');
            document.getElementById('c_b_a_p').classList.add('container_btn_unsubscribe_or_edit_profile');
            document.getElementById('c_b_a_p_t').classList.add('btn_unsubscribe_or_edit_profile_text');
        }else{
            for(i = 0; i<followed.length; i++){
                if(followed[i] == (auth.split("*"))[0]){
                    action_btn_text = "Отписаться";
                    console.log('Вы подписаны на этот канал');
                    document.getElementById('c_b_a_p').classList.add('container_btn_unsubscribe_or_edit_profile');
                    document.getElementById('c_b_a_p_t').classList.add('btn_unsubscribe_or_edit_profile_text');
                }else{
                    console.log('Вы не подписаны на этот канал');
                }
            }
        }
    }

    document.getElementById('c_b_a_p').classList.add('container_btn_subscribe_profile');
    document.getElementById('c_b_a_p_t').classList.add('btn_subscribe_profile_text');

    document.getElementById('c_b_a_p_t').textContent = action_btn_text;
    
        
    

    document.getElementById('avatar_profile').src = avatar;
    document.getElementById('u_n_p_t').textContent = name;

    if(verify == 'nekrasoft'){
        document.getElementById('u_n_p_v').classList.add('on');
    }else{
        document.getElementById('u_n_p_v').classList.remove('on');
    }

    document.getElementById('followers_counter').textContent = followers;
}


//login
var auth = localStorage.getItem('auth_cash');
function Login($l, $p){
    const xhr = new XMLHttpRequest();
    var login = $l;
    var pass = $p;

    var body = 'login='+encodeURIComponent(login)+'&pass='+encodeURIComponent(pass);
    xhr.open("POST", 'php/login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var data = (xhr.responseText);
            var res = JSON.parse(data);
            //auth = res;
            console.log(res);
            if(res[0] == "530"){
                document.getElementById('log_mob_ie').classList.add('error');
                document.getElementById('log_mob_ip').classList.add('error');
            } 
            else{
                closeAuthMobilePanel();
                auth = login + "*" + res.slice('*')[2];
                localStorage.setItem('auth_cash', auth);
                window.location = "https://www.eco-discovery.ru";
            }

            document.getElementById('btnLoginMobileText').classList.add('on');
            document.getElementById('btnLoginMobileLoading').classList.remove('on');
        }else{
            document.getElementById('btnLoginMobileText').classList.add('on');
            document.getElementById('btnLoginMobileLoading').classList.remove('on');       
        }
    }
}
function loginMobile(){
    var login = document.getElementById('mobile_email_login').value;
    var pass = document.getElementById('mobile_pass_login').value;
    document.getElementById('btnLoginMobileText').classList.remove('on');
    document.getElementById('btnLoginMobileLoading').classList.add('on');
    document.getElementById('log_mob_ie').classList.remove('error');
    document.getElementById('log_mob_ip').classList.remove('error');
    Login(login, pass);
}
function closeAuthMobilePanel(){
    document.getElementById('auth_mobile').classList.remove('open');
}
//var viewPassMobile = false;
function ViewPassMobile(id, type1, type2){
    //viewPassMobile = !viewPassMobile;

    //if(viewPassMobile) document.getElementById('mobile_pass_login').type = "text";
    //else document.getElementById('mobile_pass_login').type = "password";

    if(document.getElementById(id).type == type1){
        document.getElementById(id).type = type2;
    }else if(document.getElementById(id).type == type2){
        document.getElementById(id).type = type1;
    }
}
function OpenRegisterPage(){
    document.getElementById('reg_mob_container').classList.add('open');
    document.getElementById('log_mob_container').classList.remove('open');
}

//open profile mobile
if(auth != null) GetDataInProfile((auth.split("*"))[0]);
function OpenProfileMobile(){
    if(auth!=null){
        localStorage.setItem('idPageSave', 3);
        document.getElementById('homePage').classList.remove('open');
        document.getElementById('l_b_b_h').classList.remove('on');
        document.getElementById('l_b_c_h').classList.remove('on');

        document.getElementById('profilePage').classList.add('open');
        document.getElementById('l_b_b_p').classList.add('on');
        document.getElementById('l_b_c_p').classList.add('on');

        getUserInProfile((auth.split("*"))[0]);
    }else{
        document.getElementById('auth_mobile').classList.add('open');
    }
}


//open home mobile
function OpenHomeMobile(){
    localStorage.setItem('idPageSave', 0);
    document.getElementById('homePage').classList.add('open');
    document.getElementById('l_b_b_h').classList.add('on');
    document.getElementById('l_b_c_h').classList.add('on');
    document.getElementById('container_header_home_mobile').classList.remove('hide');

    document.getElementById('profilePage').classList.remove('open');
    document.getElementById('l_b_b_p').classList.remove('on');
    document.getElementById('l_b_c_p').classList.remove('on');
    document.getElementById('container_header_profile_mobile').classList.add('hide');
}


//registration
function Registration($l, $p){
    const xhr = new XMLHttpRequest();
    var login = $l;
    var pass = $p;

    var body = 'login='+encodeURIComponent(login)+'&pass='+encodeURIComponent(pass);
    xhr.open("POST", 'php/registration.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var data = (xhr.responseText);
            var res = JSON.parse(data);
            auth = res;
            console.log(res);
            if(res[0] != "200"){
                document.getElementById('log_mob_ie').classList.add('error');
                document.getElementById('log_mob_ip').classList.add('error');
            } 
            else{
                //closeAuthMobilePanel();
                Login(login, pass);
            }

            //document.getElementById('btnLoginMobileText').classList.add('on');
            //document.getElementById('btnLoginMobileLoading').classList.remove('on');
        }else{
            document.getElementById('log_mob_ie').classList.add('error');
            document.getElementById('log_mob_ip').classList.add('error');
            document.getElementById('btnLoginMobileText').classList.add('on');
            document.getElementById('btnLoginMobileLoading').classList.remove('on');       
        }
    }
}


function HardOpenProfile(){
    document.getElementById('homePage').classList.remove('open');
        document.getElementById('l_b_b_h').classList.remove('on');
        document.getElementById('l_b_c_h').classList.remove('on');
        document.getElementById('container_header_home_mobile').classList.add('hide');

        document.getElementById('profilePage').classList.add('open');
        document.getElementById('l_b_b_p').classList.add('on');
        document.getElementById('l_b_c_p').classList.add('on');
        document.getElementById('container_header_profile_mobile').classList.remove('hide');
}

var url = new URL(window.location.href);
var user = url.searchParams.get('u');
if(user) GetNameForOpenProfile(user);
function GetNameForOpenProfile($name){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/name_to_email.php?n='+$name, true); 
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText); 
        } else {
            var data = (xhr.responseText);
            var res = JSON.parse(data);
            for(prop in res){
                var stringUserData = res[prop].split("*"); 
                //console.log(stringBlogData);
                //FillUserProfile(stringUserData);
                OpenProfileOtherUsers(stringUserData);
            }
        }
    }
}

function OpenProfileOtherUsers($email){
    document.getElementById('homePage').classList.remove('open');
    document.getElementById('profilePage').classList.add('open');
    getUserInProfile($email);
    GetDataInProfile($email);
}
