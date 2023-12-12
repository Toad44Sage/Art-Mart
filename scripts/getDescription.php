<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['painting_id'])) {

		require 'connectDB.php';

		$painting_id = $_POST['painting_id'];
		$response['data'] = $mysqli->query("SELECT about FROM paintings WHERE painting_id = $painting_id LIMIT 1")->fetch_assoc();
		$response['success'] = '1';

	}

	else {

		$response['error'] = "Error when displaying the auction";

	}

	echo json_encode($response);

?>