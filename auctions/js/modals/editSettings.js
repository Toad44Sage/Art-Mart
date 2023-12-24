// запрос для редактирования данных

$('.pr-settings-modal form').submit(function (event) {
  event.preventDefault();

  let currPass = $('input[name="currPass"]').val();
  let newEmail = $('input[name="newEmail"]').val();
  let newPass = $('input[name="newPass"]').val();
  let repeatPass = $('input[name="repeatPass"]').val();

  const allowedChars = /^[A-Za-z0-9_]+$/;

  if (!allowedChars.test(currPass)) {
    alert('Пожалуйста, используйте только допустимые символы в полях ввода');
    return;
  }

  if (newPass.trim() !== '' && !allowedChars.test(newPass)) {
    alert('Пожалуйста, используйте только допустимые символы в полях ввода');
    return;
  }

  if (newPass === repeatPass) {
    $.post(
      '../../scripts/changeSecurityData.php',
      { password: currPass, new_password: newPass, email: newEmail },
      function (answer) {
        const response = JSON.parse(answer);
        if (response.success == 1) {
          $('input[name="currPass"]').val('');
          $('input[name="newEmail"]').val('');
          $('input[name="newPass"]').val('');
          $('input[name="repeatPass"]').val('');
          $('.pr-settings-modal__ans')
            .removeClass(
              'pr-settings-modal__ans--success pr-settings-modal__ans--error'
            )
            .addClass('pr-settings-modal__ans--success')
            .text(response.success);
        } else {
          $('input[name="currPass"]').val('');
          $('.pr-settings-modal__ans')
            .removeClass(
              'pr-settings-modal__ans--success pr-settings-modal__ans--error'
            )
            .addClass('pr-settings-modal__ans--error')
            .text(response.error);
        }
      }
    );
  } else {
    alert('Пароли не совпадают');
    return;
  }
});
