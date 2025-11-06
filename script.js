document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Menú Desplegable (Projects) ---
    const dropdownBtn = document.getElementById('projects-dropdown-btn');
    const dropdownMenu = document.getElementById('projects-menu');
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item'); 

    // Función para cerrar el menú
    const closeDropdown = () => {
        dropdownMenu.classList.remove('show');
    };

    // 1. Muestra/Oculta el menú
    dropdownBtn.addEventListener('click', function(event) {
        event.stopPropagation(); 
        dropdownMenu.classList.toggle('show');
    });

    // 2. Cierra el menú al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            closeDropdown();
        }
    });

    // 3. Cierra el menú al hacer clic en un enlace de sección
    dropdownItems.forEach(item => {
        item.addEventListener('click', closeDropdown);
    });

    // --- Lógica del Carrusel con Desplazamiento Automático al Hover ---
    function setupCarousel(wrapperId) {
        const wrapper = document.getElementById(wrapperId);
        if (!wrapper) return;
        
        const slides = wrapper.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return;
        let currentIndex = 0;
        let autoScrollInterval; 
        const scrollSpeed = 650; // Velocidad de desplazamiento rápido (300ms)

        
        const moveCarousel = () => {
            // Asegura que siempre use el ancho del primer slide para el desplazamiento
            const slideWidth = slides[0].offsetWidth; 
            wrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        };

        const nextSlide = () => {
            // Avanza al siguiente slide, o vuelve al primero (loop)
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0; 
            moveCarousel();
        };

        const prevSlide = () => {
            // Retrocede al slide anterior, o va al último (loop)
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1; 
            moveCarousel();
        };
        
        // Función para iniciar el desplazamiento automático
        const startAutoScroll = (direction) => {
            clearInterval(autoScrollInterval); 
            autoScrollInterval = setInterval(direction === 'next' ? nextSlide : prevSlide, scrollSpeed);
        };
        
        // Función para detener el desplazamiento automático
        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };


        // --- Eventos de MOUSE ENTER/LEAVE en los botones ---
        const nextBtn = wrapper.parentNode.querySelector('.next-btn');
        if (nextBtn) {
            // Inicia el desplazamiento automático al pasar el ratón (dirección 'next')
            nextBtn.addEventListener('mouseenter', () => startAutoScroll('next'));
            // Detiene el desplazamiento al salir
            nextBtn.addEventListener('mouseleave', stopAutoScroll);
        }

        const prevBtn = wrapper.parentNode.querySelector('.prev-btn');
        if (prevBtn) {
            // Inicia el desplazamiento automático al pasar el ratón (dirección 'prev')
            prevBtn.addEventListener('mouseenter', () => startAutoScroll('prev'));
            // Detiene el desplazamiento al salir
            prevBtn.addEventListener('mouseleave', stopAutoScroll);
        }

        // Inicializa el carrusel y lo ajusta al redimensionar la ventana
        window.addEventListener('resize', moveCarousel);
        window.addEventListener('load', moveCarousel);
        moveCarousel(); 
    }

    // --- Inicialización de TODOS los carruseles ---
    // Asegúrate de que los IDs coincidan con los de tu HTML.
    setupCarousel('backend-carousel-wrapper');
    setupCarousel('web-design-carousel-wrapper'); 
    setupCarousel('others-carousel-wrapper');     
});