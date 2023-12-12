$(document).ready(function () {
  // функция для получения значения параметра из URL
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  // проверка, что элемент с идентификатором "profile-followers" существует на странице
  if ($("#profile-followers").length) {
    // при клике на элемент с идентификатором "profile-followers"
    $(document).on("click", "#profile-followers", function () {
      // получение id пользователя из URL
      let userId = getParameterByName("id");
      // добавление атрибута "data-user-id" к элементу
      $(this).attr("data-user-id", userId);
      // отправка ajax запроса для получения списка подписчиков
      $.ajax({
        url: "../../scripts/getFollowersInfo.php",
        type: "POST",
        data: { user_id: userId, limit: 10, offset: 0 },
        dataType: "json",
        success: function (response) {
          if (response.success == "1") {
            // заполнение списка подписчиков
            let followersList = $("#followers-list");
            followersList.empty();
            $.each(response.data, function (index, follower) {
              let listItem = $("<li>", {
                "data-user-id": response.data.follower.id,
                html:
                  "<img src='" +
                  follower.profile_picture +
                  "' alt='" +
                  follower.login +
                  "' style='width: 70px; height: 70px; display: block; margin-bottom: 10px;' />" +
                  follower.login,
              });
              // установка обработчика кликов на элементах списка подписчиков
              listItem.click(function () {
                // получение id пользователя
                let userId = $(this).attr("data-user-id");
                // перенаправление на страницу пользователя
                console.log(response.data.follower_id);
              });
              followersList.append(listItem);
            });
            // отображение модального окна
            $("#followers-modal").show();

            // проверка на наличие подписчиков
            if (response.data.length == 0) {
              $("#no-more-followers").show();
            } else {
              $("#no-more-followers").hide();
            }
          } else {
            // вывод сообщения об ошибке всплывающим окном
            alert(response.error);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // вывод сообщения об ошибке всплывающим окном
          alert("Ошибка при загрузке подписчиков: " + errorThrown);
        },
      });
    });
  }
  // закрытие модального окна
  $(document).on("click", ".close", function () {
    $("#followers-modal").hide();
    // отключение обработчика события прокрутки на элементе #followers-list
    $("#followers-list").off("scroll");
    // скрытие текста "Подписчиков больше нет"
    $("#no-more-followers").hide();
  });
});
