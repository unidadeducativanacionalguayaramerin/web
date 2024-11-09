// Selecciona el contenedor de noticias y el botón de cargar más
const contenedorNoticias = document.getElementById('contenedor-noticias');
const botonCargarMas = document.getElementById('cargar-mas');

let noticias = []; // Variable para almacenar noticias
let indice = 0;    // Índice para mostrar noticias de forma progresiva

// Función para cargar noticias desde JSON
async function cargarNoticias() {
    try {
        const response = await fetch('noticias.json');
        noticias = await response.json();
        mostrarNoticias();
    } catch (error) {
        console.error("Error al cargar las noticias:", error);
    }
}

// Función para mostrar noticias
function mostrarNoticias() {
    const noticiasPorPagina = 2; // Cantidad de noticias a cargar cada vez
    const maxNoticias = indice + noticiasPorPagina;
    
    for (; indice < maxNoticias && indice < noticias.length; indice++) {
        const noticia = noticias[indice];
        const noticiaHTML = `
            <div class="noticia">
                <img src="${noticia.imagen}" alt="Imagen de evento">
                <div class="contenido-noticia">
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.resumen}</p>
                    <a href="${noticia.enlace}" class="boton-leer-mas">Leer más</a>
                </div>
            </div>
        `;
        contenedorNoticias.insertAdjacentHTML('beforeend', noticiaHTML);
    }

    // Ocultar el botón si no hay más noticias para cargar
    if (indice >= noticias.length) {
        botonCargarMas.style.display = 'none';
    }
}

// Cargar noticias al inicio
cargarNoticias();

// Evento para el botón "Cargar más noticias"
botonCargarMas.addEventListener('click', mostrarNoticias);
