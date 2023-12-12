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

		$response['data'] = $mysqli->query("SELECT auctions.auction_id, auctions.painting_id, paintings.name as name, auctions.user_id as author_id, users.name as author, paintings.path_to_paint, styles.name as style, start_date, end_date, start_price, buyout_price, IFNULL(bets.bet, 0) as sold_for, IFNULL(bets.user_id, -1) as winner_id, IFNULL((SELECT login as winner_name from users LEFT JOIN bets ON bets.user_id = users.user_id WHERE users.user_id = winner_id LIMIT 1), 'No one') as winner_name
		FROM auctions
		JOIN paintings on auctions.painting_id = paintings.painting_id
		LEFT JOIN bets on auctions.bet_id = bets.bet_id
		LEFT JOIN users on auctions.user_id = users.user_id
		JOIN styles on paintings.style_id = styles.style_id
		WHERE auctions.is_current = 0
		ORDER BY end_date DESC
		LIMIT $limit OFFSET $offset")->fetch_all(MYSQLI_ASSOC);
		$response['success'] = '1';

	}

	else {

		$response['error'] = "Error when displaying auctions";

	}

	echo json_encode($response);

?>