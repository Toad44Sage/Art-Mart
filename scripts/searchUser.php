<?php

	//массив ответа сервера
	$response = array();

	//Логин получен
	if ( (!empty($_POST['login']) or is_numeric($_POST['name'])) and isset($_POST['limit']) ) {

		session_start();
		
		require 'authorizationCheck.php';
		require 'connectDB.php';

		$login = $_POST['login'];
		$limit = $_POST['limit'];

		$response['success'] = '1';
		$response['data'] = $mysqli->query("SELECT user_id, login, profile_picture FROM users WHERE login LIKE '$login%' LIMIT $limit")->fetch_all(MYSQLI_ASSOC);
		
	}

	//Логин не получен
	else {

		$response['error'] = "Searching error";

	}

	echo json_encode($response);

?>