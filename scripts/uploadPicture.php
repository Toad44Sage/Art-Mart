<?php

	//массив ответа сервера
	$response = array();

	session_start();

	//файл был получен
	if (!empty($_FILES['image']) && empty($_FILES['image']['error'])) {

		//размер файла превышает 2 мбайта 
		if ($_FILES["image"]["size"] > 2 * 1024 * 1024) {

			$response['error'] = "The filesize exceeds 2 megabytes";
			echo json_encode($response);
			exit;

		}

		$file_name = $_FILES['image']['name'];
		$file_extension = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

		//недопустимое расширение файла
		if ($file_extension != 'jpg' && $file_extension != 'jpeg' && $file_extension != 'png') {

			$response['error'] = "Invalid file extension";
			echo json_encode($response);
			exit;

		}

		$upload_file = '../images/users/' . $_SESSION['user_id'] . "/" . $_SESSION['user_id'] . "-" . bin2hex(random_bytes(8)) . "." . $file_extension;

		//файл не удалось загрузить
		//Тут проводится загрузка файла, если она не получается, то выдаётся ошибка
		if (!move_uploaded_file($_FILES['image']['tmp_name'], $upload_file)) {

			$response['error'] = "Failed to upload file to server";
			echo json_encode($response);
			exit;

		}

	}

	//файл не был получен (неизвестная ошибка загрузки)
	else {

		$response['error'] = "File wasn't received";
		echo json_encode($response);
		exit;

	}

?>

