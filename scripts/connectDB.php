<?php

	//массив ответа сервера
	$response = array();

	$host = "localhost";
	$user = "root";
	$password = "";
	$name = "artmart";

	$mysqli = new mysqli($host, $user, $password, $name);
	
	date_default_timezone_set('Europe/Moscow');

	//бд отвалилась или не подключена
	if ($mysqli->connect_error) {

  		$response['error'] = "Database connection error";
		echo json_encode($response);
		exit;

	}

?>