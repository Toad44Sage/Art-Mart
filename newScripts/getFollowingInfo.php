<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['limit']) and isset($_POST['offset'])) {
	
		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$limit = $_POST['limit'];
		$offset = $_POST['offset'];

		//id был получен
		if (!empty($_POST['user_id'])) {

			$user_id = $_POST['user_id'];
		
		}

		//id не был получен, пользователь авторизован
		else {

			$user_id = $_SESSION['user_id'];

		}

		$response['success'] = '1';
		$response['data'] = $mysqli->query("SELECT following_id, login, profile_picture
			FROM subscribtions
			JOIN users ON subscribtions.following_id = users.user_id
			WHERE follower_id = $user_id
			ORDER BY login
			LIMIT $limit OFFSET $offset")->fetch_all(MYSQLI_ASSOC);

	}

	echo json_encode($response);

?>