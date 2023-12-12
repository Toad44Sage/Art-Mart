<?php

	//массив ответа сервера
	$response = array();

	session_start();
	require 'authorizationCheck.php';

	require 'connectDB.php';

	$check = array();

	//id был получен
	if (!empty($_POST['user_id'])) {

		$user_id = $_POST['user_id'];
		$current_id = $_SESSION['user_id'];

		if ($user_id == $current_id) {

			$check['is_current_profile'] = True;	

		}

		else {

			$check['is_current_profile'] = False;

		}

		$is_follow = $mysqli->query("SELECT * FROM subscribtions WHERE follower_id = $current_user_id and following_id = $user_id")->fetch_assoc();

		$check['is_follow'] = empty($is_follow) ? False : True;

	}

	//id не был получен, пользователь авторизован
	else {

		$user_id = $_SESSION['user_id'];
		$check['is_current_profile'] = True;
		$check['is_follow'] = False;

	}

	//информация о пользователе и количестве его постов
	$user = $mysqli->query("SELECT login, surname, name, profile_picture, about
		FROM users
		WHERE user_id = '$user_id'")->fetch_assoc();


	$count_posts = $mysqli->query("SELECT COUNT(painting_id) as count_posts 
		FROM paintings
		WHERE author_id = '$user_id'")->fetch_assoc();

	//количество подписчиков
	$count_followers = $mysqli->query("SELECT COUNT(following_id) as count_followers FROM subscribtions WHERE following_id = $user_id")->fetch_assoc();

	//количество подписок
	$count_following = $mysqli->query("SELECT COUNT(follower_id) as count_following FROM subscribtions WHERE follower_id = $user_id")->fetch_assoc();

	$response['success'] = '1';
	$response['data'] = array_merge($check, $user, $count_posts, $count_followers, $count_following);

	echo json_encode($response);

?>