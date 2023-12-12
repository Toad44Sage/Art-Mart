<?php

	//массив ответа сервера
	$response = array();

	//логин и пароль были получены
	if (!empty($_POST['login']) and !empty($_POST['password'])) {

		require 'connectDB.php';

		$login = $_POST['login'];
		$user = $mysqli->query("SELECT user_id, login, password FROM users WHERE login = '$login' LIMIT 1")->fetch_assoc();
		
		//пользователь с таким логином существует
		if (!empty($user)) {
			
			$hash = $user['password'];

			//пароль верный
			if (password_verify($_POST['password'], $hash)) {

				//если сессия запущена
				if(session_status() === PHP_SESSION_ACTIVE) {

					require 'logout.php';

				}

				session_start();
				$_SESSION['user_id'] = $user['user_id'];
				$_SESSION['login'] = $user['login'];

				$response['success'] = '1';

			//пароль неверный
			} else {

				$response['error'] = "Invalid password";

			}

		//пользователя с таким логином не существует
		} else {

			$response['error'] = "There is no user with this login";

		}

	//логин и пароль не были получены
	} else {

		$response['error'] = "Data wasn't received";

	}

	echo json_encode($response);

?>