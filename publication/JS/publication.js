$(function(){
	let post_id = getParameterByName('id');
	let author_id = null;
	$.post('../../scripts/getPostPaintingInfo.php', { painting_id: post_id }, function(data){
		let result = JSON.parse(data);
		let resultObject = result.data;

		if (result.success == 1 && resultObject != null){
			for (let key in publicationElements) {
				if (publicationElements.hasOwnProperty(key)) {
					let element = publicationElements[key];
					element.text(resultObject[key]);
				}
			}
			$('.post-image').attr('src', resultObject.path_to_paint);
			$('.author-profile-img').attr('src', resultObject.author_picture)
			author_id = resultObject.author_id;
			// закрасил лайк
			if (resultObject.is_liked == 1) {
				$('.likes-icon').addClass('active');
			}
		} else {
			alert('Такой картины ещё нет, не надо играться..');
			window.history.back();
		}
	});



	const publicationElements = {
		'about': $('.post-description'),
		'author': $('h3'),
		'comments': $('.commscount'),
		'likes': $('.likescount'),
		'name': $('h1'),
		'style': $('h2'),
	}

	// кнопка возврата exit
	$('.exit-btn').on('click', function(){
		let url = '../../profile/HTML/profile.html?id=' + author_id;
 		window.location.href = url;
	});


	// переход на страницу автора
	$('.author-profile-img').on('click', function(){
		let url = '../../profile/HTML/profile.html?id=' + author_id;
		window.open(url, '_blank');
	});

});