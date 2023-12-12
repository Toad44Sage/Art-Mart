<?php
	
	//массив ответа сервера
	$response = array();

	//если айди картины получено
	if (isset($_POST['painting_id'])) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$painting_id = $_POST['painting_id'];
		$user_id = $_SESSION['user_id'];

		//если limit и offset переданы
		if (isset($_POST['limit']) and isset($_POST['offset'])) {

			$limit = $_POST['limit'];
			$offset = $_POST['offset'];

			$response['success'] = '1';
			$response['data'] = $mysqli->query("SELECT IF(comments.user_id = $user_id, comment_id, NULL) as comment_id, comments.user_id as commentator_id, users.login as commentator, users.profile_picture as commentator_picture, comment_datetime, content
				FROM comments
				JOIN users USING (user_id)
				WHERE painting_id = '$painting_id'
				ORDER BY comment_datetime
				LIMIT $limit OFFSET $offset")->fetch_all(MYSQLI_ASSOC);

		}

		else {

			$response['success'] = '1';
			$response['data'] = $mysqli->query("SELECT IF(comments.user_id = $user_id, comment_id, NULL) as comment_id, comments.user_id as commentator_id, users.login as commentator, users.profile_picture as commentator_picture, comment_datetime, content
				FROM comments
				JOIN users USING (user_id)
				WHERE painting_id = '$painting_id'
				ORDER BY comment_datetime")->fetch_all(MYSQLI_ASSOC);

		}

	}

	//айди картины не получено
	else {

		$response['error'] = "Error when displaying comments";

	}

	echo json_encode($response);

?>