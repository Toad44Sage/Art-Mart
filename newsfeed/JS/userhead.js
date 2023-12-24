'use strict'

$(function () {
	// прогрузка баланса и аватарки
	$.post('../../scripts/getUserHeadInfo.php', {}, function (data) {
		const result = JSON.parse(data)
		const stats = result.data
		if (result.success == 1) {
			$('#balanceCount').text(stats.balance)
			$('#balanceTopUp').text(stats.balance)
			$('.nav__profile-pic').attr('src', stats.profile_picture)
		} else {
			alert('Пожалуйста, войдите в аккаунт')
			window.location.href = '../../main/main.html'
		}
	})

	const modalToggle = function () {
		const modal = document.getElementById(`${this.dataset.modal}`)
		console.log(modal)
		modal.classList.remove('hidden')
		modal.addEventListener('click', function (event) {
			if (event.target.id == `${modal.id}`) {
				modal.classList.add('hidden')

				if ($('#privacyMessage').text().length) {
					$('#privacyMessage')
						.removeClass(
							'pr-settings-modal__ans--error pr-settings-modal__ans--success'
						)
						.text('')
				}
			}
		})
	}

	const dropdownState = {
		'profile-dropdown': false,
		'notif-dropdown': false,
	}

	// наводка на блок профиля

	const dropdownToggle = function (clickName) {
		const dropdown = $(`.${clickName}`)
		dropdown.stop(true, true).slideToggle(200)
		dropdownState[`${clickName}`] = !dropdownState[`${clickName}`]
	}

	const dropdownClose = function (dropdownName) {
		const dropdown = $(`.${dropdownName}`)
		dropdown.stop(true, true).slideUp(100)
		dropdownState[`${dropdownName}`] = !dropdownState[`${dropdownName}`]
	}

	const modalItems = ['nav__lisa-icon', 'profile-dropdown__settings']
	const dropdownItems = ['notif-dropdown', 'profile-dropdown']

	for (let key in modalItems) {
		document
			.querySelector(`.${modalItems[key]}`)
			.addEventListener('click', modalToggle)
	}

	$('.nav__profile-pic').click(() => {
		if (dropdownState['notif-dropdown'] == true) {
			dropdownClose('notif-dropdown')
		}
		dropdownToggle('profile-dropdown')
	})

	$('.nav__notif-icon').click(() => {
		if (dropdownState['profile-dropdown'] == true) {
			dropdownClose('profile-dropdown')
		}
		dropdownToggle('notif-dropdown')
	})

	// клик по log out

	$('.profile-dropdown').on('click', '.profile-dropdown__exit', function () {
		$.post('../../scripts/logout.php', {}, function () {
			location.reload()
		})
	})

	const topUpBalance = function () {
		const inputValue = Number($('#balanceInput')[0].value)
		$.post(
			'../../../scripts/addBalance.php',
			{ add: inputValue },
			function (data) {
				const result = JSON.parse(data)
				const stats = result.data
				if (result.success == 1) {
					$('#balanceCount').text(stats.balance)
					$('#balanceTopUp').text(stats.balance)
				} else {
					alert('Что-то пошло не так!')
				}
			}
		)
	}
	$('#addBalance').click(topUpBalance)

	// запрос для редактирования данных

	$('.pr-settings-modal form').submit(function (event) {
		event.preventDefault()

		let currPass = $('input[name="currPass"]').val()
		let newEmail = $('input[name="newEmail"]').val()
		let newPass = $('input[name="newPass"]').val()
		let repeatPass = $('input[name="repeatPass"]').val()

		const allowedChars = /^[A-Za-z0-9_]+$/

		if (!allowedChars.test(currPass)) {
			alert('Пожалуйста, используйте только допустимые символы в полях ввода')
			return
		}

		if (newPass.trim() !== '' && !allowedChars.test(newPass)) {
			alert('Пожалуйста, используйте только допустимые символы в полях ввода')
			return
		}

		if (newPass === repeatPass) {
			$.post(
				'../../scripts/changeSecurityData.php',
				{ password: currPass, new_password: newPass, email: newEmail },
				function (answer) {
					const response = JSON.parse(answer)
					if (response.success == 1) {
						$('input[name="currPass"]').val('')
						$('input[name="newEmail"]').val('')
						$('input[name="newPass"]').val('')
						$('input[name="repeatPass"]').val('')
						$('.pr-settings-modal__ans')
							.removeClass(
								'pr-settings-modal__ans--success pr-settings-modal__ans--error'
							)
							.addClass('pr-settings-modal__ans--success')
							.text(response.success)
					} else {
						$('input[name="currPass"]').val('')
						$('.pr-settings-modal__ans')
							.removeClass(
								'pr-settings-modal__ans--success pr-settings-modal__ans--error'
							)
							.addClass('pr-settings-modal__ans--error')
							.text(response.error)
					}
				}
			)
		} else {
			alert('Пароли не совпадают')
			return
		}
	})

	// клик по log out

	$('.dropdown').on('click', '.exit', function () {
		$.post('../../scripts/logout.php', {}, function () {
			location.reload()
		})
	})

	$('.search-input').on('input', function (event) {
		// Получение введенного текста из поля поиска
		let searchQuery = $(this).val().trim()
		// Отправка запроса на сервер только если текст запроса не пустой
		if (searchQuery !== '') {
			$.ajax({
				type: 'POST',
				url: '../../scripts/searchUser.php',
				data: { login: searchQuery, limit: 10 },
				dataType: 'json',
				success: function (response) {
					if (response.success == '1') {
						// Очистка списка результатов поиска перед добавлением новых
						$('.search-results').empty()
						// Добавление каждого результата поиска в список
						$.each(response.data, function (index, user) {
							let userProfileLink =
								'<a href="../../profile/HTML/profile.html?id=' +
								user.user_id +
								'"><img src="' +
								user.profile_picture +
								'"> ' +
								user.login +
								'</a>'
							$('.search-results').append('<li>' + userProfileLink + '</li>')
						})
						// Отображение списка результатов поиска
						$('.search-results').show()
						// Если есть результаты поиска, перейти на первый результат при нажатии Enter
						if (response.data.length > 0) {
							$(document).on('keypress', function (e) {
								if (e.which === 13) {
									window.location.href = $(
										'.search-results li:first-child a'
									).attr('href')
								}
							})
						}
					}
				},
			})
		} else {
			// Скрытие списка результатов поиска, если поле поиска пустое
			$('.search-results').hide()
		}
	})

	// Скрытие списка результатов поиска при клике вне поля поиска или списка
	$(document).mouseup(function (e) {
		let searchResults = $('.search-results')
		if (
			!searchResults.is(e.target) &&
			searchResults.has(e.target).length === 0 &&
			!$('.search-input').is(e.target)
		) {
			searchResults.hide()
		}
	})
	$('.exit').click(function (event) {
		event.preventDefault()
		$.ajax({
			url: '../../scripts/logout.php',
			success: function () {
				window.location.href = 'http://project/main/main.html'
			},
		})
	})

	let notificationCheck = 'no'

	setInterval(async function () {
		await $.post(
			'../../../scripts/checkNewNotifications.php',
			{},
			function (response) {
				response = JSON.parse(response)
				const messageData = response.data
				if (response.success == 1) {
					if (messageData == 'yes') {
						notificationCheck = messageData
						getNotifications()
					}
				}
			}
		)
	}, 5000)

	const checkNewNotifications = new Promise(function (resolve, reject) {
		$.post(
			'../../../scripts/checkNewNotifications.php',
			{},
			function (response) {
				response = JSON.parse(response)
				const messageData = response.data
				if (response.success == 1) {
					if (messageData == 'yes') {
						notificationCheck = messageData
					}
				}
			}
		)
	})

	const clearNotifications = function () {
		$('.notif-dropdown__container').empty()
	}

	const changeToChecked = function () {
		$('.nav__notif-icon')
			.removeClass('nav__notif-icon--checked nav__notif-icon--unchecked')
			.addClass('nav__notif-icon--checked')
		notificationCheck = 'no'
	}

	const changeToUnchecked = function () {
		$('.nav__notif-icon')
			.removeClass('nav__notif-icon--checked nav__notif-icon--unchecked')
			.addClass('nav__notif-icon--unchecked')
	}

	const createNotifications = function (message) {
		checkNewNotifications.then()
		if (notificationCheck == 'no') {
			changeToChecked()
		} else {
			changeToUnchecked()
			$('.nav__notif-icon').click(changeToChecked)
		}
		const notificationContainer = $('.notif-dropdown__container')
		const notificationItem = $('<li>').addClass('notif-dropdown__item')
		const notificationParagraph = $('<p>').text(message.message)
		const notificationSpan = $('<span>').addClass('mrg-small-right')
		const notificationUserImage = $('<img>').attr('src', message.icon)
		notificationParagraph.append(notificationSpan)
		notificationItem.append(notificationParagraph, notificationUserImage)
		notificationContainer.append(notificationItem)
	}

	const getNotifications = async function () {
		await $.post(
			'../../../scripts/getNotifications.php',
			{},
			function (response) {
				response = JSON.parse(response)
				const messageData = response.data
				if (response.success == 1) {
					clearNotifications()
					$.each(messageData, function (i, message) {
						createNotifications(message)
					})
				}
			}
		)
	}
	getNotifications()
})
