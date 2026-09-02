const xPlayer = document.querySelector("#xPlayer");
const headerTitle = document.querySelector("#headerTitle");
const oPlayer = document.querySelector("#oPlayer");

const cells = document.querySelectorAll(".cell");
const computerBtn = document.querySelector("#computerBtn");
const restartBtn = document.querySelector("#restartBtn");


let player = "X";
let isPaused = false;
let isStarted = false;

const inputCells = [
    "", "", "",
    "", "", "",
    "", "", ""
]
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
]


cells.forEach((cell, idx) => {
    cell.addEventListener("click", () => tapCell(cell, idx));
});

function tapCell(cell, idx) {
    if (!isPaused && cell.textContent == "") {
        isStarted = true;
        cell.textContent = player;
        inputCells[idx] = player;
        cell.style.color = (player == "X" ? "#1892EA" : "#A737FF");
        checkWinner();
        changePlayer();
    }
}

function changePlayer() {
    if (player == "X") {
        player = "O";
        xPlayer.classList.remove("active-player");
        oPlayer.classList.add("active-player");
    } else {
        player = "X";
        xPlayer.classList.add("active-player");
        oPlayer.classList.remove("active-player");
    }
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        if (inputCells[a] == player && inputCells[b] == player && inputCells[c] == player) {
                declareWinner([a, b, c]);
                return true;
        }
    }

    if (inputCells.every(cell => cell != "")) {
        declareDraw();
        return true;
    }
}

function declareWinner(indices) {
    headerTitle.textContent = `${player} Win`;
    isPaused = true;
    indices.forEach((idx) => cells[idx].style.background = "#6f6694");
    xPlayer.classList.remove("active-player");
    oPlayer.classList.remove("active-player");
}

function declareDraw() {
    headerTitle.textContent = `Draw !!!`;
    isPaused = true;
}

restartBtn.addEventListener("click", () => {
    inputCells.fill("");
    cells.forEach(cell => {
      cell.textContent = "";
      cell.style.background = "";
    })
    isPaused = false;
    isStarted = false;
    headerTitle.textContent = "Choose";
    player = "X";
    xPlayer.classList.add("active-player");
    oPlayer.classList.remove("active-player");
})





// function randomPick() {
//     // Pause the game to allow Computer to pick
//     isPauseGame = true

//     setTimeout(() => {
//         let randomIndex
//         do {
//             // Pick a random index
//             randomIndex = Math.floor(Math.random() * inputCells.length)
//         } while (
//             // Ensure the chosen cell is empty
//             inputCells[randomIndex] != ''
//         )

//         // Update the cell with Computer move
//         updateCell(cells[randomIndex], randomIndex, player)
//         // Check if Computer not won
//         if (!checkWinner()) {
//             changePlayer()
//             // Swith back to Human player
//             isPauseGame = false
//             return
//         }
//         player = (player == 'X') ? 'O' : 'X'
//     }, 1000) // Delay Computer move by 1 second
// }

// function checkWinner() {
//     for (const [a, b, c] of winConditions) {
//         // Check each winning condition
//         if (inputCells[a] == player &&
//             inputCells[b] == player &&
//             inputCells[c] == player
//         ) {
//             declareWinner([a, b, c])
//             return true
//         }
//     }
    
//     // Check for a draw (if all cells are filled)
//     if (inputCells.every(cell => cell != '')) {
//         declareDraw()
//         return true
//     }
// }


