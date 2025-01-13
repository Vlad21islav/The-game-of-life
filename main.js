const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
let margin = document.body.style.margin = "5"
canvas.height = document.body.scrollHeight - margin * 2
canvas.width = document.body.scrollWidth - margin * 2
const COLS = Math.round(canvas.width / resolution);
const ROWS = Math.round(canvas.height / resolution);

function buildGrid() {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

let grid = buildGrid();

function nextGeneration(grid) {
    const nextGrid = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbors = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const xCell = col + i;
                    const yCell = row + j;

                    if (xCell >= 0 && yCell >= 0 && xCell < COLS && yCell < ROWS) {
                        const currentNeighbor = grid[xCell][yCell];
                        numNeighbors += currentNeighbor;
                    }
                }
            }

            if (cell === 1 && numNeighbors < 2) {
                nextGrid[col][row] = 0;
            } else if (cell === 1 && numNeighbors > 3) {
                nextGrid[col][row] = 0;
            } else if (cell === 0 && numNeighbors === 3) {
                nextGrid[col][row] = 1;
            }
        }
    }
    return nextGrid;
}

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'red' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}

function update() {
    grid = nextGeneration(grid);
    render(grid);
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
