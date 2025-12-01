document.addEventListener('DOMContentLoaded', () => {

    // --- 1. BASE DE DATOS SIMULADA (Array de Objetos) ---
    // Usamos las imágenes que mencionaste tener en assets/img/catalogo/
    const cursosData = [
        {
            id: 1,
            titulo: "Normas para Exportar",
            img: "../assets/img/catalogo/exportar.jpg", // Asegúrate que la ruta coincida
            descripcion: "Aprende los pasos esenciales, documentación y tratados para llevar tus productos al extranjero sin errores.",
            progresoTotal: 85,
            temas: [
                { nombre: "Documentación Básica", avance: 100 },
                { nombre: "Aranceles y Aduanas", avance: 80 },
                { nombre: "Tratados Internacionales", avance: 60 }
            ]
        },
        {
            id: 2,
            titulo: "Branding y Packaging",
            img: "../assets/img/catalogo/branding.jpg",
            descripcion: "Aprende los pasos esenciales, documentación y tratados para llevar tus productos al extranjero sin errores.",
            progresoTotal: 40,
            temas: [
                { nombre: "Diseño de Marca Global", avance: 100 },
                { nombre: "Empaques Sostenibles", avance: 20 },
                { nombre: "Etiquetado Internacional", avance: 0 }
            ]
        },
        {
            id: 3,
            titulo: "Marketing Digital",
            img: "../assets/img/catalogo/marketing.png",
            descripcion: "Aprende los pasos esenciales, documentación y tratados para llevar tus productos al extranjero sin errores.",
            progresoTotal: 10,
            temas: [
                { nombre: "Estrategia en Redes", avance: 30 },
                { nombre: "E-commerce B2B", avance: 0 },
                { nombre: "Publicidad Segmentada", avance: 0 }
            ]
        },
        // Puedes agregar más cursos aquí...
        {
            id: 4,
            titulo: "Logística y Envíos",
            img: "../assets/img/catalogo/logistica.jpg",
            descripcion: "Aprende los pasos esenciales, documentación y tratados para llevar tus productos al extranjero sin errores.",
            progresoTotal: 0,
            temas: [
                { nombre: "Tipos de transporte", avance: 0 },
                { nombre: "Incoterms 2024", avance: 0 }
            ]
        }
    ];

    // --- 2. RENDERIZAR LA GRILLA ---
    const container = document.getElementById('coursesContainer');

    if (container) {
        cursosData.forEach(curso => {
            const card = document.createElement('article');
            card.classList.add('course-card');

            // NOTA: Borramos la línea de "const pillsHTML = ..." porque ya no la usaremos.

            // Actualizamos el HTML interno de la tarjeta:
            card.innerHTML = `
                <div class="course-img-box">
                    <img src="${curso.img}" 
                         alt="${curso.titulo}" 
                         onerror="this.onerror=null; this.src='${curso.backupImg}';">
                </div>
                <h3 class="course-title">${curso.titulo}</h3>
                
                <p class="course-desc">
                    ${curso.descripcion}
                </p>
                <button class="btn-info" onclick="openCourseModal(${curso.id})">BTN INFO</button>
            `;

            container.appendChild(card);
        });
    }

    // --- 3. LÓGICA DEL MODAL (Sketch 2) ---
    const modal = document.getElementById('courseModal');
    const btnClose = document.getElementById('btnCloseModal');
    const modalBody = document.getElementById('modalBody');

    // Función Global para abrir el modal (necesaria para el onclick del HTML generado)
    window.openCourseModal = function(id) {
        // Buscar el curso en la "Base de Datos"
        const curso = cursosData.find(c => c.id === id);
        
        if(!curso) return;

        // Generar HTML de los temas (Barras de progreso)
        const temasHTML = curso.temas.map(tema => `
            <div class="topic-item">
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${tema.avance}%">
                        ${tema.nombre}
                    </div>
                    <span class="progress-text">${tema.avance}%</span>
                </div>
            </div>
        `).join('');

        // Inyectar contenido en el modal
        modalBody.innerHTML = `
            <div class="modal-top-row">
                <div class="modal-img-container">
                    <img src="${curso.img}" alt="${curso.titulo}">
                </div>
                <div class="modal-info-container">
                    <h2 class="modal-title">${curso.titulo}</h2>
                    
                    <div class="progress-container" style="height: 50px;">
                        <div class="progress-bar" style="width: ${curso.progresoTotal}%; background-color: #5A3660;">
                            PROGRESO GENERAL
                        </div>
                        <span class="progress-text">${curso.progresoTotal}%</span>
                    </div>
                </div>
            </div>

            <div class="modal-topics">
                <h3>Clases / Temas</h3>
                ${temasHTML}
            </div>
        `;

        // Mostrar Modal
        modal.style.display = 'flex';
    };

    // Cerrar Modal
    btnClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

});