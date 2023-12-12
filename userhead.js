$(function () {
	// прогрузка баланса и аватарки
	$.post('../../scripts/getUserHeadInfo.php', {}, function (data) {
		result = JSON.parse(data);
		stats = result.data;
		if (result.success == 1) {
			$('#balance').text(stats.balance);
			$('.profile-pic').attr('src', stats.profile_picture);
		}
		else {
			alert("Ты как сюда попал?");
			window.location.href = '../../main/main.html';
		}
	});


	// наводка на блок профиля

	let hoverTimeOut;
	$('.profile-pic').hover(function () {

		clearTimeout(hoverTimeOut);

		$('.dropdown').stop(true, true).slideDown(200);
	}, function () {
		hoverTimeOut = setTimeout(function () {
			$('.dropdown').stop(true, true).slideUp(200);
		}, 200);
	});

	$('.dropdown').mouseleave(function () {
		hoverTimeOut = setTimeout(function () {
			$('.dropdown').stop(true, true).slideUp(200);
		}, 200);
	}).mouseenter(function () {
		clearTimeout(hoverTimeOut);
	});
});
