'use strict';
/* <li>
<input type="checkbox" id="Aaaa" />
<label for="Aaaa">Aaaa</label>
</li> */

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
  } else {
    alert('Возникла непредвиденная ошибка!');
  }
});
