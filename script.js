const html = document.querySelector('html');
const botonComenzar = document.querySelector(".app_botones_enfoque");
const botonDescansar = document.querySelector(".app_botones_descansar");
const botonDescansoLargo = document.querySelector(".app_botones_descanso_largo");
const imagen = document.querySelector(".background_ballena");
const imagenOcultar = document.querySelector(".background_nube_derecha");
const titulo = document.querySelector(".app_contenido_titulo")
const textoContenido = document.querySelector(".app_contenido_texto");
const inputComenzarMusica = document.querySelector("#alternar-musica");
const musica = new Audio("sonidos/bts-piano.mp3");
const musicaFin = new Audio("sonidos/bts-fin.mp3");
const botonIniciarPausar = document.querySelector('#comenzar-pausar');
const iconoIniciarPausar = document.querySelector('.app_botones_comenzar_icono');
const tiempoEnPantalla = document.querySelector('#timer');
const modalOverlay = document.getElementById('modal-overlay');
const botonCerrarModal = document.getElementById('cerrar-modal');

let tiempoTranscurridoEnSeg = 1500;
let idIntervalo = null;

// Listeners
botonComenzar.addEventListener('click', () => {
    tiempoTranscurridoEnSeg = 1500;
    cambiarContexto('comenzar');
});

botonDescansar.addEventListener('click', () => {
    tiempoTranscurridoEnSeg = 5;
    cambiarContexto('descansar');
});

botonDescansoLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSeg = 1800;
    cambiarContexto('descansoLargo');
});

inputComenzarMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

botonIniciarPausar.addEventListener('click', iniciarPausar);

if (botonCerrarModal) {
    botonCerrarModal.addEventListener('click', cerrarModalFinTiempo);
}

// Funciones
function cambiarContexto(contexto) {
    mostrarTiempo();
    html.setAttribute('data-contexto', contexto);
    imagenOcultar.classList.add('oculto');
    textoContenido.classList.add('oculto');
    titulo.style.fontSize = '1.65rem';
    imagen.style.backgroundImage = `url('./imagenes/${contexto}.png')`;
    
    switch (contexto) {
        case "descansar":
            titulo.innerHTML = `Tómate un respiro, relájate y recarga energía.`;
            break;
        case "comenzar":
            titulo.innerHTML = `¡Es hora de concentrarte y dar lo mejor de ti!`;
            break;
        case "descansoLargo":
            titulo.innerHTML = `Es el momento perfecto para desconectar y revitalizarte.`;
            break;
        default:
            break;
    }
}

function reiniciarContexto(contexto) {
    mostrarTiempo();
    html.setAttribute('data-contexto', contexto);
    textoContenido.classList.remove('oculto');
    titulo.innerHTML = `Potencia tu enfoque`;
    titulo.style.fontSize = '2rem';
    imagen.style.backgroundImage = `url('./imagenes/ballena.png')`;
    imagenOcultar.classList.remove('oculto');
}

function cuentaRegresiva() {
    if (tiempoTranscurridoEnSeg <= 0) {
        musicaFin.play();
        reiniciar();
        mostrarModalFinTiempo();
        return;
    }
    tiempoTranscurridoEnSeg -= 1;
    mostrarTiempo();
}

function iniciarPausar() {
    if (idIntervalo) {
        reiniciar();
        return;
    }
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    iconoIniciarPausar.setAttribute('src', './imagenes/icono-pausa.png');
}

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    iconoIniciarPausar.setAttribute('src', './imagenes/icono-play.png');
}

function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSeg * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-AR', { minute: '2-digit', second: '2-digit' });
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

function mostrarModalFinTiempo() {
    if (modalOverlay) {
        modalOverlay.setAttribute('style', 'display: flex;');
    }
}

function cerrarModalFinTiempo() {
    if (modalOverlay) {
        modalOverlay.setAttribute('style', 'display: none;');
    }
    reiniciarContexto();
    musicaFin.pause();
}

mostrarTiempo();