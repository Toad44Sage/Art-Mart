'use strict';

let isFilterActive = false;

let filterState = {
  painting: undefined,
  author: undefined,
  styles: [],
  bet_down: undefined,
  bet_up: undefined,
};

const initialState = { ...filterState };

const resetFilterState = function () {
  for (let key in filterState) {
    if (filterState.hasOwnProperty(key)) {
      filterState[key] = initialState[key];
    }
  }
};

function resetFilterActive() {
  isFilterActive = false;
}

const generateStyles = function (styles) {
  let styleContainer = $('#filter-style-list');

  $.each(styles, function (i, styles) {
    let item = $('<li>');
    let styleItem = $('<input>')
      .attr('type', 'checkbox')
      .attr('id', styles.name)
      .attr('data-id', styles.style_id);
    let styleLabel = $('<label>').attr('for', styles.name).text(styles.name);
    item.append(styleItem);
    item.append(styleLabel);
    styleContainer.append(item);
  });
};

$.post('../../../scripts/getStyles.php', {}, function (data) {
  let result = JSON.parse(data);
  if (result.success == 1) {
    generateStyles(result.data);
    // Отслеживаем изменения в чекбоксах
    $('input[type="checkbox"]').on('change', function () {
      let id = Number(this.dataset.id);
      if ($(this).is(':checked')) {
        filterState.styles.push(id);
        filterPostList();
      } else {
        let index = filterState.styles.indexOf(id);
        if (index > -1) {
          filterState.styles.splice(index, 1);
          filterPostList();
        }
      }
    });
  }
});

// Отслеживаем изменения в полях betFrom и betTo
$('#betFrom').on('input', function () {
  filterState.bet_down = Number($(this).val());
  filterPostList();
});

$('#betTo').on('input', function () {
  filterState.bet_up = Number($(this).val());
  filterPostList();
});

// Отслеживаем изменения в полях authorName и paintingName
$('#authorName').on('input', function () {
  filterState.author = $(this).val();
  filterPostList();
});

$('#paintingName').on('input', function () {
  filterState.painting = $(this).val();
  filterPostList();
});

let filterComplete;
let filterOngoing;

function filterPostList() {
  isFilterActive = true;
  if (filterState.styles && filterState.styles.length) {
    let data = {
      painting: filterState.painting || undefined,
      author: filterState.author || undefined,
      styles: filterState.styles,
      bet_down: filterState.bet_down || undefined,
      bet_up: filterState.bet_up || undefined,
    };
    getFilteredPosts(data).then(response => {
      if (postState === 1) {
        clearPosts();
        loadFilterPosts(response);
        filterOngoing = { ...data };
      } else {
        clearPosts();
        loadCompletedFilterPosts(response);
        filterComplete = { ...data };
      }
    });
  } else {
    if (
      filterState.painting ||
      filterState.author ||
      (filterState.bet_down && filterState.bet_up)
    ) {
      let data = {
        painting: filterState.painting || undefined,
        author: filterState.author || undefined,
        bet_down: filterState.bet_down || undefined,
        bet_up: filterState.bet_up || undefined,
      };
      getFilteredPosts(data).then(response => {
        if (postState === 1) {
          clearPosts();
          loadFilterPosts(response);
          filterOngoing = { ...data };
        } else {
          clearPosts();
          loadCompletedFilterPosts(response);
          filterComplete = { ...data };
        }
      });
    }
  }
}

function loadFilterPosts(response) {
  $.each(response.data.current_auctions, function (i, post) {
    generateMainAuctions(post, response.data.current_user_id);
  });
}

function loadCompletedFilterPosts(response) {
  $.each(response.data.completed_auctions, function (i, post) {
    generateCompletedAuctions(post, response.data.current_user_id);
  });
}

function getFilteredPosts(data) {
  return new Promise((resolve, object) => {
    $.post('../../../scripts/filteringAuctions.php', data, function (response) {
      response = JSON.parse(response);
      resolve(response);
    });
  });
}
