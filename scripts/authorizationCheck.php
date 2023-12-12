<?php

	//массив ответа сервера
	$response = array();

	session_start();

	//Если пользователь не авторизирован, то выдаём ошибку и выходим из скрипта
	if (empty($_SESSION['user_id'])) {

		$response['error'] = "Authorization required";
		echo json_encode($response);
		exit;

	} 

?>