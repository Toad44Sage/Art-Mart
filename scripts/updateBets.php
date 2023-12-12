<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['auctions'])) {

		require 'connectDB.php';

		$limit = $_POST['limit'];
		$offset = $_POST['offset'];
		$auctions = implode(',', $_POST['auctions']);

		$response['data'] = $mysqli->query("SELECT auctions.auction_id, IFNULL(bets.bet, 0) as bet
			FROM auctions
			LEFT JOIN bets on auctions.bet_id = bets.bet_id
			WHERE auctions.auction_id in ($auctions)")->fetch_all(MYSQLI_ASSOC);
		$response['success'] = '1';

	}

	else {

		$response['error'] = "Bets updating error";

	}

	echo json_encode($response);

?>