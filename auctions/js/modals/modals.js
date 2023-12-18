'use strict';
// auction-upload-modal
const modalToggle = function () {
  const modal = document.getElementById(`${this.dataset.modal}`);
  modal.classList.remove('hidden');
  modal.addEventListener('click', function (event) {
    if (event.target.id == `${modal.id}`) {
      modal.classList.add('hidden');
    }
  });
};

const auctionModalToggle = function () {
  const modal = document.getElementById(`${this.dataset.modal}`);
  modal.classList.remove('hidden');
  modal.addEventListener('click', function (event) {
    if (event.target.id == `${modal.id}`) {
      modal.classList.add('hidden');
      if (selectedItem) {
        selectedItem.removeClass('post-upload__item--selected');
        selectedItem = null;
      }
      if (!$('#aucAnswer').hasClass('hidden')) {
        $('#aucAnswer')
          .removeClass(
            'post-upload__answer--error post-upload__answer--success'
          )
          .addClass('hidden');
      }
    }
  });
};

const colors = {
  main: '#fff',
  active: 'rgba(136, 136, 136, 0.4)',
};

let selectedItem = null;

const getNextDate = function (date) {
  date.setDate(date.getDate() + 30);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return year + '-' + month + '-' + day;
};

const generatePaintingList = function (paintings) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  $('#upload-date')
    .attr('min', `${year}-${month}-${day}`)
    .attr('max', `${getNextDate(date)}`);
  $.each(paintings, function (i, post) {
    let item = $('<li>')
      .attr('data-id', post.painting_id)
      .addClass('post-upload__item');
    let image = $('<img>').attr('src', post.path_to_paint);
    let wrapper = $('<div>');
    let postName = $('<span>').addClass('post-modal__name').text(post.name);
    let postStyle = $('<span>').addClass('post-modal__style').text(post.style);

    wrapper.append(postName, postStyle);
    item.append(image);
    item.append(wrapper);
    $('.post-upload__list').append(item);

    item.click(function () {
      if (selectedItem && selectedItem !== $(this)) {
        selectedItem.removeClass('post-upload__item--selected');
      }

      // Изменение фона на серый для текущего элемента
      $(this).addClass('post-upload__item--selected');

      // Сохранение текущего элемента в переменной
      selectedItem = $(this);
    });
  });
};

const submitForm = function (event) {
  if (!selectedItem) {
    event.preventDefault();
    $('.post-upload__answer')
      .addClass('post-upload__answer--error')
      .removeClass('hidden')
      .text('Please, select painting!');
  } else {
    if (!$('#aucAnswer').hasClass('hidden')) {
      $('#aucAnswer')
        .addClass('hidden')
        .removeClass('post-upload__answer--error post-upload__answer--success');
    }

    let paintingId = selectedItem[0].dataset.id;
    let date = $('#upload-date')[0].value;
    let uploadBid = $('#upload-bid')[0].value;
    let imBuyBid = $('#upload-imBuy')[0].value;
    if (date && uploadBid && imBuyBid) {
      event.preventDefault();
      $.post(
        '../../../scripts/createAuction.php',
        {
          painting_id: paintingId,
          end_date: date,
          start_price: uploadBid,
          buyout_price: imBuyBid,
        },
        function (data) {
          const result = JSON.parse(data);
          if (result.success == 1) {
            $('#aucAnswer')
              .removeClass(
                'hidden post-upload__answer--error post-upload__answer--success'
              )
              .addClass('post-upload__answer--success')
              .text('Success!');
            postToggle(postState);
          } else {
            $('#aucAnswer')
              .removeClass(
                'hidden post-upload__answer--error post-upload__answer--success'
              )
              .addClass('post-upload__answer--error')
              .text(result.error);
          }
        }
      );
    }
  }
};

$('.btn-submit').click(auctionModalToggle);

$('.post-upload__list');
$.post('../../../scripts/getUserDrewInfo.php', {}, function (data) {
  const result = JSON.parse(data);
  const stats = result.data;
  if (result.success == 1) {
    generatePaintingList(stats);
  } else {
    alert('Произошла непредвиденная ошибка!');
  }
});

$('#createAuctionBtn').click(submitForm);

const clearModalPost = function () {
  $('#postModal').empty();
};

const clearBetModalPost = function () {
  $('#postBetModal').empty();
};

const generatePost = function (dataset, postInform) {
  const paintId = dataset.paintingid;
  const authorId = dataset.authorid;

  let dataDiv = $(`.post-data-containerpost-${paintId}`)[0].dataset;

  let postParent = $('#postModal');

  let postContainer = $('<div>').addClass('post-modal__container');
  let postContent = $('<div>').addClass('post-modal__content');
  let postParagraph = $('<p>');
  let postName = $('<span>')
    .text(dataDiv.postname)
    .addClass('post-modal__name');
  let postStyle = $('<span>').text(dataDiv.style).addClass('post-modal__style');
  let postFigure = $('<figure>').addClass('post-modal__img-back');
  postFigure.click(function () {
    let url = '../../../publication/HTML/publication.html?id=' + paintId;
    window.open(url, '_blank');
  });
  let postImg = $('<img>').attr('src', dataDiv.imgsource);
  let postDescription = $('<div>').addClass('post-modal__description');
  let postHeader = $('<div>').addClass('post-modal__header');
  let postAuthorImg = $('<img>')
    .addClass('post-modal__profile-img')
    .attr('src', postInform.authorImage)
    .click(function () {
      let url = '../../../profile/HTML/profile.html?id=' + authorId;
      window.open(url, '_blank');
    });
  let postHeader2 = $('<h2>')
    .text(dataDiv.authorlogin)
    .addClass('post-modal__heading');
  let postParagraph2 = $('<p>')
    .addClass('post-modal__info post-modal__info--description')
    .text(postInform.description);
  let postInfo = $('<ul>').addClass('post-modal__info post-modal__info--info');
  let postItem1 = $('<li>').text('from:');
  let postText1 = $('<span>')
    .addClass('post-modal-data mrg-small-left')
    .text(dataDiv.start);
  let postItem2 = $('<li>').text('to:');
  let postText2 = $('<span>')
    .addClass('post-modal-data mrg-small-left')
    .text(dataDiv.end);
  let postItem3 = $('<li>').text('sold for:');
  let postText3 = $('<span>')
    .addClass('post-modal-data mrg-small-left')
    .text(dataDiv.soldfor);
  let postItem4 = $('<li>').text('bought by:');
  let postText4 = $('<span>')
    .addClass('post-modal-data mrg-small-left')
    .text(dataDiv.boughtbuy);

  postParagraph.append(postName, postStyle);
  postFigure.append(postImg);
  postContent.append(postParagraph, postFigure);
  postHeader.append(postAuthorImg, postHeader2);
  postItem1.append(postText1);
  postItem2.append(postText2);
  postItem3.append(postText3);
  postItem4.append(postText4);
  postInfo.append(postItem1, postItem2, postItem3, postItem4);
  postDescription.append(postHeader, postParagraph2, postInfo);
  postContainer.append(postContent, postDescription);
  postParent.append(postContainer);
};

const createBet = function (event) {
  const auction_id = Number($('#postBetModal')[0].dataset.auction);
  event.preventDefault();

  const bet = Number(event.target[0].value).toFixed(2);
  const is_buyout = 0;
  $.post(
    '../../../scripts/doBet.php',
    { auction_id: auction_id, bet: bet, is_buyout: is_buyout },
    function (data) {
      console.log(data);
      const result = JSON.parse(data);
      if (result.success == 1) {
        $('.post-modal__answer')
          .removeClass(
            'hidden post-modal__answer--error post-modal__answer--success'
          )
          .addClass('post-modal__answer--success')
          .text('Success!');
      } else {
        $('.post-modal__answer')
          .removeClass(
            'hidden post-modal__answer--error post-modal__answer--success'
          )
          .addClass('post-modal__answer--error')
          .text(result.error);
      }
    }
  );
};

const imAuctionBuy = function () {
  const auction_id = Number($('#postBetModal')[0].dataset.auction);
  const is_buyout = 1;
  // const bet = Number($('#betBuyOut').innerText).toFixed(2);
  const bet = Number($('#betBuyOut')[0].innerText).toFixed(2);
  console.log(bet);
  $.post(
    '../../../scripts/doBet.php',
    { auction_id: auction_id, bet: bet, is_buyout: is_buyout },
    function (data) {
      const result = JSON.parse(data);
      if (result.success == 1) {
        $('.post-modal__answer')
          .removeClass(
            'hidden post-modal__answer--error post-modal__answer--success'
          )
          .addClass('post-modal__answer--success')
          .text('Success!');
        loadPosts();
      } else {
        $('.post-modal__answer')
          .removeClass(
            'hidden post-modal__answer--error post-modal__answer--success'
          )
          .addClass('post-modal__answer--error')
          .text(result.error);
      }
    }
  );
};

const generateBetPost = function (dataset, postInform) {
  const paintId = dataset.paintingid;
  const authorId = dataset.authorid;
  const auctionId = dataset.auctionid;

  let dataDiv = $(`.post-data-containerbet-${paintId}`)[0].dataset;

  let postParent = $('#postBetModal').attr('data-auction', auctionId);

  let postContainer = $('<div>').addClass('post-modal__container');
  let postContent = $('<div>').addClass('post-modal__content');
  let postParagraph = $('<p>');
  let postName = $('<span>')
    .text(dataDiv.postname)
    .addClass('post-modal__name');
  let postStyle = $('<span>').text(dataDiv.style).addClass('post-modal__style');
  let postFigure = $('<figure>').addClass('post-modal__img-back');
  postFigure.click(function () {
    let url = '../../../publication/HTML/publication.html?id=' + paintId;
    window.open(url, '_blank');
  });
  let postImg = $('<img>').attr('src', dataDiv.imgsource);
  let postDescription = $('<div>').addClass('post-modal__description');
  let postHeader = $('<div>').addClass('post-modal__header');
  let postAuthorImg = $('<img>')
    .addClass('post-modal__profile-img')
    .attr('src', postInform.authorImage)
    .click(function () {
      let url = '../../../profile/HTML/profile.html?id=' + authorId;
      window.open(url, '_blank');
    });
  let postHeader2 = $('<h2>')
    .text(dataDiv.authorlogin)
    .addClass('post-modal__heading');
  let postParagraph2 = $('<p>')
    .addClass('post-modal__info post-modal__info--description')
    .text(postInform.description);
  let postInfo = $('<ul>').addClass('post-modal__info post-modal__info--info');
  let postItem1 = $('<li>').text('from:');
  let postText1 = $('<span>')
    .addClass('post-modal-data mrg-small-left')
    .text(dataDiv.start);
  let postItem2 = $('<li>').text('to:');
  let postText2 = $('<span>')
    .addClass('post-modal-data mrg-small-left')
    .text(dataDiv.end);
  let postItem3 = $('<li>').text('buy now for:');
  let postText3 = $('<span>')
    .addClass('post-modal-data mrg-small-left')
    .attr('id', 'betBuyOut')
    .text(dataDiv.buyoutprice);
  let postItem4;
  let postText4;
  let postForm = $('<form>').submit(function (event) {
    createBet(event);
  });
  let postFormButton = $('<button>')
    .addClass('btn-post btn-post--orange mrg-small-top')
    .attr('id', 'buyNowButton')
    .text('Buy now')
    .click(imAuctionBuy);
  let postFormButton2 = $('<button>')
    .addClass('btn-post btn-post--orange')
    .attr('id', 'betButton')
    .text('Place a bet');
  let postFormInput = $('<input>')
    .attr('type', 'number')
    .attr('id', 'betInput')
    .attr('placeholder', 'Your bet')
    .attr('step', '0.01')
    .attr('max', dataDiv.buyoutprice)
    .attr('required', 'required');
  if (dataDiv.bet == 0) {
    postItem4 = $('<li>').text('start bet:');
    postText4 = $('<span>')
      .addClass('post-modal-data mrg-small-left')
      .text(dataDiv.startprice);
    postFormInput.attr('min', (Number(dataDiv.startprice) + 0.01).toFixed(2));
  } else {
    postItem4 = $('<li>').text('current bet:');
    postText4 = $('<span>')
      .addClass('post-modal-data mrg-small-left')
      .text(dataDiv.bet);
    postFormInput.attr('min', (Number(dataDiv.bet) + 0.01).toFixed(2));
  }
  let postFormAnswer = $('<div>')
    .addClass('post-modal__answer hidden')
    .text('Something went wrong!');
  postForm.append(postFormInput, postFormButton2);
  postParagraph.append(postName, postStyle);
  postFigure.append(postImg);
  postContent.append(postParagraph, postFigure);
  postHeader.append(postAuthorImg, postHeader2);
  postItem1.append(postText1);
  postItem2.append(postText2);
  postItem3.append(postText3);
  postItem4.append(postText4);
  postInfo.append(postItem1, postItem2, postItem3, postItem4);
  postDescription.append(
    postHeader,
    postParagraph2,
    postInfo,
    postFormButton,
    postForm,
    postFormAnswer
  );
  postContainer.append(postContent, postDescription);
  postParent.append(postContainer);
};
