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
			if (tabState === 0) {
				loadPosts(user_id)
			} else {
				loadPostsBought(user_id)
			}
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

				offset += posts.length
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

	let tabState = 0

	$('.tabs').on('click', '.tab-item', function () {
		$('.activetab').removeClass('activetab') // удаление класса "activetab" у предыдущего активного таба
		$(this).addClass('activetab') // добавление класса "activetab" к текущему табу
		if (Number(this.dataset.categoryid) === 0) {
			// проверка на то, что выбран таб "POSTS"
			tabState = 0
			$('.Bought').empty()
			$('.gallery').empty() // очистка галереи от ранее загруженных изображений
			offset = 0 // сброс значения переменной offset
			loadPosts() // загрузка постов
		} else {
			tabState = 1
			$('.Bought').empty()
			$('.gallery').empty() // очистка галереи от ранее загруженных изображений
			offset = 0
			loadPostsBought()
		}
	})
	// загружаю посты купленных картин
	function loadPostsBought() {
		if (isLoading) return
		isLoading = true
		$.post(
			'../../scripts/getUserBoughtInfo.php',
			{ offset: offset, limit: limit, user_id: user_id },
			function (data) {
				const response = JSON.parse(data)
				posts = response.data

				generatePosts(posts)

				offset += posts.length
				isLoading = false
			}
		).fail(function (xhr, status, error) {
			console.log(
				'Произошла ошибка при загрузке публикаций' + xhr + status + error
			)
			isLoading = false
		})
	}
})
