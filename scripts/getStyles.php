<?php

	//массив ответа сервера
	$response = array();

	require 'connectDB.php';

	$response['success'] = '1';
	$response['data'] = $mysqli->query("SELECT * FROM styles")->fetch_all(MYSQLI_ASSOC);

	echo json_encode($response);

?>