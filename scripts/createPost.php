<?php

	//массив ответа сервера
	$response = array();

	//данные получены
	if ( (!empty($_POST['name']) or is_numeric($_POST['name'])) and !empty($_POST['style_id']) ) {

		session_start();
		
		require 'authorizationCheck.php';
		require 'connectDB.php';
		require 'uploadPicture.php';

		$name = $_POST['name'];
		$author_id = $_SESSION['user_id'];
		$path_to_paint = "../" . $upload_file;
		$about = $_POST['about'];
		$post_datetime = date('Y-m-d H:i:s');
		$style_id = $_POST['style_id'];

		//если пользователь указал описание
		if (!empty($_POST['about']) or is_numeric($_POST['about'])) {

			$mysqli->query("INSERT INTO paintings (name, style_id, author_id, path_to_paint, about, post_datetime) VALUES ('$name', '$style_id', '$author_id', '$path_to_paint', '$about', '$post_datetime')");

			$response['success'] = '1';

		}

		//если описание не указано
		else {

			$mysqli->query("INSERT INTO paintings (name, style_id, author_id, path_to_paint, post_datetime) VALUES ('$name', '$style_id', '$author_id', '$path_to_paint', '$post_datetime')");

			$response['success'] = '1';

		}

	}

	//данные не были получены
	else {

		$response['error'] = "Data wasn't received";

	}

	echo json_encode($response);

?>