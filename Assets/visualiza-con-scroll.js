console.log("El archivo visualiza-con-scroll.js ha sido cargado.");

document.addEventListener("DOMContentLoaded", function() {
    const contenedores = document.querySelectorAll('.contenedor-juego');

    // Función para verificar la posición de los divs al hacer scroll
    function checkDivPositions() {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        contenedores.forEach(contenedor => {
            const rect = contenedor.getBoundingClientRect();
            const divCenter = rect.top + (rect.height / 2);

            // Verificar si el centro del div está cerca del centro del viewport
            if (divCenter >= viewportCenter - 50 && divCenter <= viewportCenter + 50) {
                contenedor.classList.add('visible'); // Añadir clase visible
            } else {
                contenedor.classList.remove('visible'); // Quitar clase visible
            }
        });
    }

    // Escuchar el evento de scroll
    window.addEventListener('scroll', checkDivPositions);
    // Llamar la función al cargar la página para asegurar el estado inicial
    checkDivPositions();
});
