<?php
	
	//массив ответа сервера
	$response = array();

	//данные получены
	if (!empty($_POST['comment_id']) and (!empty($_POST['content']) or is_numeric($_POST['content'])) ) {

		session_start();
		
		require 'authorizationCheck.php';
		require 'connectDB.php';

		$comment_id = $_POST['comment_id'];
		$content = $_POST['content'];
		$user_id = $_SESSION['user_id'];

		$mysqli->query("UPDATE comments SET content = '$content' WHERE comment_id = '$comment_id' and user_id = '$user_id'");

		$response['success'] = '1';

	}

	//данные не получены
	else {

		$response['error'] = "Data wasn't received";

	}

	echo json_encode($response);

?>