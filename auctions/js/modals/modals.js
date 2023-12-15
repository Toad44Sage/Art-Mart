'use strict';
// auction-upload-modal

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
    $('.post-upload__error')
      .removeClass('hidden')
      .text('Вы не выбрали картину!');
  } else {
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
          const stats = result.data;
          if (result.success == 1) {
            $('#aucAnswer')
              .removeClass(
                'hidden post-upload__answer--error post-upload__answer--success'
              )
              .addClass('post-upload__answer--success')
              .text('Success!');
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

$('.btn-submit').click(modalToggle);

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
