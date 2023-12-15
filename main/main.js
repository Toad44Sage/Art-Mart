const checkAuthorization = function () {
  $.post('../scripts/authorizationcheck.php', {}, function (answer) {
    if (answer) {
      console.log(answer);
      response = JSON.parse(answer).status;

      if (!response) {
        window.location.href = '../authorization/Authorization.html';
      }
    } else {
      window.location.href = '../newsfeed/HTML/news.html';
    }
  });
};

$('#loginButton').click(checkAuthorization);
