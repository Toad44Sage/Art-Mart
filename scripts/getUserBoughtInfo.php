<?php

//массив ответа сервера
$response = array();

if (isset($_POST['limit']) and isset($_POST['offset'])) {

    session_start();

    require 'authorizationCheck.php';
    require 'connectDB.php';

    $limit = $_POST['limit'];
    $offset = $_POST['offset'];

    //id был получен
    if (!empty($_POST['user_id'])) {

        $user_id = $_POST['user_id'];

    }

    //id не был получен, пользователь авторизован
    else {

        $user_id = $_SESSION['user_id'];

    }

    $response['success'] = '1';
    $response['data'] = $mysqli->query("SELECT paintings.painting_id, paintings.path_to_paint, paintings.author_id
		FROM paintings
		JOIN auctions ON paintings.painting_id = auctions.painting_id
		WHERE user_id = $user_id AND is_current = 0
		ORDER BY auctions.end_date DESC
		LIMIT $limit OFFSET $offset")->fetch_all(MYSQLI_ASSOC);

} else {

    $response['error'] = "Error when displaying paintings";

}

echo json_encode($response);
