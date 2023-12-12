<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['auction_id']) and isset($_POST['bet']) and isset($_POST['is_buyout'])) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$auction_id = $_POST['auction_id'];
		$user_id = $_SESSION['user_id'];
		$bet = $_POST['bet'];
		$is_buyout = $_POST['is_buyout'];
		$bet_time = date('Y-m-d H:i:s');

		$balance = $mysqli->query("SELECT balance FROM users WHERE user_id = $user_id LIMIT 1")->fetch_assoc()['balance'];

		if($balance < $bet){
			$response['error'] = "Insufficient funds";
		}
		else {
			$balance -= $bet;

			$last_better = $mysqli->query("SELECT bets.user_id FROM bets
				JOIN auctions ON bets.bet_id = auctions.bet_id
				WHERE auctions.auction_id = $auction_id LIMIT 1")->fetch_assoc()['user_id'];

			if ($user_id != $last_better) {
				$mysqli->query("INSERT INTO notifications (user_id, message, icon)
								SELECT bets.user_id, 'you bet was outbit', paintings.path_to_paint
								FROM auctions
								LEFT JOIN bets ON auctions.bet_id = bets.bet_id
								JOIN paintings ON auctions.painting_id = paintings.painting_id
								WHERE auctions.auction_id = $auction_id");
			}

			$mysqli->query("INSERT INTO bets (auction_id, user_id, bet, bet_time)
				VALUES ('$auction_id', '$user_id', '$bet', '$bet_time')");
			$bet_id = $mysqli->insert_id;
			
			if ($is_buyout) {
				$mysqli->query("UPDATE auctions SET bet_id = $bet_id, is_current = 0 WHERE auction_id = $auction_id");
			}
			else {
				$mysqli->query("UPDATE auctions SET bet_id = $bet_id WHERE auction_id = $auction_id");
			}

			$mysqli->query("UPDATE users SET balance = $balance WHERE user_id = $user_id");
			$response['success'] = '1';	
		}

	}

	else {

		$response['error'] = "Error when placing a bet";

	}

	echo json_encode($response);

?>