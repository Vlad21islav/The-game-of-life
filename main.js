const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
let margin = 5; // Правильное использование переменной margin
document.body.style.margin = `${margin}px`;
canvas.height = document.body.scrollHeight - margin * 2;
canvas.width = document.body.scrollWidth - margin * 2;
const COLS = Math.round(canvas.width / resolution);
const ROWS = Math.round(canvas.height / resolution);
let mode = 'run'

let cells = [];
for (let i = 0; i < COLS; i++) {
    let otv = [];
    for (let j = 0; j < ROWS; j++) {
        otv.push(Math.round(Math.random()));
    }
    cells.push(otv);
}

function printMousePos(event) {
    const x = event.clientX;
    const y = event.clientY;

    cells[Math.floor(x / resolution)][Math.floor(y / resolution)] = 1;
}
document.addEventListener('click', printMousePos);

function near(pos) {
    const system = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let count = 0;
    for (let k = 0; k < system.length; k++) {
        const [dx, dy] = system[k];
        const x = pos[0] + dx;
        const y = pos[1] + dy;
        if (x >= 0 && x < COLS && y >= 0 && y < ROWS && cells[x][y]) {
            count++;
        }
    }
    return count;
}

addEventListener('keypress', (event) => {
    let key = event.key
    if (key == 's') {
        if (mode == 'run') {
            mode = 'stop'
        } else {
            mode = 'run'
        }
    }
}, true)

setInterval(() => {
    let new_cells = []; // B3/S23
    for (let i = 0; i < COLS; i++) {
        let new_row = [];
        for (let j = 0; j < ROWS; j++) {
            const count = near([i, j]);
            if (mode == 'run') {
                if (cells[i][j] && (count == 2 || count == 3)) {
                    new_row.push(1);
                } else if (!cells[i][j] && count == 3) {
                    new_row.push(1);
                } else {
                    new_row.push(0);
                }
            } else {
                new_row.push(cells[i][j]);
            }

            let color;
            if (cells[i][j]) {
                if (count >= 0 && count <= 1) {
                    color = 'rgb(252, 135, 0)';
                } else if (count === 2 || count === 3) {
                    color = 'rgb(0, 184, 0)';
                } else {
                    color = 'rgb(250, 0, 0)';
                }
            } else {
                color = 'white';
            }

            ctx.beginPath();
            ctx.rect(i * resolution, j * resolution, resolution, resolution);
            ctx.fillStyle = color
            ctx.fill();
            ctx.stroke();
        }
        new_cells.push(new_row);
    }
    cells = new_cells;
}, 1000);
