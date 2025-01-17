const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const resolution = 20
let margin = 5
document.body.style.margin = `${margin}px`
canvas.height = document.body.scrollHeight - margin * 2
canvas.width = document.body.scrollWidth - margin * 2
const COLS = Math.round(canvas.width / resolution)
const ROWS = Math.round(canvas.height / resolution)
let mode = 'run'
let buttonBarIsOpen = false
let buttons = [
    ['≡', 'buttonPress()'],
    ['отчистить', "buttonsFunctions('c'), buttonPress()"],
    ['рандомно заполнить', "buttonsFunctions('r'), buttonPress()"],
    ['остановить или запустить', "buttonsFunctions('s'), buttonPress()"]
]
let button_pressed = false

let cells = []
for (let i = 0; i < COLS; i++) {
    let otv = []
    for (let j = 0; j < ROWS; j++) {
        otv.push(0)
    }
    cells.push(otv)
}

function setPixel(event) {
    if (mode != 'run') {
        const x = event.clientX
        const y = event.clientY

        cells[Math.floor(x / resolution)][Math.floor(y / resolution)] = 1
    }
}
document.addEventListener('mousedown', setPixel);

function deletePixel(event) {
    if (mode != 'run') {
        const x = event.clientX
        const y = event.clientY

        cells[Math.floor(x / resolution)][Math.floor(y / resolution)] = 0
    }
}
document.addEventListener('contextmenu', deletePixel)

function near(pos) {
    const system = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    let count = 0
    for (let k = 0; k < system.length; k++) {
        const [dx, dy] = system[k]
        let x = pos[0] + dx
        let y = pos[1] + dy

        if (x == -1) {
            x = COLS - 1
        } else if (x == COLS) {
            x = 0
        }

        if (y == -1) {
            y = ROWS - 1
        } else if (y == ROWS) {
            y = 0
        }

        if (x >= 0 && x < COLS && y >= 0 && y < ROWS && cells[x][y]) {
            count++
        }
    }
    return count
}


addEventListener('keypress', (event) => {
    let key = event.key
    if (key == 's') {
        if (mode == 'run') {
            mode = 'stop'
            console.log('stop')
        } else {
            mode = 'run'
            console.log('run')
        }
    } else if (key == 'r') {
        cells = [];
        for (let i = 0; i < COLS; i++) {
            let otv = []
            for (let j = 0; j < ROWS; j++) {
                otv.push(Math.round(Math.random()))
            }
            cells.push(otv)
        }
    } else if (key == 'c') {
        cells = [];
        for (let i = 0; i < COLS; i++) {
            let otv = [];
            for (let j = 0; j < ROWS; j++) {
                otv.push(0)
            }
            cells.push(otv)
        }
    }
}, true)
function buttonsFunctions(info) {
    if (info == 's') {
        if (mode == 'run') {
            mode = 'stop'
            console.log('stop')
        } else {
            mode = 'run'
            console.log('run')
        }
    } else if (info == 'r') {
        cells = [];
        for (let i = 0; i < COLS; i++) {
            let otv = []
            for (let j = 0; j < ROWS; j++) {
                otv.push(Math.round(Math.random()))
            }
            cells.push(otv)
        }
    } else if (info == 'c') {
        cells = [];
        for (let i = 0; i < COLS; i++) {
            let otv = [];
            for (let j = 0; j < ROWS; j++) {
                otv.push(0)
            }
            cells.push(otv)
        }
    }
}

function buttonPress() {
    const button = document.getElementById('buttons')
    if (buttonBarIsOpen) {
        button.innerHTML = `
        <button class="button" onclick="buttonPress()">≡</button>
        `
        buttonBarIsOpen = false
    } else {
        for (let i = 0; i < buttons.length; i ++) {
            button.innerHTML += `
            <button style="top: ${60 * i + 8}; width: 620;text-align: right;" class="button" onclick="${buttons[i][1]}">${buttons[i][0]}</button>
            `
        }
        buttonBarIsOpen = true
    }
}

setInterval(() => {
    let new_cells = []; // B3/S23
    for (let i = 0; i < COLS; i++) {
        let new_row = []
        for (let j = 0; j < ROWS; j++) {
            const count = near([i, j])
            if (mode == 'run') {
                if (cells[i][j] && (count == 2 || count == 3)) {
                    new_row.push(1)
                } else if (!cells[i][j] && count == 3) {
                    new_row.push(1)
                } else {
                    new_row.push(0)
                }
            } else {
                new_row.push(cells[i][j])
            }

            let color
            if (cells[i][j]) {
                if (count >= 0 && count <= 1) {
                    color = 'rgb(252, 135, 0)'
                } else if (count === 2 || count === 3) {
                    color = 'rgb(0, 184, 0)'
                } else {
                    color = 'rgb(250, 0, 0)'
                }
            } else {
                color = 'white'
            }

            ctx.beginPath()
            ctx.rect(i * resolution, j * resolution, resolution, resolution)
            ctx.fillStyle = color
            ctx.fill()
            ctx.stroke()
        }
        new_cells.push(new_row)
    }
    cells = new_cells
}, 100)
