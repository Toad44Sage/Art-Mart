$(document).ready(function () {
  $(".form_auth_style").on("submit", function (e) {
    e.preventDefault();


    let email = $('input[name="email"]').val();
    let login = $('input[name="login"]').val();
    let password = $('input[name="password"]').val();

    let message = document.getElementById('message');

    const allowedChars = /^[A-Za-z0-9_]+$/;

    if (!allowedChars.test(login) || !allowedChars.test(password)) {
      message.style.display = 'block';
      message.classList.remove("error");
      message.classList.add("warning");
      message.textContent = "Пожалуйста, используйте только допустимые символы в полях ввода";
      return;
    }


    $.ajax({
      url: "../scripts/registration.php",
      type: "POST",
      cache: false,
      dataType: "json",
      data: { login: login, password: password, email: email },
      success: function (response) {

        if (response.success == 1) {
          message.style.display = 'block';
          message.classList.remove("error", "warning");
          message.classList.add("success");
          message.textContent = "Регистрация прошла успешно";
          window.setTimeout(function(){
            window.location.href = "../newsfeed/HTML/news.html";}, 2000);
        }
        else {
          message.classList.remove("warning", "success");
          message.classList.add("error");
          message.textContent = response.error;
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText + status + error);
        alert("Произошла ошибка при отправке запроса на сервер");
      },
    });
  });
});
