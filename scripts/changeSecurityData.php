<?php
	
	//массив ответа сервера
	$response = array();

	//текущий пароль получен
	if (!empty($_POST['password'])) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$user_id = $_SESSION['user_id'];
		$password = $_POST['password'];

		$hash = $mysqli->query("SELECT password FROM users WHERE user_id = '$user_id' LIMIT 1")->fetch_assoc()['password'];

		//пароль верный
		if (password_verify($password, $hash)) {

			//пользователь ничего не ввёл на замену
			if (empty($_POST['new_password']) and empty($_POST['email'])) {

				$response['error'] = "New password/email wasn't received";
				echo json_encode($response);
				exit;

			}

			//меняется пароль (пользователь ввёл значение в поле для нового пароля)
			if (!empty($_POST['new_password'])) {

				$password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

				$mysqli->query("UPDATE users SET password = '$password' WHERE user_id = '$user_id'");

				$response['success'] = '1';

			}

			//меняется почта (пользователь ввёл значение в поле для новой почты)
			if (!empty($_POST['email'])) {

				$email = $_POST['email'];
				$user_exist_check = $mysqli->query("SELECT email FROM users WHERE email = '$email' LIMIT 1")->fetch_assoc();

				//почта свободна
				if (empty($user_exist_check)) {

					$mysqli->query("UPDATE users SET email = '$email' WHERE user_id = '$user_id'");

					$response['success'] = '1';

				}

				//почта занята
				else {

					$response['error'] = "Email is already using";

				}

			}

		}

		//пароль неверен
		else {

			$response['error'] = "Invalid password";

		}

	}

	//текущий пароль не был получен
	else {

		$response['error'] = "Current password wasn't received";

	}

	echo json_encode($response);

?>