<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['limit']) and (isset($_POST['author']) or isset($_POST['painting']) or isset($_POST['styles']) or isset($_POST['bet_down']) or isset($_POST['bet_up']) )) {

		require 'connectDB.php';

		$where = "WHERE";
		$limit = $_POST['limit'];

		if (isset($_POST['author'])) {
			$where = $where . " users.name LIKE '" . $_POST['author'] . "%'";
		}

		if (isset($_POST['painting'])) {
			$where = ($where != "WHERE") ? $where . " and" : $where;
			$where = $where . " paintings.name LIKE '" . $_POST['painting'] . "%'";
		}

		if (isset($_POST['styles'])) {
			$where = ($where != "WHERE") ? $where . " and" : $where;
			$where = $where . " styles.style_id in (" . implode(', ', $_POST['styles']) . ")";
		}

		if (isset($_POST['bet_down']) and isset($_POST['bet_up'])) {
			$where = ($where != "WHERE") ? $where . " and" : $where;
			$where = $where . " bets.bet BETWEEN " . $_POST['bet_down'] . " AND " . $_POST['bet_up'];

			$response['data']['current_auctions'] = $mysqli->query("SELECT auctions.auction_id, auctions.painting_id, paintings.name as name, auctions.user_id as author_id, users.name as author, paintings.path_to_paint, styles.name as style, start_date, end_date, start_price, buyout_price, IFNULL(bets.bet, 0) as bet
				FROM auctions
				JOIN paintings on auctions.painting_id = paintings.painting_id
				JOIN users on auctions.user_id = users.user_id
				LEFT JOIN bets on auctions.bet_id = bets.bet_id
				JOIN styles on paintings.style_id = styles.style_id
				$where and auctions.is_current = 1
				ORDER BY start_date DESC
				LIMIT $limit")->fetch_all(MYSQLI_ASSOC);

			$response['data']['current_user_id'] = $_SESSION['user_id'];
		}
		else {

			$response['data']['current_auctions'] = $mysqli->query("SELECT auctions.auction_id, auctions.painting_id, paintings.name as name, auctions.user_id as author_id, users.name as author, paintings.path_to_paint, styles.name as style, start_date, end_date, start_price, buyout_price, IFNULL(bets.bet, 0) as bet
				FROM auctions
				JOIN paintings on auctions.painting_id = paintings.painting_id
				JOIN users on auctions.user_id = users.user_id
				LEFT JOIN bets on auctions.bet_id = bets.bet_id
				JOIN styles on paintings.style_id = styles.style_id
				$where and auctions.is_current = 1
				ORDER BY start_date DESC
				LIMIT $limit")->fetch_all(MYSQLI_ASSOC);

			$response['data']['completed_auctions'] = $mysqli->query("SELECT auctions.auction_id, auctions.painting_id, paintings.name as name, auctions.user_id as author_id, users.name as author, paintings.path_to_paint, styles.name as style, start_date, end_date, start_price, buyout_price, IFNULL(bets.bet, 0) as sold_for, IFNULL(bets.user_id, -1) as winner_id, IFNULL((SELECT login as winner_name from users LEFT JOIN bets ON bets.user_id = users.user_id WHERE users.user_id = winner_id LIMIT 1), 'No one') as winner_name
				FROM auctions
				JOIN paintings on auctions.painting_id = paintings.painting_id
				JOIN users on auctions.user_id = users.user_id
				LEFT JOIN bets on auctions.bet_id = bets.bet_id
				JOIN styles on paintings.style_id = styles.style_id
				$where and auctions.is_current = 0
				ORDER BY end_date DESC
				LIMIT $limit")->fetch_all(MYSQLI_ASSOC);

			$response['data']['current_user_id'] = $_SESSION['user_id'];

		}

		$response['success'] = '1';

	}

	else {

		$response['error'] = "Searching error";

	}

	echo json_encode($response);

?>