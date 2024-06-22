const articlesPerPage = 5;
let currentPage = 1;
const list = document.getElementById('article-list');
const items = list.getElementsByTagName('li');
const totalPages = Math.ceil(items.length / articlesPerPage);

function showPage(page) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;

    for (let i = 0; i < items.length; i++) {
        items[i].classList.add('hidden');
    }

    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    for (let i = start; i < end; i++) {
        if (items[i]) {
            items[i].classList.remove('hidden');
        }
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// Mostrar la primera página al cargar el documento
document.addEventListener('DOMContentLoaded', (event) => {
    showPage(currentPage);
    const listItems = document.querySelectorAll('#article-list li');
    listItems.forEach(li => {
        const separator = document.createElement('img');
        separator.src = './separador.png';
        separator.classList.add('separator');
        li.appendChild(separator);
    });
});