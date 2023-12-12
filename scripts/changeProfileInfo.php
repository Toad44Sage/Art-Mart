<?php
	
	//массив ответа сервера
	$response = array();

	//данные получены
	if (!empty($_POST)) {

		session_start();
		
		require 'authorizationCheck.php';
		require 'connectDB.php';

		$user_id = $_SESSION['user_id'];

		if (!empty($_POST['surname']) or is_numeric($_POST['surname'])) {

			$surname = $_POST['surname'];

			$mysqli->query("UPDATE users SET surname = '$surname' WHERE user_id = '$user_id'");

			$response['success'] = '1';

		}

		if (!empty($_POST['name']) or is_numeric($_POST['name'])) {

			$name = $_POST['name'];

			$mysqli->query("UPDATE users SET name = '$name' WHERE user_id = '$user_id'");

			$response['success'] = '1';

		}

		if (!empty($_POST['birth_date'])) {

			$birth_date = $_POST['birth_date'];

			$mysqli->query("UPDATE users SET birth_date = '$birth_date' WHERE user_id = '$user_id'");

			$response['success'] = '1';

		}

		if (!empty($_POST['country_id'])) {

			$country_id = $_POST['country_id'];

			$mysqli->query("UPDATE users SET country_id = '$country_id' WHERE user_id = '$user_id'");

			$response['success'] = '1';

		}

		if (!empty($_POST['about']) or is_numeric($_POST['about'])) {

			$about = $_POST['about'];

			$mysqli->query("UPDATE users SET about = '$about' WHERE user_id = '$user_id'");

			$response['success'] = '1';

		}

	}

	//данные не получены (либо ошибка при передаче, либо отправлена пустая форма)
	else {

		$response['error'] = "Data wasn't received";

	}

	echo json_encode($response);

?>