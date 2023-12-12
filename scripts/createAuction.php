<?php

	//массив ответа сервера
	$response = array();

	if (isset($_POST['painting_id']) and isset($_POST['end_date']) and isset($_POST['start_price']) and isset($_POST['buyout_price'])) {

		session_start();

		require 'authorizationCheck.php';
		require 'connectDB.php';

		$painting_id = $_POST['painting_id'];
		$user_id = $_SESSION['user_id'];
		$start_date = date('Y-m-d');
		$end_date = $_POST['end_date'];
		$start_price = $_POST['start_price'];
		$buyout_price = $_POST['buyout_price'];

		$check_exist = $mysqli->query("SELECT painting_id, end_date, bet_id FROM auctions WHERE painting_id = $painting_id LIMIT 1")->fetch_assoc();

		if(empty($check_exist)){
			$mysqli->query("INSERT INTO auctions (painting_id, user_id, start_date, end_date, start_price, buyout_price) VALUES ('$painting_id', '$user_id', '$start_date', '$end_date', '$start_price', '$buyout_price')");
			$response['success'] = '1';
		}
		else {

			if($check_exist['end_date'] > $start_date){
				$response['error'] = "The auction with this painting is not over yet";
			}
			elseif (!empty($check_exist['bet_id'])) {
				$response['error'] = "This painting has already been sold at auction";
			}
			else {
				$mysqli->query("UPDATE auctions
					SET user_id = '$user_id', start_date = '$start_date', end_date = '$end_date',
					start_price = '$start_price', buyout_price = '$buyout_price'
					WHERE painting_id = '$painting_id'");
				$response['success'] = '1';	
			}
		}


	}

	else {

		$response['error'] = "Error when creating auction";

	}

	echo json_encode($response);

?>