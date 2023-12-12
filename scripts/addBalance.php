<?php

	//массив ответа сервера
	$response = array();

	//сумма пополнения получена
	if (!empty($_POST['add']) or is_numeric($_POST['add'])) {

		session_start();
		
		require 'authorizationCheck.php';
		require 'connectDB.php';

		$add = $_POST['add'];
		$user_id = $_SESSION['user_id'];

		$balance = $mysqli->query("SELECT balance FROM users WHERE user_id = '$user_id' LIMIT 1")->fetch_assoc();
		$balance['balance'] = $balance['balance'] + $add;

		$mysqli->query("UPDATE users SET balance = $balance[balance] WHERE user_id = '$user_id'");

		$response['success'] = '1';
		$response['data'] = $balance;

	}

	//сумма пополнения не была получена
	else {

		$response['error'] = "Balance refill error";

	}

	echo json_encode($response);

?>