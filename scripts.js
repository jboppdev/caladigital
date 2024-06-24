document.addEventListener('DOMContentLoaded', () => {
    
    const archiveToggle = document.querySelector('.archive-toggle');
    const archives = document.querySelector('.archives');

    // Verificar si estamos en un dispositivo móvil
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Añadir evento de click para toggle en móvil
    archiveToggle.addEventListener('click', () => {
        if (isMobile()) {
            archives.classList.toggle('visible');
        }
    });

    // Asegurarse de que el evento de click solo está activo en móvil
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            archives.classList.remove('visible'); // Asegurarse de que esté visible en pantallas grandes
        } else {
            archives.classList.add('visible'); // Resetear el estado en pantallas pequeñas
        }
    });

    const itemsPerPage = 5;
    let currentPage = 1;
    let scrollPosition = 0; // Variable para almacenar la posición de desplazamiento

    // Recuperar el estado guardado de localStorage
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        currentPage = parseInt(savedPage, 10);
    }

    // Recuperar la posición de desplazamiento guardada
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
        scrollPosition = parseInt(savedScrollPosition, 10);
    }

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
                // Guardar el estado en localStorage
                localStorage.setItem('currentPage', currentPage);
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
                updateButtons();
                // Guardar el estado en localStorage
                localStorage.setItem('currentPage', currentPage);
            }
        });
    }

    // Evento para guardar el estado antes de descargar la página
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('currentPage', currentPage);
        // Guardar la posición de desplazamiento actual
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    // Restaurar la posición de desplazamiento al cargar la página
    window.addEventListener('load', () => {
        window.scrollTo(0, scrollPosition);
    });

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

    // Evento para guardar el estado al hacer clic en el encabezado
    const header = document.querySelector('.header h1 a');
    if (header) {
        header.addEventListener('click', () => {
            localStorage.setItem('currentPage', currentPage);
            localStorage.setItem('scrollPosition', window.scrollY);
        });
    }


});