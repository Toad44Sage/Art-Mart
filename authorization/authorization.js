$(function () {
  $('.form_auth_style').on('submit', function (e) {
    e.preventDefault();

    let login = $('input[name="login"]').val();
    let password = $('input[name="password"]').val();
    let message = document.getElementById('message');

    const allowedChars = /^[A-Za-z0-9_]+$/;

    if (!allowedChars.test(login) || !allowedChars.test(password)) {
      message.style.display = 'block';
      message.classList.remove('error', 'warning');
      message.classList.add('warning');
      message.textContent =
        'Пожалуйста, используйте только допустимые символы в полях ввода';
      return;
    }

    $.ajax({
      url: '../scripts/login.php',
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: { login: login, password: password },
      success: function (response) {
        if (response.success == 1) {
          window.location.href = '../newsfeed/HTML/news.html';
        } else {
          message.style.display = 'block';
          message.classList.remove('error', 'warning');
          message.classList.add('error');
          message.textContent = response.error;
        }
      },
      error: function (xhr, status, error) {
        alert('Произошла ошибка при отправке запроса на сервер');
      },
    });
  });
});
