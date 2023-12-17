'use strict';

const dropdownState = {
  'profile-dropdown': false,
  'notif-dropdown': false,
};

const dropdownToggle = function (clickName) {
  const dropdown = $(`.${clickName}`);
  dropdown.stop(true, true).slideToggle(200);
  dropdownState[`${clickName}`] = !dropdownState[`${clickName}`];
};

const dropdownClose = function (dropdownName) {
  const dropdown = $(`.${dropdownName}`);
  dropdown.stop(true, true).slideUp(100);
  dropdownState[`${dropdownName}`] = !dropdownState[`${dropdownName}`];
};

const modalItems = ['nav__lisa-icon', 'profile-dropdown__settings'];
const dropdownItems = ['notif-dropdown', 'profile-dropdown'];

for (let key in modalItems) {
  document
    .querySelector(`.${modalItems[key]}`)
    .addEventListener('click', modalToggle);
}

let hoverTimeOut;
$('.nav__profile-pic').click(() => {
  if (dropdownState['notif-dropdown'] == true) {
    dropdownClose('notif-dropdown');
  }
  dropdownToggle('profile-dropdown');
});

$('.nav__notif-icon').click(() => {
  if (dropdownState['profile-dropdown'] == true) {
    dropdownClose('profile-dropdown');
  }
  dropdownToggle('notif-dropdown');
});

// клик по log out

$('.profile-dropdown').on('click', '.profile-dropdown__exit', function () {
  $.post('../../scripts/logout.php', {}, function () {
    location.reload();
  });
});
$.post('../../../scripts/getUserHeadInfo.php', {}, function (data) {
  const result = JSON.parse(data);
  const stats = result.data;
  if (result.success == 1) {
    $('#balanceCount').text(stats.balance);
    $('#balanceTopUp').text(stats.balance);
    $('.nav__profile-pic').attr('src', stats.profile_picture);
  } else {
    alert('Пожалуйста, выполните вход в аккаунт');
    window.location.href = '../../main/main.html';
  }
});

const topUpBalance = function () {
  const inputValue = Number($('#balanceInput')[0].value);
  $.post(
    '../../../scripts/addBalance.php',
    { add: inputValue },
    function (data) {
      const result = JSON.parse(data);
      const stats = result.data;
      if (result.success == 1) {
        $('#balanceCount').text(stats.balance);
        $('#balanceTopUp').text(stats.balance);
      } else {
        alert('Что-то пошло не так!');
      }
    }
  );
};
$('#addBalance').click(topUpBalance);
