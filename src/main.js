// Se importa phaser y los estados o escenas
import Phaser from'phaser';
import BootScene from './scenes/Boot';
// import SimpleBodyScene from './scenes/examples/SimpleBody';
// import Geom1Scene from './scenes/examples/Geom1';
// import GameScene from "./scenes/examples/GameScene";
import MarioStyleScene from './scenes/examples/MarioStyle';

let game;

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById('game'),
    width: 800,
    height: 600,
    scene: [
        BootScene,
        MarioStyleScene
    ]
};

function resize() {
    // OBTENER EL ID GAME DE INDEX.HTML
    var canvas = document.getElementById('game');
    // OBTENER LA ANCHURA Y EL ALTO DE LA VENTANA
    var windowWidth = window.innerWidth;
    console.log('windows width: ' + windowWidth)
    var windowHeight = window.innerHeight;
    console.log('windows height: ' + windowHeight)
    // DIVIDIDO LA ANCHURA Y LA ALTURA DE LA VENTANA
    var windowRatio = windowWidth / windowHeight;
    console.log('window ratio: ' + windowRatio);
    // DIVIDIDO LA ANCHURA Y LA ALTURA DEL JUEGO
    var gameRatio = game.config.width / game.config.height;
    console.log('game ratio: ' + gameRatio);
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + 'px'; // se le pasa el valor del width al canvas
        canvas.style.height = (windowWidth / gameRatio) + 'px'; // PARA MANTENER EL ASPECTO SEGUN EL WIDTH
        //SI SUPERA EL TAMAÑO
    } else {
        canvas.style.width = (windowHeight * gameRatio) + 'px';
        canvas.style.height = windowHeight + 'px'; // se le pasa el valor del height
    }
}

window.onload = function() {
    game = new Phaser.Game(config);

    //Llama a la funcion
    resize();
    //Evento que llama cada que cambia de tamaño el navegador
    window.addEventListener('resize', resize, false);
}
