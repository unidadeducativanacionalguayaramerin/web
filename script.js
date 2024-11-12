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


// Seleccionar la barra de navegación
const navbar = document.querySelector('.navbar');

// Función para agregar o quitar la clase 'fixed'
window.addEventListener('scroll', () => {
    if (window.scrollY > 190) { // Cambia '100' por el número de píxeles después del cual quieres que la barra se fije
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Seleccionar todos los enlaces dentro del menú de navegación
const navLinksItems = document.querySelectorAll('.nav-links a');

// Agregar un evento de clic a cada enlace para cerrar el menú
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('show'); // Oculta el menú al hacer clic en un enlace
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Validación básica (ejemplo con credenciales ficticias)
    if (username === '13339107' && password === '8198134720112964') {
        // Redirigir a la página de calificaciones
        window.location.href = 'calificaciones.html';
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos.';
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const errorMessage = document.getElementById('formErrorMessage');
    const successMessage = document.getElementById('formSuccessMessage');

    // Validación básica
    if (name && email && message) {
        // Aquí puedes implementar la lógica para enviar el formulario, por ejemplo, con un servicio de correo o backend.
        // Simularemos el éxito:
        successMessage.textContent = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.";
        errorMessage.textContent = '';
        
        // Limpiar el formulario después de enviar
        document.getElementById('contactForm').reset();
    } else {
        successMessage.textContent = '';
        errorMessage.textContent = "Por favor, completa todos los campos.";
    }
});
