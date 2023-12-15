/* <div class="post post--ongoing">
  <figure class="post__img">
    <img
      src="./img/posts/post1.png"
      alt="Painting: Cat at the
	table"
    />
  </figure>
  <ul class="post__description">
    <li class="post__text">
      <h1 class="posts__heading">Name</h1>
    </li>
    <li class="post__text">author</li>
    <li class="post__text">style</li>
    <li class="post__text">date: 15.09.2023 - 25.09.2023</li>
    <li class="post__text">buy now for: 5000</li>
    <li class="post__text">current bet: 150</li>
    <li>
      <button class="btn-post btn-post--orange">Place a bet</button>
    </li>
  </ul>
</div>; */
const postsShift = {
  offset: 0,
  limit: 8,
};

const generateAuctionsPosts = function (post) {
  let mainContainer = $('.posts-container');

  let divBlock = $('<div>')
    .addClass('post')
    .attr('data-painting-id', post.painting_id)
    .attr('data-auction-id', post.auction_id)
    .attr('data-author-id', post.author_id);
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
  let postText6 = $('<li>').addClass('post__text').text(`${post.bet}`);
  let postText7 = $('<li>').addClass('post__text');
  let button = $('<button>')
    .addClass('btn-post btn-post--orange')
    .text('Place a bet');
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
  divBlock.append(figure, ul);
  mainContainer.append(divBlock);
};

// загружаю посты
const loadPosts = function () {
  $.post(
    '../../scripts/getCurrentAuctionList.php',
    { offset: postsShift.offset, limit: postsShift.limit },
    function (response) {
      response = JSON.parse(response);
      posts = response.data;
      console.log(posts);
      if (response.success == 1) {
        $.each(posts, function (i, post) {
          generateAuctionsPosts(post);
        });
        postsShift.offset += postsShift.limit;
      } else {
      }
    }
  );
};

loadPosts();
