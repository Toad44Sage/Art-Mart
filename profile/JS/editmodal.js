'use strict'

$(function () {
	$.post('../../scripts/getUserHeadInfo.php', {}, function (data) {
		var result = JSON.parse(data)
		var stats = result.data
		if (result.success == 1) {
			$('#imageClick').attr('src', stats.profile_picture)
		}
	})
	$('#imageClick').click(function () {
		$('#newImg-input').click()
	})

	$('#newImg-input').change(function () {
		let imgFile = this.files[0]
		if (imgFile) {
			let reader = new FileReader()
			reader.onload = function (e) {
				$('#imageClick').attr('src', e.target.result)
			}
			reader.readAsDataURL(imgFile)
		}
	})

	$('#confirmButton').click(function () {
		let formData = new FormData()
		formData.append('image', $('#newImg-input')[0].files[0])

		$.ajax({
			type: 'POST',
			url: '../../scripts/updateProfilePicture.php',
			data: formData,
			processData: false,
			contentType: false,
			success: function (response) {
				console.log(response)
				// location.reload()
			},
			error: function (error) {
				console.error(error)
			},
		})
	})
	$('#confirmButton').click(function () {
		let formData = new FormData()
		formData.append('name', $('#name-input').val())
		formData.append('surname', $('#surname-input').val())
		formData.append('birth_date', $('#date-input').val())
		formData.append('country_id', $('#country-input').val())
		formData.append('about', $('#about-input').val())

		$.ajax({
			type: 'POST',
			url: '../../scripts/changeProfileInfo.php',
			data: formData,
			processData: false,
			contentType: false,
			success: function (response) {
				console.log(response)
				location.reload()
			},
			error: function (error) {
				console.error(error)
			},
		})
	})
})
