$(function () {
	// Выбираем элементы модального окна
	let modal = $('#pushModal')
	let modalHeader = $('.painting-upload__header')
	let uploadButton = $('#photo-upload')
	let publishButton = $('#paintingPublishButton')

	// Получаем список стилей и генерируем список в выпадающем меню
	$.post('../../scripts/getStyles.php', {}, function (data) {
		let result = JSON.parse(data)
		if (result.success == 1) {
			generateStyles(result.data)
		}
	}).fail(function (xhr, status, error) {
		console.log('Произошла ошибка' + xhr + status + error)
	})

	function generateStyles(styles) {
		let styleList = $('#paint-style')

		$.each(styles, function (i, styles) {
			let styleItem = $('<option>')
				.text(styles.name)
				.attr('value', styles.style_id)

			styleList.append(styleItem)
		})
	}

	// Ограничение максимального количества символов в paint-name до 50
	const nameInput = $('#paint-name')
	nameInput.on('input', function () {
		const maxLength = 50
		if (nameInput.val().length > maxLength) {
			nameInput.val(nameInput.val().slice(0, maxLength))
		}
	})

	// Ограничение максимального количества символов в paint-description до 150
	const aboutInput = $('#paint-description')
	aboutInput.on('input', function () {
		const maxLength = 150
		if (aboutInput.val().length > maxLength) {
			aboutInput.val(aboutInput.val().slice(0, maxLength))
		}
	})

	let file

	$('#photo-upload').change(function () {
		file = this.files[0]
		/* console.log("Выбранный файл:", file); // добавлено для вывода информации о файле в консоль */
		let reader = new FileReader()
		reader.onload = function (event) {
			let image = new Image()
			image.src = event.target.result
			image.onload = function () {
				if (image.width < 400 || image.height < 400) {
					alert('Минимальный размер изображения должен быть 400x400.')
					return false
				} else {
					$('.painting-upload__select-img').css({
						'background-image': 'url(' + event.target.result + ')',
						'background-size': 'cover',
						'background-position': 'center',
					})
				}
			}
		}
		reader.readAsDataURL(file)
	})
	// Обработчик клика на кнопку "Publish"
	publishButton.on('click', function (event) {
		event.preventDefault()

		// Получаем значение поля с именем картины и проверяем на пустое значение
		const name = nameInput.val().trim()
		if (!name) {
			alert('Имя картины не может быть пустым')
			return
		}

		if (!file) {
			alert('Please select a file to upload.')
			return false
		}
		let formData = new FormData($('.painting-upload__form')[0]) // создаем объект FormData с данными формы

		formData.append('image', file) // добавляем данные о файле в объект FormData

		// выводим содержимое объекта FormData в консоль
		for (let pair of formData.entries()) {
			console.log(pair[0] + ': ' + pair[1])
		}

		$.ajax({
			url: '../../scripts/createPost.php', // адрес обработчика формы на сервере
			type: 'POST',
			data: formData, // данные формы
			processData: false,
			contentType: false,
			success: function (response) {
				// код, который будет выполнен после успешной отправки формы
				location.reload() // перезагрузить страницу после успешной отправки формы
			},
			error: function (jqXHR, textStatus, errorMessage) {
				// код, который будет выполнен в случае ошибки отправки формы
				console.log(errorMessage)
			},
		})
	})
})
