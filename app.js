document.addEventListener(
    'DOMContentLoaded', 
    () => {
  let cells = 
      document.querySelectorAll('td[data-value]');
  cells.forEach(function (cell) {
      let input = 
          document.createElement('input');
      input.type = 'text';
      input.value = cell.dataset.value;
      cell.innerHTML = '';
      cell.appendChild(input);
  });
});