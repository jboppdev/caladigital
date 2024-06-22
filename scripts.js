document.addEventListener('DOMContentLoaded', () => {
  const itemsPerPage = 5;
  let currentPage = 1;
  
  const listItems = document.querySelectorAll('#article-list li');
  const totalPages = Math.ceil(listItems.length / itemsPerPage);

  function showPage(page) {
      listItems.forEach((li, index) => {
          if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
              li.style.display = 'block';
          } else {
              li.style.display = 'none';
          }
      });
  }

  function updateButtons() {
      const prevButton = document.querySelector('button.prev');
      const nextButton = document.querySelector('button.next');
      
      if (prevButton && nextButton) {
          prevButton.disabled = currentPage === 1;
          nextButton.disabled = currentPage === totalPages;
      }
  }

  const prevButton = document.querySelector('button.prev');
  const nextButton = document.querySelector('button.next');
  
  if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
          if (currentPage > 1) {
              currentPage--;
              showPage(currentPage);
              updateButtons();
          }
      });

      nextButton.addEventListener('click', () => {
          if (currentPage < totalPages) {
              currentPage++;
              showPage(currentPage);
              updateButtons();
          }
      });
  }

  showPage(currentPage);
  updateButtons();

  // Add separators
  listItems.forEach(li => {
      const separator = document.createElement('img');
      separator.src = './separador.png';
      separator.alt = 'Separador';
      separator.classList.add('separator');
      li.appendChild(separator);
  });
});