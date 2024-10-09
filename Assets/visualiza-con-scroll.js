console.log("El archivo visualiza-con-scroll.js ha sido cargado.");

document.addEventListener("DOMContentLoaded", function() {
    const contenedores = document.querySelectorAll('.contenedor-juego');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const rect = entry.boundingClientRect;

            // Verificamos si el div está intersectando con el viewport
            if (entry.isIntersecting) {
                // Altura del viewport dividida en 10 bloques
                const viewportHeight = window.innerHeight;
                const bloqueAltura = viewportHeight / 10;

                // Calculamos los bloques 4 y 6
                const bloque4 = bloqueAltura * 4;
                const bloque6 = bloqueAltura * 6;

                // Calculamos el centro del div
                const divCenter = rect.top + (rect.height / 2);

                // Si el centro del div está entre los bloques 4 y 6, lo hacemos visible
                if (divCenter >= bloque4 && divCenter <= bloque6) {
                    entry.target.classList.add('visible');  // Añadir clase visible
                } else {
                    entry.target.classList.remove('visible');  // Quitar clase visible si está fuera del rango
                }
            } else {
                // Si el div no está intersectando con el viewport, quitamos la clase visible
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0 // Observamos cualquier intersección, sin importar el porcentaje visible
    });

    // Observamos cada contenedor
    contenedores.forEach(contenedor => {
        observer.observe(contenedor);
    });
});