<?php

	//массив ответа сервера
	$response = array();

	session_start();

	require 'authorizationCheck.php';
	require 'connectDB.php';
	require 'uploadPicture.php';

	$user_id = $_SESSION['user_id'];
	$profile_picture = "../" . $upload_file;

	$current_picture = $mysqli->query("SELECT profile_picture FROM users WHERE user_id = '$user_id' LIMIT 1")->fetch_assoc()['profile_picture'];

	//убираем первое вхождение символов "../" для корректности пути относительно данного скрипта
	$current_picture = preg_replace("/\.\.\//", "", $current_picture, 1);

	if (file_exists($current_picture)) {

		//удаляем текущее изображение профиля, если оно не является стандартной картинкой
		unlink($current_picture);

	}

	$mysqli->query("UPDATE users SET profile_picture = '$profile_picture' WHERE user_id = '$user_id'");

	$response['success'] = '1';

	echo json_encode($response);

?>