'use strict';
let notificationCheck = 'no';

setInterval(async function () {
  await $.post(
    '../../../scripts/checkNewNotifications.php',
    {},
    function (response) {
      response = JSON.parse(response);
      const messageData = response.data;
      if (response.success == 1) {
        if (messageData == 'yes') {
          notificationCheck = messageData;
          getNotifications();
        }
      }
    }
  );
}, 3000);

/*
<ul class="notif-dropdown__container">
	<li class="notif-dropdown__item">
		<p>
			<span class="mrg-small-right">login</span>liked you painting
		</p>
		<img
			src="./img/posts/post1.png"
			alt="Notification user-image"
		/>
	</li>
</ul> 
*/

const clearNotifications = function () {
  $('.notif-dropdown__container').empty();
};

const changeToChecked = function () {
  $('.nav__notif-icon')
    .removeClass('nav__notif-icon--checked nav__notif-icon--unchecked')
    .addClass('nav__notif-icon--checked');
};

const changeToUnchecked = function () {
  $('.nav__notif-icon')
    .removeClass('nav__notif-icon--checked nav__notif-icon--unchecked')
    .addClass('nav__notif-icon--unchecked');
};

const createNotifications = function (message) {
  if (notificationCheck == 'no') {
    changeToChecked();
  } else {
    changeToUnchecked();
    $('.nav__notif-icon').click(changeToChecked);
  }
  const notificationContainer = $('.notif-dropdown__container');
  const notificationItem = $('<li>').addClass('notif-dropdown__item');
  const notificationParagraph = $('<p>').text(message.message);
  const notificationSpan = $('<span>').addClass('mrg-small-right');
  const notificationUserImage = $('<img>').attr('src', message.icon);
  notificationParagraph.append(notificationSpan);
  notificationItem.append(notificationParagraph, notificationUserImage);
  notificationContainer.append(notificationItem);
};

const getNotifications = async function () {
  await $.post(
    '../../../scripts/getNotifications.php',
    {},
    function (response) {
      response = JSON.parse(response);
      const messageData = response.data;
      if (response.success == 1) {
        clearNotifications();
        $.each(messageData, function (i, message) {
          createNotifications(message);
        });
      }
    }
  );
};
getNotifications();
