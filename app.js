let numeroSecreto = 0;
let intentos = 0;
let listaDeNumerosSorteados = [];
let numMax = 10;
let limiteDeJuegos = 3;
let juegosActuales = 0;

function asignarTextoElemento(elemento, texto) {
    let variable = document.querySelector(elemento);
    variable.innerHTML = texto;
}

/*
//Para que se pueda jugar hasta adivinar todos los números posibles del 1 al numMAx (número máximo posible)

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numMax) + 1;

    console.log(numeroGenerado);
    console.log(listaDeNumerosSorteados);
    //si ya sorteamos todos los números
    if(listaDeNumerosSorteados.lenght == numMax) {
        asignarTextoElemento('p', 'Ya se sortearon todo los números posibles');
    } else {
        //si el numero generado está en la lista...
        if(listaDeNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto ();
        } else {
            listaDeNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}
*/

//Para que solo se tenga un número limitado de números secretos que adivinar antes de que se llegue al num max

function validarLimiteDeJuegos() {
    if(juegosActuales >= limiteDeJuegos) {
        asignarTextoElemento('p', 'Llegaste al número máximo de juegos');
        return true;
    } else {
        return false;
    }
}

function generarNumeroSecreto() {

    if(validarLimiteDeJuegos()) return null;

    let numeroGenerado = Math.floor(Math.random() * numMax) + 1;

    if(listaDeNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto ();
    } else {
        listaDeNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function verificarIntento() {
    if(validarLimiteDeJuegos()) return;

    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value); //solo retornará el objeto, pero nosotros queremos el valor, por eso usamos el método value
 
    if(numeroUsuario === numeroSecreto) {
    //al usar triple igual (===), se compara el valor y el tipo de dato
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        juegosActuales++;
    } else {
        if(numeroUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
}

//la siguiente función es para limpiar la cajita de input. La invocamos en la función anterior para que se borre lo que usuario escribió después de intentar con un número
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = ''; //esta forma es como usar el getElementById, querySelector es genérico
}

function condicionesIniciales() {
    if(validarLimiteDeJuegos()) return;

    numeroSecreto = generarNumeroSecreto();
    intentos = 1;

    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numMax}`);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar de nuevo las instrucciones del juego, generar el número secrteto e inicializar el número de intentos
    condicionesIniciales();
    //Desabilitar el botón de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();