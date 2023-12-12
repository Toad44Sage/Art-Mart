<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['limit']) and isset($_POST['offset'])) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$limit = $_POST['limit'];
		$offset = $_POST['offset'];
		$today = date('Y-m-d');

		$response['data'] = $mysqli->query("SELECT auctions.auction_id, auctions.painting_id, paintings.name as name, auctions.user_id as author_id, users.name as author, paintings.path_to_paint, styles.name as style, start_date, end_date, start_price, buyout_price, IFNULL(bets.bet, 0) as bet
		FROM auctions
		JOIN paintings on auctions.painting_id = paintings.painting_id
		JOIN users on auctions.user_id = users.user_id
		LEFT JOIN bets on auctions.bet_id = bets.bet_id
		JOIN styles on paintings.style_id = styles.style_id
		WHERE auctions.is_current = 1
		ORDER BY start_date DESC
		LIMIT $limit OFFSET $offset")->fetch_all(MYSQLI_ASSOC);
		$response['success'] = '1';
		$response['current_user_id'] = $_SESSION['user_id'];

	}

	else {

		$response['error'] = "Error when displaying auctions";

	}

	echo json_encode($response);

?>