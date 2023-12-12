<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['limit']) and isset($_POST['offset'])) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$user_id = $_SESSION['user_id'];
		$limit = $_POST['limit'];
		$offset = $_POST['offset'];
		
		//если передали стиль для сортировки
		if (!empty($_POST['style_id'])) {

			$style_id = $_POST['style_id'];

			$response['success'] = '1';
			$response['data'] = $mysqli->query("SELECT IF(likes.user_id IS NULL, 0, 1) as is_liked, paintings.painting_id, paintings.name, styles.name as style, users.user_id as author_id, users.login as author, users.profile_picture as author_picture, paintings.path_to_paint, paintings.likes, paintings.comments
			FROM paintings
			LEFT JOIN likes ON paintings.painting_id = likes.painting_id AND likes.user_id = $user_id
			JOIN users ON paintings.author_id = users.user_id
			JOIN styles USING (style_id)
			WHERE style_id = '$style_id' AND author_id IN (SELECT following_id FROM subscribtions WHERE follower_id = $user_id)
			ORDER BY paintings.post_datetime DESC
			LIMIT $limit OFFSET $offset")->fetch_all(MYSQLI_ASSOC);

		}

		else {

			$response['success'] = '1';
			$response['data'] = $mysqli->query("SELECT IF(likes.user_id IS NULL, 0, 1) as is_liked, paintings.painting_id, paintings.name, styles.name as style, users.user_id as author_id, users.login as author, users.profile_picture as author_picture, paintings.path_to_paint, paintings.likes, paintings.comments
			FROM paintings
			LEFT JOIN likes ON paintings.painting_id = likes.painting_id AND likes.user_id = $user_id
			JOIN users ON paintings.author_id = users.user_id
			JOIN styles USING (style_id)
			WHERE author_id IN (SELECT following_id FROM subscribtions WHERE follower_id = $user_id)
			ORDER BY paintings.post_datetime DESC
			LIMIT $limit OFFSET $offset")->fetch_all(MYSQLI_ASSOC);

		}

	}

	else {

		$response['error'] = "Error when displaying the publication feed";

	}

	echo json_encode($response);

?>