<?php

	//массив ответа сервера
	$response = array();

	session_start();

	require 'authorizationCheck.php';
	require 'connectDB.php';

	$user_id = $_SESSION['user_id'];

	$response['data'] = $mysqli->query("SELECT message, icon, is_viewed FROM notifications WHERE user_id = $user_id")->fetch_all(MYSQLI_ASSOC);

	$response['success'] = '1';

	echo json_encode($response);

	$mysqli->query("UPDATE notifications SET is_viewed = 1 WHERE user_id = $user_id and is_viewed = 0");

?>