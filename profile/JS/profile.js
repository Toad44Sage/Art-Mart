$(function () {
	let user_id = getParameterByName('id')
	// подписка

	// Объект с элементами профиля, на которые мы будем ссылаться
	const profileElements = {
		about: document.getElementById('profile-desc'), // элемент описания профиля
		login: document.getElementById('profile-login'), // элемент логина профиля
		count_posts: document.getElementById('profile-posts'), // элемент количества постов профиля
		name: document.getElementById('name'), // элемент имени профиля
		surname: document.getElementById('surname'), // элемент фамилии профиля
		count_followers: document.getElementById('profile-followers'), // элемент количества подписчиков профиля
		count_following: document.getElementById('profile-following'), // элемент количества подписок профиля
	}

	$.ajax({
		url: '../../scripts/getProfileInfo.php', // URL-адрес для выполнения AJAX-запроса
		type: 'POST', // метод запроса
		data: { user_id: user_id }, // данные, отправляемые на сервер
		success: function (data) {
			// функция, которая будет выполнена при успешном выполнении запроса
			let object = JSON.parse(data) // парсинг полученных данных в объект JavaScript
			let paintings = object.data // сохранение данных профиля в переменную

			// цикл по элементам профиля
			for (let key in profileElements) {
				if (profileElements.hasOwnProperty(key)) {
					let element = profileElements[key]
					element.textContent = paintings[key] // установка текстового содержимого элемента на значение из данных профиля
				}
			}

			$('#profile-picture').attr('src', paintings.profile_picture) // установка источника изображения профиля

			// проверка, подписан ли текущий пользователь на профиль, и соответствующее изменение внешнего вида кнопки
			if (paintings.is_follow == true) {
				$('.primary').addClass('activebtn')
			} else if (paintings.is_current_profile == true) {
				$('.primary').addClass('editbtn')
			}
		},
		error: function (xhr) {
			// функция, которая будет выполнена в случае ошибки при выполнении запроса
			console.log(xhr + '' + 'Возникла странная ошибка') // вывод сообщения об ошибке в консоль браузера
		},
	})

	// обработчик события клика на кнопке
	$('.primary').on('click', function () {
		// если мы на своём профиле, то открываем окно редактирования профиля
		if ($(this).hasClass('editbtn')) {
			$('.editModal').show() // показываем модальное окно
			$('body').css('overflow', 'hidden') // добавляем стиль CSS для блокировки прокрутки страницы
		}
		// если на чужом, то подписываемся/отписываемся
		else {
			$.post(
				'../../scripts/doSubUnsub.php', // URL-адрес для выполнения AJAX-запроса
				{ following_id: user_id }, // данные, отправляемые на сервер
				function (subscription) {
					// функция, которая будет выполнена при успешном выполнении запроса
					sub = JSON.parse(subscription) // парсинг полученных данных в объект JavaScript

					// проверка успешности выполнения подписки/отписки и соответствующее изменение внешнего вида кнопки
					if (sub.success == 1) {
						$('.primary').toggleClass('activebtn')
					} else {
						alert('Возникла ошибка на сервере ' + sub.error)
					}
				}
			)
		}
	})

	$(document).click(function (event) {
		if ($(event.target).is('.editModal')) {
			$('.editModal').hide()

			$('body').css('overflow', 'hidden')
		}
	})

	// прогрузка постов
	const limit = 8
	let offset = 0
	let isLoading = false

	// загрузил первую партию
	loadPosts()

	// загружаю посты по мере скролла
	$(window).scroll(function () {
		if (
			$(window).scrollTop() + $(window).height() >
			$(document).height() - 100
		) {
			loadPosts(user_id)
		}
	})

	// Обработчик события клика на таб
	$('.tabs').on('click', '.tab-item', function () {
		$('.activetab').removeClass('activetab') // удаление класса "activetab" у предыдущего активного таба
		$(this).addClass('activetab') // добавление класса "activetab" к текущему табу
		if ($(this).find('span').text() == 'POSTS') {
			// проверка на то, что выбран таб "POSTS"
			$('.gallery').empty() // очистка галереи от ранее загруженных изображений
			offset = 0 // сброс значения переменной offset
			loadPosts() // загрузка постов
		} else {
			$('.gallery').empty() // очистка галереи от ранее загруженных изображений
		}
	})

	// загружаю посты
	function loadPosts() {
		if (isLoading) return
		isLoading = true

		$.post(
			'../../scripts/getUserDrewInfo.php',
			{ offset: offset, limit: limit, user_id: user_id },
			function (response) {
				response = JSON.parse(response)
				posts = response.data

				generatePosts(posts)

				offset += limit
				isLoading = false
			}
		).fail(function (xhr, status, error) {
			console.log(
				'Произошла ошибка при загрузке публикаций' + xhr + status + error
			)
			isLoading = false
		})
	}

	// создаю посты
	function generatePosts(paintings) {
		$.each(paintings, function (i, post) {
			let item = $('<div>')
				.addClass('gallery-item' + ' ' + post.painting_id)
				.attr('id', 'post=' + (i + 1))
			let image = $('<img>').attr('src', post.path_to_paint)

			item.append(image)
			$('.gallery').append(item)
		})
	}

	// переход на публикацию

	$('.gallery').on('click', '.gallery-item', function () {
		const galleryLink = $(this)
			.attr('class')
			.substr(13, $(this).attr('class').length)

		let url = '../../publication/HTML/publication.html?id=' + galleryLink
		window.open(url, '_blank')
	})

	// получаю цифру id из вкладки
	function getParameterByName(name) {
		let url = window.location.href
		name = name.replace(/[\[\]]/g, '\\$&')
		let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url)
		if (!results) return null
		if (!results[2]) return ''
		return decodeURIComponent(results[2].replace(/\+/g, ' '))
	}
})

$(document).ready(function () {
	// функция для получения значения параметра из URL
	function getParameterByName(name, url) {
		if (!url) url = window.location.href
		name = name.replace(/[\[\]]/g, '\\$&')
		let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url)
		if (!results) return null
		if (!results[2]) return ''
		return decodeURIComponent(results[2].replace(/\+/g, ' '))
	}

	// проверка, что элемент с идентификатором "profile-followers" существует на странице
	if ($('#profile-followers').length) {
		// при клике на элемент с идентификатором "profile-followers"
		$(document).on('click', '#profile-followers', function () {
			// получение id пользователя из URL
			let userId = getParameterByName('id')
			// добавление атрибута "data-user-id" к элементу
			$(this).attr('data-user-id', userId)
			// отправка ajax запроса для получения списка подписчиков
			$.ajax({
				url: '../../scripts/getFollowersInfo.php',
				type: 'POST',
				data: { user_id: userId, limit: 10, offset: 0 },
				dataType: 'json',
				success: function (response) {
					if (response.success == '1') {
						// заполнение списка подписчиков
						let followersList = $('#followers-list')
						followersList.empty()
						$.each(response.data, function (index, follower) {
							let listItem = $('<li>', {
								html:
									"<img src='" +
									follower.profile_picture +
									"' alt='" +
									follower.login +
									"' style='width: 70px; height: 70px; display: block; margin-bottom: 10px;' />" +
									follower.login,
							})
							listItem.attr('data-user-id', follower.follower_id)
							followersList.append(listItem)
						})

						// отображение модального окна
						$('#followers-modal').show()

						// проверка на наличие подписчиков
						if (response.data.length == 0) {
							$('#no-more-followers').show()
						} else {
							$('#no-more-followers').hide()
						}
					} else {
						// вывод сообщения об ошибке всплывающим окном
						alert(response.error)
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					// вывод сообщения об ошибке всплывающим окном
					alert('Ошибка при загрузке подписчиков: ' + errorThrown)
				},
			})
		})
	}
	// закрытие модального окна
	$(document).on('click', '.close', function () {
		$('#followers-modal').hide()
		// отключение обработчика события прокрутки на элементе #followers-list
		$('#followers-list').off('scroll')
		// скрытие текста "Подписчиков больше нет"
		$('#no-more-followers').hide()
	})

	// id получаю по клику на элемент
	$('#followers-list').on('click', 'li', function () {
		let clickedUserId = $(this).attr('data-user-id')
		window.location.href = '../../profile/HTML/profile.html?id=' + clickedUserId
	})
})
