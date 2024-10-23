// Función para leer el archivo Excel
async function cargarPreciosDesdeExcel() {
    const response = await fetch('../Assets/ListaAlimPerros.xlsx'); // Ruta al archivo Excel
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const hoja = workbook.Sheets[workbook.SheetNames[0]]; // Obtener la primera hoja

    // Convertir la hoja a formato JSON
    const datosExcel = XLSX.utils.sheet_to_json(hoja, { header: 1 }); // Obtenemos las filas como arrays
    const precios = {};

    // Iterar por las filas para crear un objeto {producto: precio}
    datosExcel.forEach((fila) => {
        const producto = fila[0]; // Primer columna: nombre del producto
        const precio = fila[1]; // Segunda columna: precio del producto
        if (producto && precio) {
            precios[producto] = precio; // Asociamos el producto con su precio
        }
    });

    return precios;
}

// Función para asignar ID único y actualizar los precios
async function actualizarPrecios() {
    const precios = await cargarPreciosDesdeExcel(); // Obtener precios desde el Excel
    const items = document.querySelectorAll('.alim-item.item'); // Seleccionar todos los items de alimentos

    // Iterar por cada item
    items.forEach((item, index) => {
        // Asignar un ID único
        item.id = `alim-item-${index + 1}`;

        // Obtener el nombre del producto desde el atributo data-producto
        const producto = item.getAttribute('data-producto');

        // Verificar si el producto existe en el Excel
        if (precios[producto]) {
            // Actualizar el precio en el HTML
            const precioElemento = item.querySelector('.preciosProductos');
            precioElemento.textContent = `${precios[producto]}`; // Reemplazar texto con el precio
        }
    });
}

// Ejecutar la función cuando la página esté cargada
document.addEventListener('DOMContentLoaded', () => {
    actualizarPrecios();
});
