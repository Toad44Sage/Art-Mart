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

		$response['success'] = '1';
		$response['data'] = $mysqli->query("SELECT IF(likes.user_id IS NULL, 0, 1) as is_liked, paintings.painting_id, paintings.name, styles.name as style, users.user_id as author_id, users.login as author, users.profile_picture as author_picture, path_to_paint, likes, comments, paintings.about, post_datetime
			FROM paintings
			LEFT JOIN likes ON paintings.painting_id = likes.painting_id AND likes.user_id = $user_id
			JOIN users ON paintings.author_id = users.user_id
			JOIN styles USING (style_id)
			WHERE paintings.painting_id = '$painting_id'
			LIMIT 1")->fetch_assoc();

	}

	//айди картины не получено
	else {

		$response['error'] = "Error when displaying painting";

	}

	echo json_encode($response);

?>