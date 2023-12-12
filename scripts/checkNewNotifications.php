<?php

	//массив ответа сервера
	$response = array();

	session_start();

	require 'authorizationCheck.php';
	require 'connectDB.php';

	$user_id = $_SESSION['user_id'];

	$response['data'] = $mysqli->query("SELECT IF(COUNT(notification_id) = 0, 'no', 'yes') as checking FROM notifications WHERE user_id = $user_id and is_viewed = 0")->fetch_assoc()['checking'];

	$response['success'] = '1';

	echo json_encode($response);

?>