<?php
	
	//массив отчёта сервера о работе скрипта
	$response = array();

	session_start();
	require 'authorizationCheck.php';

	require 'connectDB.php';

	//если айди картины получено
	if (!empty($_POST['painting_id'])) {

		$painting_id = $_POST['painting_id'];

		$painting = $mysqli->query("SELECT painting_id, paintings.name, styles.name as style, users.user_id as author_id, users.login as author, users.profile_picture as author_picture, path_to_paint, likes, comments, paintings.about, post_datetime
			FROM paintings
			JOIN users ON paintings.author_id = users.user_id
			JOIN styles USING (style_id)
			WHERE painting_id = '$painting_id'")->fetch_assoc();

		$comments = $mysqli->query("SELECT comment_id, users.user_id as commentator_id, users.login as commentator, users.profile_picture as commentator_picture, comment_datetime, content
			FROM comments
			JOIN users USING (user_id)
			WHERE painting_id = '$painting_id'
			ORDER BY comment_datetime DESC")->fetch_all(MYSQLI_ASSOC);

		$result = array('painting' => $painting, 'comments' => $comments);

		$response['success'] = '1';

		echo json_encode($result);

	}

	//айди картины не получено
	else {

		$response['error'] = "Ошибка при получении сервером данных о картине";

	}

	echo json_encode($response);

?>