<?php
	
	//массив ответа сервера
	$response = array();

	//поля были получены
	if (!empty($_POST['login']) and !empty($_POST['password']) and !empty($_POST['email'])) {

		require 'connectDB.php';

		$login = $_POST['login'];
		$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
		$email = $_POST['email'];
		
		$user_exist_check = $mysqli->query("SELECT login FROM users WHERE login = '$login' LIMIT 1")->fetch_assoc();
		
		//логин свободен
		if (empty($user_exist_check)) {

			$user_exist_check = $mysqli->query("SELECT email FROM users WHERE email = '$email' LIMIT 1")->fetch_assoc();

			//почта свободна
			if (empty($user_exist_check)) {

				//если сессия запущена
				if(session_status() === PHP_SESSION_ACTIVE) {

					require 'logout.php';

				}

				$current_date = date('Y-m-d');
				$profile_picture = '../../images/default_profile_picture.jpg';

				$mysqli->query("INSERT INTO users (login, password, email, profile_picture, create_date) VALUES ('$login', '$password', '$email', '$profile_picture', '$current_date')");

				session_start();

				$_SESSION['user_id'] = $mysqli->insert_id;
				$_SESSION['login'] = $login;
				$user_dir = '../images/users/' . $_SESSION['user_id'];

				if (!file_exists($user_dir)) {

					//создаём папку пользователя
					mkdir($user_dir);

				}

				$response['success'] = '1';
				
			//почта занята
			} else {

				$response['error'] = "Email is already using";

			}

		//логин занят
		} else {

			$response['error'] = "Login is already using"; 

		}

	//поля не были получены
	} else {

		$response['error'] = "Data wasn't received";

	}

	echo json_encode($response);

?>