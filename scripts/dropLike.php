<?php
	
	//массив ответа сервера
	$response = array();

	//если айди картины получено
	if (!empty($_POST['painting_id'])) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$painting_id = $_POST['painting_id'];
		$user_id = $_SESSION['user_id'];

		$like = $mysqli->query("SELECT * FROM likes WHERE painting_id = '$painting_id' and user_id = '$user_id' LIMIT 1")->fetch_assoc();

		//если лайка нет, то ставим его
		if (empty($like)) {

			$mysqli->query("INSERT INTO likes (painting_id, user_id) VALUES ($painting_id, $user_id)");
			$likes = $mysqli->query("SELECT likes FROM paintings WHERE painting_id = '$painting_id' LIMIT 1")->fetch_assoc();
			$likes['likes'] = $likes['likes'] + 1;
			
			$mysqli->query("INSERT INTO notifications (user_id, message, icon)
						 VALUES (
						 	(SELECT author_id FROM paintings WHERE painting_id = '$painting_id'),
						 	(SELECT CONCAT(login, ' liked your painting') FROM users WHERE user_id = '$user_id'),
						 	(SELECT path_to_paint FROM paintings WHERE painting_id = '$painting_id')
						 )");

		}

		//если лайк есть, то убираем его
		else {

			$mysqli->query("DELETE FROM likes WHERE painting_id = '$painting_id' and user_id = '$user_id'");
			$likes = $mysqli->query("SELECT likes FROM paintings WHERE painting_id = '$painting_id' LIMIT 1")->fetch_assoc();
			$likes['likes'] = $likes['likes'] - 1;

		}

		$mysqli->query("UPDATE paintings SET likes = $likes[likes] WHERE painting_id = '$painting_id'");

		$response['success'] = '1';
		$response['data'] = $likes;

	}

	//айди картины не получено
	else {

		$response['error'] = "Error when liking the painting";

	}

	echo json_encode($response);

?>