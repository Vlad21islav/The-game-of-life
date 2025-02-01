const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let margin = 5
document.body.style.margin = `${margin}px`
canvas.height = Math.round(document.body.scrollHeight - margin * 2)
canvas.width = Math.round(document.body.scrollWidth - margin * 2)
let resolution = Math.round(canvas.height / 68)
let COLS = Math.round(canvas.width / resolution)
let ROWS = Math.round(canvas.height / resolution)
let mode = 'run'
let buttonBarIsOpen = false
let buttons = [
    ['≡', 'buttonPress()'],
    ['отчистить', "buttonsFunctions('c'), buttonPress()"],
    ['остановить или запустить', "buttonsFunctions('s'), buttonPress()"],
    ['рандомно заполнить', "buttonsFunctions('r'), buttonPress()"]
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

let colors = []
for (let i = 0; i < COLS; i++) {
    let otv = []
    for (let j = 0; j < ROWS; j++) {
        otv.push('black')
    }
    colors.push(otv)
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
            if (buttons[i][0] == 'остановить или запустить') {
                if (mode == 'run') {
                    text = 'остановить'
                } else {
                    text = 'запустить'
                }
            } else {
                text = buttons[i][0]
            }
            button.innerHTML += `
            <button style="top: ${60 * i + 8}; width: 620;text-align: right;" class="button" onclick="${buttons[i][1]}">${text}</button>
            `
        }
        button.innerHTML += `
            <button style="top: ${60 * buttons.length + 8}; width: ${620 / 2 - 4}; text-align: right;" class="button" onclick="editSize(+10)">+10</button>
            <button style="top: ${60 * buttons.length + 8}; width: ${620 / 2 - 4}; text-align: right; margin-right: ${620 / 2 + 4 + 16}px;" class="button" onclick="editSize(-10)">-10</button>
            `
        buttonBarIsOpen = true
    }
}

function editSize(size) {
    let margin = 5
    document.body.style.margin = `${margin}px`
    canvas.height = Math.round(document.body.scrollHeight - margin * 2)
    canvas.width = Math.round(document.body.scrollWidth - margin * 2)
    resolution += size
    COLS = Math.round(canvas.width / resolution)
    ROWS = Math.round(canvas.height / resolution)
    mode = 'run'
    buttonBarIsOpen = false
    buttons = [
        ['≡', 'buttonPress()'],
        ['отчистить', "buttonsFunctions('c'), buttonPress()"],
        ['остановить или запустить', "buttonsFunctions('s'), buttonPress()"],
        ['рандомно заполнить', "buttonsFunctions('r'), buttonPress()"]
    ]
    button_pressed = false

    cells = []
    for (let i = 0; i < COLS; i++) {
        let otv = []
        for (let j = 0; j < ROWS; j++) {
            otv.push(0)
        }
        cells.push(otv)
    }

    colors = []
    for (let i = 0; i < COLS; i++) {
        let otv = []
        for (let j = 0; j < ROWS; j++) {
            otv.push('black')
        }
        colors.push(otv)
    }
}

setInterval(() => {
    let new_cells = [] // B3/S23
    let new_colors = []
    for (let i = 0; i < COLS; i++) {
        let new_row = []
        let new_color_row = []
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

            new_color_row.push(color)
            
            if (color != colors[i][j]) {
                ctx.beginPath()
                ctx.strokeStyle = "black";
                ctx.rect(i * resolution + 0.1, j * resolution + 0.1, resolution - 0.2, resolution - 0.2)
                ctx.fillStyle = color
                ctx.fill()
                ctx.stroke()
            } 
        }
        new_cells.push(new_row)
        new_colors.push(new_color_row)
    }
    cells = new_cells
    colors = new_colors
}, 100)
