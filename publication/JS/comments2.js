$(function () {
	let painting_id = getParameterByName('id');
	// Прогрузка комментариев
	const limit = 7;
	let offset = 0;
	let isLoading = false;
	let hasComments = false;


	// первая порция из 7 комментариев
	loadComments();

	function loadComments() {

		$.post('../../scripts/getPostCommentsInfo.php',
			{ painting_id: painting_id, limit: limit, offset: offset },
			function (data) {
				resultObject = JSON.parse(data);
				commentId = resultObject.data;
				
				if (commentId.length > 0) {
					generateComments(commentId);

					hasComments = true;
				}

				if (!hasComments) {
					$('#comment').attr('placeholder', 'Ваш комментарий может быть первым...');
				}

			});
	}
	
	let lastCommentId = 0;

	function generateComments(commentId) {
		console.log(commentId);
		$.each(commentId, function (i, comment) {
			let commentItem = $('<div>').addClass('comment' + ' ' + comment.commentator_id).attr('id', (comment.comment_id));

			let authorImg = $('<img>').addClass('author-img').attr('src', comment.commentator_picture);

			let commentContent = $('<div>').addClass('comment-info');

			let authorName = $('<span>').addClass('author').text(comment.commentator);
			let commentDesc = $('<span>').addClass('comment-desc').text(comment.content);

			commentContent.append(authorName, commentDesc);
			commentItem.append(authorImg, commentContent);

			$('.comments-container').append(commentItem);

			lastCommentId = commentItem.attr('id');
			
		});
	};

	function newComment(newCommentObject) {
		let commentItem = $('<div>').addClass('comment' + ' ' + newCommentObject.commentator_id).attr('id', (newCommentObject.comment_id));

		let authorImg = $('<img>').addClass('author-img').attr('src', newCommentObject.commentator_picture);

		let commentContent = $('<div>').addClass('comment-info');

		let authorName = $('<span>').addClass('author').text(newCommentObject.commentator);
		let commentDesc = $('<span>').addClass('comment-desc').text(newCommentObject.content);

		commentContent.append(authorName, commentDesc);
		commentItem.append(authorImg, commentContent);

		$('.comments-container').append(commentItem);

		lastCommentId = commentItem.attr('id');
	}
	
	function scrollToNewComment() {
		let newComment = $('.comment').last();
		let container = $('.comments-container');
		let scrollPosition = newComment.offset().top - container.offset().top + container.scrollTop();
		container.animate({ scrollTop: scrollPosition }, 500);
	}

	// Добавить комментарий
	$('#comment').keydown(function (event) {

		// нажал Enter без шифта
		if (event.keyCode === 13 && !event.shiftKey) {
			event.preventDefault();
			const commentField = $(this); // сохранил поле чтоб потом почистить после отправки комментария
			const content = commentField.val().trim(); // сохранил текст и удалил начальные + конечные пробелы
			// если комментарий не пустой, то скрипт возвращает новое количество комментариев
			if (content !== '') {
				$.post('../../scripts/dropComment.php', { painting_id: painting_id, content: content }, function (data) {
					response = JSON.parse(data);
					console.log(response);

					newCommentObject = {
						commentator_id: response.data.user_id,
						comment_id: (Number(lastCommentId) + 1),
						commentator: response.data.login,
						commentator_picture: response.data.profile_picture,
						content: content,
					};

					

					if (response.status == 1) {
						commentField.val(''); // очистил поле комментария

						// обновил количество комментов
						$('.commscount').text(response.data.comments);

						// добавил комментарий
						newComment(newCommentObject);

						scrollToNewComment();
						

					} else {
						console.log(response.status);
					}
				});
			}
		}
	});

});