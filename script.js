document.addEventListener('DOMContentLoaded', () => {

    // --- 1. COMPORTAMIENTO DEL HEADER (Efecto Delgado al hacer Scroll) ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // --- 2. DROPDOWN DE PROYECTOS EN EL NAVBAR ---
    const dropdownBtn = document.getElementById('projects-dropdown-btn');
    const dropdownMenu = document.getElementById('projects-menu');

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Cerrar menú si se hace clic fuera
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });
    }


    // --- 3. LÓGICA DE FILTRADO Y ORDENAMIENTO DE LA CARTELERA ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const sortSelect = document.getElementById('sort-select');
    const projectsGrid = document.getElementById('projects-grid');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));

    let currentFilter = 'all';

    // Función unificada para filtrar tarjetas (Versión corregida y ultra compatible)
    function filterProjects(filterValue) {
        currentFilter = filterValue;

        // Actualizar estados visuales de los botones de la barra
        filterBtns.forEach(btn => {
            if(btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Actualizar estados visuales del menú dropdown
        dropdownItems.forEach(item => {
            if(item.getAttribute('data-filter') === filterValue) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Mostrar u ocultar con compatibilidad estricta de Grid
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'flex';
                card.style.visibility = 'visible';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.visibility = 'hidden';
                card.style.opacity = '0';
            }
        });
    }

    // Eventos para botones de la barra de filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterProjects(btn.getAttribute('data-filter'));
        });
    });

    // Eventos para el menú desplegable del Navbar
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            filterProjects(item.getAttribute('data-filter'));
        });
    });

    // Función para Ordenar
    function sortProjects() {
        if (!sortSelect || !projectsGrid) return;
        
        const sortBy = sortSelect.value;
        
        const sortedCards = projectCards.sort((a, b) => {
            if (sortBy === 'recent') {
                return b.getAttribute('data-date') - a.getAttribute('data-date'); // Mayor a menor (Más nuevo)
            } else if (sortBy === 'oldest') {
                return a.getAttribute('data-date') - b.getAttribute('data-date'); // Menor a mayor (Más viejo)
            } else if (sortBy === 'alphabetical') {
                const titleA = a.getAttribute('data-title').toLowerCase();
                const titleB = b.getAttribute('data-title').toLowerCase();
                return titleA.localeCompare(titleB); // A - Z
            }
            return 0;
        });

        // Limpiar el contenedor y reinsertar las tarjetas ordenadas
        projectsGrid.innerHTML = '';
        sortedCards.forEach(card => projectsGrid.appendChild(card));
        
        // Re-aplicar el filtro activo después de reordenar
        filterProjects(currentFilter);
    }

    // Evento para el selector de ordenamiento
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProjects);
    }

    // Inicializar orden por defecto (Recientes primero)
    sortProjects();
});