$(function(){
	$('main').on('click', '.likes-count', function(){
		// сама кнопка
		let button = $(this);
		// элемент с иконкой лайка
		let turn = $(this).find('.likes-icon');
		// элемент с числом лайков
		let likesCount = $(this).find('.likescount');

		// конкретное id картины, выдаёт число
		painting_id = getParameterByName('id');

		// Если кнопка отключена, выходим отсюда
		if (button.prop('disabled')) {
			return;
		}
		// если не отключена, то вырубаем на некоторое время чтоб не спамили хейтеры
		button.prop('disabled', true);
		setTimeout(function(){
			button.prop('disabled', false);
		}, 500);

		$.post('../../scripts/dropLike.php', { painting_id: painting_id }, function(data){
			result = JSON.parse(data);

			if (result.success == 1) {
				
				// рубильник лайка + обновление числа
				likesCount.text(result.data.likes);
				turn.toggleClass('active');

			} else{
				alert("Лайк не обновился, что-то пошло не так");
			}

		});
	});
});