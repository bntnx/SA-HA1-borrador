document.addEventListener('DOMContentLoaded', () => {
    
    // --- Referencias a elementos del DOM ---
    const modal = document.getElementById('reviewModal');
    const btnOpen = document.getElementById('btnOpenModal');
    const btnClose = document.getElementById('btnCloseModal');
    const form = document.getElementById('reviewForm');
    const container = document.getElementById('reviewsContainer');

    // 1. ABRIR Y CERRAR MODAL
    if(btnOpen && modal && btnClose) {
        btnOpen.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        btnClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Cierra si haces clic en el fondo oscuro
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // 2. CARGAR RESEÑAS GUARDADAS (LocalStorage)
    loadSavedReviews();

    // 3. PROCESAR EL FORMULARIO
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Obtener valores
            const name = document.getElementById('inputName').value;
            const text = document.getElementById('inputText').value;
            const rating = document.getElementById('inputRating').value;

            // Crear objeto con los datos
            const newReview = {
                id: Date.now(), // ID único
                name: name,
                text: text,
                rating: rating
            };

            // Guardar en navegador
            saveReviewToStorage(newReview);

            // Crear la tarjeta en pantalla
            createReviewCard(newReview);

            // Limpiar formulario y cerrar modal
            form.reset();
            modal.style.display = 'none';
            alert('¡Publicación creada exitosamente!');
        });
    }

    // --- FUNCIONES AUXILIARES ---

    function saveReviewToStorage(review) {
        // Trae lo que ya hay o empieza un array vacío
        let reviews = JSON.parse(localStorage.getItem('exportify_reviews')) || [];
        reviews.push(review);
        // Guarda de vuelta
        localStorage.setItem('exportify_reviews', JSON.stringify(reviews));
    }

    function loadSavedReviews() {
        let reviews = JSON.parse(localStorage.getItem('exportify_reviews')) || [];
        // Crea una tarjeta por cada reseña guardada
        reviews.forEach(review => createReviewCard(review));
    }

    function createReviewCard(review) {
        const article = document.createElement('article');
        article.classList.add('review-card');

        // Generar estrellitas
        let starsHTML = '';
        for (let i = 0; i < review.rating; i++) {
            starsHTML += '★';
        }

        // Avatar automático con iniciales (servicio gratuito ui-avatars)
        // Usamos background=random para que salgan colores diferentes
        const avatarUrl = `https://ui-avatars.com/api/?name=${review.name}&background=random&color=fff&size=128`;

        article.innerHTML = `
            <div class="card-img-placeholder">
                <img src="${avatarUrl}" alt="${review.name}">
            </div>
            <div class="stars">${starsHTML}</div>
            <div class="dashed-line"></div>
            <p class="review-excerpt">"${review.text}"</p>
            <p class="review-author">Por: <strong>${review.name}</strong></p>
            <button class="btn-view">Ver Publicación</button>
        `;

        // Agrega la tarjeta al final del contenedor
        container.appendChild(article);
    }
});