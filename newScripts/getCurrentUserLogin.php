<?php
	
	//массив ответа сервера
	$response = array();

	session_start();
	require 'authorizationCheck.php';

	$response['success'] = '1';
	$response['data'] = array("login" => $_SESSION['login']);
	
	echo json_encode($response);

?>