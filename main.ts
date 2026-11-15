/**
 * ---------- Juego: esquivar la bomba ----------
 */
// cuánto tarda la bomba en bajar (nivel 1)
// Mueve la nave: -1 izquierda, +1 derecha
function moverNave (dir: number) {
    destino = navePos + dir
    if (destino >= 0 && destino <= 4) {
        navePos = destino
    }
}
// Se muestra cuando la bomba te atrapa y se reinicia todo
function finDelJuego () {
    basic.pause(400)
    basic.clearScreen()
    basic.showIcon(IconNames.Skull)
    basic.pause(2000)
    basic.clearScreen()
    control.reset()
}
input.onButtonPressed(Button.A, function () {
    moverNave(-1)
})
input.onButtonPressed(Button.B, function () {
    moverNave(1)
})
// Pausa entre cada paso de la bomba, según el nivel
function pausaDelNivel () {
    return pausaBase - (nivel - 1) * 50
}
// Muestra el nivel un momento antes de cada bomba
function avisarNivel () {
    basic.clearScreen()
    basic.showNumber(nivel)
    basic.pause(800)
}
// Una bomba baja desde arriba
function bajarBomba () {
    columnaBomba = randint(0, 4)
    while (fila <= 4) {
        basic.clearScreen()
        led.plot(navePos, 4)
        led.plot(columnaBomba, fila)
        if (fila == 4 && columnaBomba == navePos) {
            // te atrapó
            return true
        }
        basic.pause(pausaDelNivel())
        fila += 1
    }
    // la esquivaste
    return false
}
let fila = 0
let columnaBomba = 0
let destino = 0
let pausaBase = 0
let navePos = 0
let nivel = 0
nivel = 1
// columna donde está la nave (0 a 4)
navePos = 2
// cuánto tarda la bomba en bajar (nivel 1)
pausaBase = 400
basic.forever(function () {
    // solo mostramos el cartel al empezar el nivel 1
    if (nivel == 1) {
        avisarNivel()
    }
    if (bajarBomba()) {
        finDelJuego()
    }
    // la esquivó: sube de nivel, hasta el 5
    if (nivel < 5) {
        nivel += 1
    }
})
