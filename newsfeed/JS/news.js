$(function () {
	// прогрузка стилей

	$.post('../../scripts/getStyles.php', {}, function (data) {
		let result = JSON.parse(data)
		if (result.success == 1) {
			generateStyles(result.data)
		} else {
			alert('Возникла ошибка на сервере')
			window.location.href = '../../main/main.html'
		}
	}).fail(function (xhr, status, error) {
		console.log('Произошла ошибка' + xhr + status + error)
	})

	// прогрузка ленты
	let style_id = null

	const limit = 2
	let offset = 0
	let isLoading = false

	function loadPosts(style_id = null) {
		if (isLoading) return
		isLoading = true

		$.post(
			'../../scripts/getPublicationFeed.php',
			{ offset: offset, limit: limit, style_id: style_id },
			function (data) {
				result = JSON.parse(data)
				posts = result.data

				generatePosts(posts)

				offset += posts.length
				isLoading = false
			}
		).fail(function (xhr, status, error) {
			console.log('Произошла ошибка при загрузке постов' + xhr + status + error)
			isLoading = false
		})
	}

	function generatePosts(post) {
		$.each(post, function (i, post) {
			let newPost = $('<div>')
				.addClass('post ' + post.author_id)
				.attr('id', post.painting_id)

			let postHeader = $('<div>').addClass('post-header')

			let authorInfo = $('<div>').addClass('author-info')
			let authorAvatar = $('<img>')
				.addClass('author-avatar')
				.attr({ src: post.author_picture, alt: 'author-img' })
			let authorNickname = $('<span>')
				.attr('id', 'author-nickname')
				.text(post.author)

			let postTitles = $('<div>').addClass('post-titles')
			let postStyle = $('<h2>').addClass('post-style').text(post.style)
			let dotSpan = $('<span>').text('•')
			let postName = $('<h2>').addClass('name-title').text(post.name)

			let postBlock = $('<div>').addClass('post-img-block')
			let postImage = $('<img>')
				.addClass('post-image')
				.attr({ alt: 'post-img', src: post.path_to_paint })

			let postFooter = $('<div>').addClass('post-footer')

			let likesButton = $('<button>').addClass('likes-btn')
			let likes = $('<div>').addClass('likes')
			let likesCount = $('<span>').attr('id', 'likes-count').text(post.likes)

			// проверка на то, что лайк уже стоял ==> работа с  классом кнопки

			let likesIcon = $('<img>').attr({ alt: 'likesIcon' })

			if (post.is_liked == true) {
				likesIcon = $('<img>')
					.attr({ alt: 'likesIcon' })
					.addClass('likes-icon active')
			} else {
				likesIcon = $('<img>').attr({ alt: 'likesIcon' }).addClass('likes-icon')
			}

			let commentsButton = $('<button>').addClass('comments-btn')
			let comments = $('<div>').addClass('comments')
			let commentsCount = $('<span>')
				.attr('id', 'comments-count')
				.text(post.comments)
			let commentsIcon = $('<img>')
				.addClass('comments-icon')
				.attr({ src: '../IMG/comment.png', alt: 'comments-icon' })

			authorInfo.append(authorAvatar, authorNickname)
			postTitles.append(postStyle, dotSpan, postName)
			postHeader.append(authorInfo, postTitles)

			likes.append(likesCount, likesIcon)
			likesButton.append(likes)

			comments.append(commentsCount, commentsIcon)
			commentsButton.append(comments)

			postFooter.append(likesButton, commentsButton)
			postBlock.append(postImage)
			newPost.append(postHeader, postBlock, postFooter)

			$('.posts-container').append(newPost)
		})
	}

	function generateStyles(styles) {
		let styleList = $('.filter-list')

		$.each(styles, function (i, styles) {
			let item = $('<li>')
			let styleItem = $('<a>')
				.attr('href', '#')
				.addClass('style-item')
				.text(styles.name)
				.attr('style-id', styles.style_id)

			item.append(styleItem)
			styleList.append(item)
		})
	}

	// загрузил первую партию постов
	loadPosts()

	// фильтр постов по стилю
	$('.style-list').on('click', '.style-item', function () {
		$('.posts-container').empty()

		style_id = $(this).attr('style-id')
		offset = 0
		loadPosts(style_id)
	})
	// кнопка сброса стилей
	$('.style-list').on('click', '.default-list', function () {
		$('.posts-container').empty()

		style_id = null
		offset = 0
		loadPosts(style_id)
	})

	// загружаю по мере скролла
	// прокрутка от верхней границы + область видимой страницы > полной высоты документа
	$(window).scroll(function () {
		if (
			$(window).scrollTop() + $(window).height() >
			$(document).height() - 100
		) {
			loadPosts(style_id)
		}
	})

	// Кнопочка наверх
	$('.press-back').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow')
	})
})
