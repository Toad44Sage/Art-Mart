<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['limit']) and isset($_POST['offset'])) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';
		
		$limit = $_POST['limit'];
		$offset = $_POST['offset'];

		//id был получен
		if (!empty($_POST['user_id'])) {

			$user_id = $_POST['user_id'];

		}

		//id не был получен, пользователь авторизован
		else {

			$user_id = $_SESSION['user_id'];

		}

		$response['success'] = '1';
		$response['data'] = $mysqli->query("SELECT painting_id, path_to_paint
		FROM paintings
		JOIN auctions USING(painting_id)
		WHERE winner_id = $user_id
		ORDER BY end_date DESC
		LIMIT $limit OFFSET $offset")->fetch_all(MYSQLI_ASSOC);

	}

	else {

		$response['error'] = "Error when displaying paintings";

	}

	echo json_encode($response);

?>