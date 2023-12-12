$(function () {
	// прогрузка баланса и аватарки
	$.post('../../scripts/getUserHeadInfo.php', {}, function (data) {
		result = JSON.parse(data);
		stats = result.data;
		if (result.success == 1) {
			$('#balance').text(stats.balance);
			$('.miniprofile-pic').attr('src', stats.profile_picture);
		}
		else {
			alert("Ты как сюда попал?");
			window.location.href = '../../main/main.html';
		}
	});


	// наводка на блок профиля

	let hoverTimeOut;
	$('.miniprofile-pic').hover(function () {

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

	// клик по настройкам

	$('.dropdown').on('click', '.settings', function () {
		//отобразил модальное окно и убрал ненужный скролл
		$('.privacyModal').show();
		$('body').css('overflow', 'hidden');




	});

	// запрос для редактирования данных

	$('.privacyModal form').submit(function (event) {
		event.preventDefault();

		let currPass = $('input[name="currPass"]').val();
		let newEmail = $('input[name="newEmail"]').val()
		let newPass = $('input[name="newPass"]').val()
		let repeatPass = $('input[name="repeatPass"]').val()

		const allowedChars = /^[A-Za-z0-9_]+$/;

		if (!allowedChars.test(currPass)) {
			alert("Пожалуйста, используйте только допустимые символы в полях ввода");
			return;
		}

		if (newPass.trim() !== '' && !allowedChars.test(newPass)) {
			alert("Пожалуйста, используйте только допустимые символы в полях ввода");
			return;
		}

		if (newPass === repeatPass) {
			$.post('../../scripts/changeSecurityData.php', { password: currPass, new_password: newPass, email: newEmail }, function (answer) {
				response = JSON.parse(answer);
				console.log(response);
				$('input[name="currPass"]').val('');
				$('input[name="newEmail"]').val('');
				$('input[name="newPass"]').val('');
				$('input[name="repeatPass"]').val('');
			});
		} else {
			alert('Пароли не совпадают');
			return;
		}
	});

	$(document).click(function (event) {
		if ($(event.target).is('.privacyModal')) {
			$('.privacyModal').hide();

			$('body').css('overflow', 'visible');
		}
	})
	// клик по log out

	$('.dropdown').on('click', '.exit', function () {
		$.post('../../scripts/logout.php', {}, function () {
			location.reload();
		})
	});


});
