<?php

	//массив ответа сервера
	$response = array();

	session_start();
	
	require 'authorizationCheck.php';
	require 'connectDB.php';

	$user_id = $_SESSION['user_id'];

	$response['success'] = '1';
	$response['data'] = $mysqli->query("SELECT profile_picture, balance FROM users WHERE user_id = '$user_id' LIMIT 1")->fetch_assoc();

	echo json_encode($response); 

?>