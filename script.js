const background = document.querySelector('html');
const image = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const botones = document.querySelectorAll('.app__card-button')
const botonMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar =  document.querySelector('#start-pause');
const textoBotonIniciarPausar =  document.querySelector('#start-pause span');
const iconoBotonIniciarPausar =  document.querySelector('.app__card-primary-button-icon');
const sonidoPlay = new Audio('./sonidos/play.wav');
const sonidoPause = new Audio('./sonidos/pause.mp3');
const sonidoFinish = new Audio('./sonidos/beep.mp3');
const temporizador = document.querySelector('#timer');


let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    personalizarModo('enfoque');
    botonEnfoque.classList.add('active');
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    personalizarModo('descanso-corto');
    botonCorto.classList.add('active');
})

botonLargo.addEventListener('click', () => { 
    tiempoTranscurridoEnSegundos = 900;
    personalizarModo('descanso-largo');
    botonLargo.classList.add('active');
})

function personalizarModo (modo) {
    mostrarTiempo();
    botones.forEach( (modo) => modo.classList.remove('active'))

    background.setAttribute('data-contexto', modo);
    image.setAttribute('src', `./imagenes/${modo}.png`);

    switch (modo) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa</strong>`;
            break;
        case 'descanso-corto':
            titulo.innerHTML = `¿Qué tal tomar un respiro?,<br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>`;
            break;
        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie,<br>
                <strong class="app__title-strong">¡Haz una pausa larga!</strong>`;
            break;
        default:
            break;
    }
}

function configurarBotonMusica(musica, botonMusica) {
    // Configura el bucle para que la música se repita automáticamente
    musica.loop = true;
    
    // Añade el evento para reproducir o pausar la música cuando cambie el estado del botón
    botonMusica.addEventListener('change', () => {
        if (musica.paused) {
            musica.play();
        } else {
            musica.pause();
        }
    });
}

configurarBotonMusica(musica, botonMusica);

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0) {
        sonidoFinish.play();
        alert('El ciclo ha terminado');
        reiniciarTemporizador()
        return;
    }
    textoBotonIniciarPausar.textContent = 'Pausar';
    iconoBotonIniciarPausar.setAttribute('src', '/imagenes/pause.png');
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
}


botonIniciarPausar.addEventListener('click', inciarPausarTemporizador);

function inciarPausarTemporizador(){
    if(idIntervalo){
        sonidoPause.play();
        reiniciarTemporizador();
        return;
    } 
    sonidoPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function reiniciarTemporizador(){
    clearInterval(idIntervalo);
    idIntervalo = null;
    iconoBotonIniciarPausar.setAttribute('src', '/imagenes/play_arrow.png');
    textoBotonIniciarPausar.textContent = 'Comenzar';
}


function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second:'2-digit'})
    temporizador.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();