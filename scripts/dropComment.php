<?php
	
	//массив ответа сервера
	$response = array();

	//данные получены
	if ( !empty($_POST['painting_id']) and (!empty($_POST['content']) or is_numeric($_POST['content'])) ) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$painting_id = $_POST['painting_id'];
		$user_id = $_SESSION['user_id'];
		$comment_datetime = date('Y-m-d H:i:s');
		$content = $_POST['content'];

		$mysqli->query("INSERT INTO comments (painting_id, user_id, comment_datetime, content)
			VALUES ('$painting_id', '$user_id', '$comment_datetime', '$content')");

		$last_comment['last_comment_id'] = $mysqli->insert_id;

		$mysqli->query("INSERT INTO notifications (user_id, message, icon)
					 	SELECT paintings.author_id, CONCAT(users.login, ' commented your painting'), paintings.path_to_paint
						FROM comments
						JOIN paintings ON comments.painting_id = paintings.painting_id
						JOIN users ON comments.user_id = users.user_id
						WHERE comment_id = $last_comment[last_comment_id]");

		$comments = $mysqli->query("SELECT comments FROM paintings WHERE painting_id = '$painting_id' LIMIT 1")->fetch_assoc();
		$comments['comments'] = $comments['comments'] + 1;

		$mysqli->query("UPDATE paintings SET comments = $comments[comments] WHERE painting_id = '$painting_id'");

		$user = $mysqli->query("SELECT user_id, login, profile_picture FROM users WHERE user_id = '$user_id' LIMIT 1")->fetch_assoc(); 

		$response['success'] = '1';
		$response['data'] = array_merge($last_comment, $comments, $user);

	}

	//данные не получены
	else {

		$response['error'] = "Data wasn't received";

	}

	echo json_encode($response);

?>