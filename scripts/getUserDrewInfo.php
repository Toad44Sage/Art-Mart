<?php

//массив ответа сервера
$response = array();

session_start();

require 'authorizationCheck.php';
require 'connectDB.php';

//id был получен
if (!empty($_POST['user_id'])) {

    $user_id = $_POST['user_id'];

}

//id не был получен, пользователь авторизован
else {

    $user_id = $_SESSION['user_id'];

}

// Получение параметров limit и offset из POST запроса
$limit = isset($_POST['limit']) ? (int) $_POST['limit'] : null;
$offset = isset($_POST['offset']) ? (int) $_POST['offset'] : null;

// Формирование SQL-запроса
$sql = "SELECT painting_id, paintings.name as name, styles.name as style, path_to_paint
	FROM paintings
	JOIN styles on styles.style_id = paintings.style_id
	WHERE author_id = $user_id
	ORDER BY post_datetime DESC";

// Добавление limit и offset к SQL-запросу, если они переданы
if ($limit !== null && $offset !== null) {
    $sql .= " LIMIT $limit OFFSET $offset";
}

$response['success'] = '1';
$response['data'] = $mysqli->query($sql)->fetch_all(MYSQLI_ASSOC);

echo json_encode($response);
