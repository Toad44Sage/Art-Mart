'use strict';

let postState = 1;

const postShift = {
  offset: 0,
  limit: 2,
};

const resetShift = function () {
  postShift.offset = 0;
  postShift.limit = 2;
};

const closeBetModal = function (modal) {
  modal.classList.add('hidden');
  clearBetModalPost();
};

const betModalToggle = function () {
  const modal = document.getElementById(`${this.dataset.modal}`);

  loadModalPost(postState, this.dataset);

  modal.classList.remove('hidden');

  modal.addEventListener('click', function (event) {
    if (event.target.id == `${modal.id}`) {
      closeBetModal(modal);
    }
  });
};

const loadModalPost = function (postState, modalData) {
  const paintId = modalData.paintingid;
  const authorId = modalData.authorid;
  let postInform = {
    authorImage: null,
    description: null,
  };

  let authorImagePromise = new Promise((resolve, reject) => {
    $.post(
      '../../../scripts/getUserHeadInfo.php',
      { user_id: authorId },
      function (response) {
        response = JSON.parse(response);
        let answer = response.data;
        if (response.success == 1) {
          postInform.authorImage = answer.profile_picture;
          resolve();
        } else {
          reject();
        }
      }
    );
  });

  let descriptionPromise = new Promise((resolve, reject) => {
    $.post(
      '../../../scripts/getDescription.php',
      { painting_id: paintId },
      function (response) {
        response = JSON.parse(response);
        let answer = response.data;
        if (response.success == 1) {
          postInform.description = answer.about;
          resolve();
        } else {
          reject();
        }
      }
    );
  });
  if (postState === 1) {
    Promise.all([authorImagePromise, descriptionPromise]).then(() => {
      generateBetPost(modalData, postInform);
    });
  } else {
    Promise.all([authorImagePromise, descriptionPromise]).then(() => {
      generatePost(modalData, postInform);
    });
  }
};

const postModalToggle = function () {
  const modal = document.getElementById(`${this.dataset.modal}`);

  loadModalPost(postState, this.dataset);

  modal.classList.remove('hidden');
  modal.addEventListener('click', function (event) {
    if (event.target.id == `${modal.id}`) {
      modal.classList.add('hidden');
      clearModalPost();
    }
  });
};

const generateMainAuctions = function (post, current_user_id) {
  let mainContainer = $('.posts-container');

  let dataDiv = $('<div>')
    .attr('data-postname', post.name)
    .attr('data-imgsource', post.path_to_paint)
    .attr('data-authorlogin', post.author)
    .attr('data-style', post.style)
    .attr('data-start', post.start_date)
    .attr('data-end', post.end_date)
    .attr('data-bet', post.bet)
    .attr('data-buyoutprice', post.buyout_price)
    .attr('data-startprice', post.start_price)
    .css('display', 'none')
    .addClass(`post-data-containerbet-${post.painting_id}`);

  let divBlock = $('<div>')
    .addClass('post bet-post')
    .attr('data-auctionid', post.auction_id);
  let figure = $('<figure>').addClass('post__img');
  let img = $('<img>').attr('src', post.path_to_paint);
  let ul = $('<ul>').addClass('post__description');
  let postText1 = $('<li>').addClass('post__text');
  let h1 = $('<h1>').addClass('posts__heading').text(post.name);
  let postText2 = $('<li>').addClass('post__text').text(post.author);
  let postText3 = $('<li>').addClass('post__text').text(post.style);
  let postText4 = $('<li>')
    .addClass('post__text')
    .text(`date: ${post.start_date} - ${post.end_date}`);
  let postText5 = $('<li>')
    .addClass('post__text')
    .text(`buy now for: ${post.buyout_price}`);
  let postText6 = $('<li>')
    .addClass('post__text')
    .text(`current bet: ${post.bet}`);
  let postText7 = $('<li>').addClass('post__text');
  let button = $('<button>').addClass('btn-post').text('Place a bet');

  if (post.author_id == current_user_id) {
    button.addClass('btn-post--blocked');
    button.attr('disabled', 'disabled');
    button.css('cursor', 'default');
  } else {
    button
      .addClass('btn-post--orange')
      .attr('data-modal', 'postBetModal')
      .attr('data-paintingid', post.painting_id)
      .attr('data-auctionid', post.auction_id)
      .attr('data-authorid', post.author_id)
      .attr('data-current-userid', current_user_id)
      .click(betModalToggle);
  }
  figure.append(img);
  postText1.append(h1);
  postText7.append(button);
  ul.append(
    postText1,
    postText2,
    postText3,
    postText4,
    postText5,
    postText6,
    postText7
  );
  divBlock.append(figure, ul, dataDiv);
  mainContainer.append(divBlock);
};

const generateCompletedAuctions = function (post, current_user_id) {
  let mainContainer = $('.posts-container');
  let dataDiv = $('<div>')
    .attr('data-postname', post.name)
    .attr('data-imgsource', post.path_to_paint)
    .attr('data-authorlogin', post.author)
    .attr('data-style', post.style)
    .attr('data-start', post.start_date)
    .attr('data-end', post.end_date)
    .attr('data-soldfor', post.sold_for)
    .attr('data-boughtbuy', post.winner_name)
    .css('display', 'none')
    .addClass(`post-data-containerpost-${post.painting_id}`);

  let divBlock = $('<div>').addClass('post');
  let figure = $('<figure>').addClass('post__img');
  let img = $('<img>').attr('src', post.path_to_paint);
  let ul = $('<ul>').addClass('post__description');
  let postText1 = $('<li>').addClass('post__text');
  let h1 = $('<h1>').addClass('posts__heading').text(post.name);
  let postText2 = $('<li>').addClass('post__text').text(post.author);
  let postText3 = $('<li>').addClass('post__text').text(post.style);
  let postText4 = $('<li>')
    .addClass('post__text')
    .text(`date: ${post.start_date} - ${post.end_date}`);
  let postText5 = $('<li>')
    .addClass('post__text')
    .text(`sold for: ${post.sold_for}`);
  let postText6 = $('<li>')
    .addClass('post__text')
    .text(`bought by: ${post.winner_name}`);
  let postText7 = $('<li>').addClass('post__text');
  let button = $('<button>')
    .addClass('btn-post')
    .addClass('btn-post--view')
    .text('View the post')
    .attr('data-paintingId', post.painting_id)
    .attr('data-auctionId', post.auction_id)
    .attr('data-authorId', post.author_id)
    .attr('data-current-userId', current_user_id)
    .attr('data-modal', 'postModal')
    .click(postModalToggle);
  figure.append(img);
  postText1.append(h1);
  postText7.append(button);
  ul.append(
    postText1,
    postText2,
    postText3,
    postText4,
    postText5,
    postText6,
    postText7
  );
  divBlock.append(figure, ul, dataDiv);
  mainContainer.append(divBlock);
};

// загружаю посты
function loadPosts() {
  $.post(
    '../../../scripts/getCurrentAuctionList.php',
    { offset: postShift.offset, limit: postShift.limit },
    function (response) {
      response = JSON.parse(response);
      let posts = response.data;
      if (response.success == 1) {
        postShift.offset += posts.length;
        $.each(posts, function (i, post) {
          generateMainAuctions(post, response.current_user_id);
        });
      }
    }
  );
}

loadPosts();

function loadCompletedPosts() {
  $.post(
    '../../../scripts/getCompletedAuctionList.php',
    { offset: postShift.offset, limit: postShift.limit },
    function (response) {
      response = JSON.parse(response);
      let posts = response.data;
      if (response.success == 1) {
        postShift.offset += posts.length;
        $.each(posts, function (i, post) {
          generateCompletedAuctions(post, response.current_user_id);
        });
      }
    }
  );
}

function clearPosts() {
  $('.posts-container').empty();
}

const disableInputs = function () {
  $('#betFrom').attr('disabled', 'disabled');
  $('#betTo').attr('disabled', 'disabled');
};

const enableInputs = function () {
  $('#betFrom').removeAttr('disabled');
  $('#betTo').removeAttr('disabled');
};

const clearFilter = function () {
  $('#filterForm').find('input').val('');
  $('#filterForm').find('input[type="checkbox"]').prop('checked', false);
};

const postToggle = function () {
  // changed to Ongoing posts
  if (postState === 1) {
    clearFilter();
    resetFilterActive();
    enableInputs();
    clearPosts();
    resetShift();
    resetFilterState();
    loadPosts();
  }
  // changed to Completed posts
  else {
    clearFilter();
    resetFilterActive();
    disableInputs();
    clearPosts();
    resetShift();
    resetFilterState();
    loadCompletedPosts();
  }
};

const setActiveTab = function () {
  $('.tabs__item').removeClass('tabs__item--active');
  $(this).addClass('tabs__item--active');
  let postType = Number(this.dataset.category);
  if (postType != postState) {
    postState = postType;
    postToggle(postState);
  }
};

$('.tabs__item').click(setActiveTab);

$('.btn-filter').click(function () {
  postToggle();
});

$(window).scroll(function () {
  if (
    $(window).scrollTop() >= $(document).height() - $(window).height() &&
    !isFilterActive
  ) {
    if (postState === 1) {
      loadPosts();
    } else {
      loadCompletedPosts();
    }
  }
});
