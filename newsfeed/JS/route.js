$(function () {
	// Вытаскиваем айди автора из класса картины и переходим на его профиль
	$('main').on('click', '.author-avatar', function () {
		let parent = $($(this).closest('.post').attr('class')).selector;
		const authorId = parent.substr(5, parent.length);

		let url = '../../profile/HTML/profile.html?id=' + authorId;
		window.open(url, '_blank');

	});
	// переход на страницу поста (спс функции)
	$('main').on('click', '.post-img-block', function () {
		const element = $(this);
		
		loadPublication(element);
	});
	// переход на страницу поста (спс функции)
	$('main').on('click', '.comments-btn', function(){
		const element = $(this);

		loadPublication(element);
	});

	function loadPublication(element){
		let paintingId = element.closest('.post').attr('id');

		let url = '../../publication/HTML/publication.html?id=' + paintingId;
		window.open(url, '_blank');
	}




});


