'use strict';

let filterState = {
  limit: undefined,
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
        }
        filterPostList();
      }
    });
  } else {
    alert('Возникла непредвиденная ошибка!');
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

function filterPostList() {
  if (filterState.styles.length) {
    const data = {
      limit: mainShift.currentLen,
      painting: filterState.painting || undefined,
      author: filterState.author || undefined,
      styles: filterState.styles,
      bet_down: filterState.bet_down || undefined,
      bet_up: filterState.bet_up || undefined,
    };
    getFilteredPosts(data);
  } else {
    if (
      filterState.painting ||
      filterState.author ||
      (filterState.bet_down && filterState.bet_up)
    ) {
      const data = {
        limit: mainShift.currentLen,
        painting: filterState.painting || undefined,
        author: filterState.author || undefined,
        bet_down: filterState.bet_down || undefined,
        bet_up: filterState.bet_up || undefined,
      };
      console.log(filterState);
      getFilteredPosts(data);
    }
  }
}

const getFilteredPosts = function (data) {
  $.post('../../../scripts/filteringAuctions.php', data, function (response) {
    response = JSON.parse(response);
    console.log(response.data);
    if (postState === 1) {
    } else {
    }
  });
};
