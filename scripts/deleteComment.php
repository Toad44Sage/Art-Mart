<?php
	
	//массив ответа сервера
	$response = array();

	//данные получены
	if (!empty($_POST['comment_id'])) {

		session_start();
		
		require 'authorizationCheck.php';
		require 'connectDB.php';

		$comment_id = $_POST['comment_id'];
		$user_id = $_SESSION['user_id'];

		$mysqli->query("DELETE FROM comments WHERE comment_id = '$comment_id' and user_id = '$user_id'");

		$response['success'] = '1';

	}

	//данные не получены
	else {

		$response['error'] = "Error when deleting the comment";

	}

	echo json_encode($response);

?>