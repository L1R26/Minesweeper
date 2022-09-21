// Minesweeper Game
'use strict';

const MINE = 'MINE'
const EMPTY = ''
const HP_IMG = '❤️'
const FLAG_IMG = '🚩';
const MINE_IMG = '💣';

var gBoard
var gIntervalId
var gLivesLeft = 3

var gBoard = {
    isShown: true,
    isMine: false,
    isMarked: true
}
var gLevel = {
    SIZE: 8,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInitGame() {
    // Creating a board according 'gLevel' values.
    gBoard = createMat(gLevel.SIZE, gLevel.SIZE)
    // Showing up the timer
    document.querySelector('.timer').style.display = 'block'
    // Creating the board on client screen
    renderBoard(gBoard)
    gGame.isOn = true
    openModal('Game is running...')
    gIntervalId = setInterval(startTimer, 1000);

}

function cellClicked(cell, i, j) {
     if (!gGame.isOn) return;
    var clickedCell = gBoard[i][j];
    // Updating model
    gGame.shownCount++
    clickedCell.isShown = true;
    if (clickedCell.isMine) return onGameOver();
    createRandomMines(gBoard, gLevel.MINES);

    var minesNegsCount = setMinesNegsCount(gBoard, i, j);
    //Updating DOM
    if (minesNegsCount > 0) cell.innerHTML = minesNegsCount;
    cell.classList.remove('hidden');
    if (checkWinning()) return onGameOver(true);
}


// Placing FLAGS
function cellMark(cell, event, i, j) {
    window.addEventListener("contextmenu", e => e.preventDefault());
    //if (!gGame.isOn) return;

    var clickedCell = gBoard[i][j];
    clickedCell.isMarked = !clickedCell.isMarked;
    if (clickedCell.isShown) return;

    if (clickedCell.isMarked) {
        gGame.markedCount++;
        cell.innerHTML = FLAG_IMG
    } else {
        cell.innerHTML = EMPTY
        gGame.markedCount--

    }
    if (checkWinning()) return onGameOver(true);
}

// Rendering MAT into HTML table
function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            var className = 'cell-' + i + '-' + j;


            if (!currCell.isShown) className += ' hidden';

            strHTML += `<td class="cell ${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMark(this, event, ${i}, ${j})"></td>`;
        }

        strHTML += '</tr>';
    }
    elBoard.innerHTML = strHTML;

}
function createRandomMines(board, amount) {
    for (var i = 0; i < amount; i++) {
        var row = getRandomInt(0, board.length);
        var col = getRandomInt(0, board[i].length);
        board[row][col].isMine = true;
    }
}
function openModal(txt) {
    var elModal = document.querySelector('.modal')
    gGame.isOn ? elModal.style.backgroundColor = "green" : elModal.style.backgroundColor = "red";
    elModal.style.display = 'block';
    elModal.innerText = txt;
}
function hideModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}
function startTimer() {
    gGame.secsPassed++
    var elTimer = document.querySelector('.timer span').innerHTML = gGame.secsPassed
    //console.log(gGame.secsPassed);
}
function changeGameLevel(lvl) {
    console.log('hi')
    gLevel.SIZE = lvl
    gGame.secsPassed = 0
    gGame.shownCount = 0
    gGame.markedCount = 0
    gBoard = createMat(lvl, lvl)
    renderBoard(gBoard)
}
function resetGame() {
    clearInterval(gIntervalId)
    gLevel.SIZE = 8
    gGame.isOn = false
    gGame.secsPassed = 0
    gGame.shownCount = 0
    gGame.markedCount = 0
    hideModal()
    openModal('Restarting the game..\n please wait')
    var resetTimeOut = setTimeout(onInitGame, 3000);
}

function setMinesNegsCount(board, row, col) {
    var minesNegsCount = 0;

    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;

        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board[i].length - 1) continue;
            if (i === row && j === col) continue;

            if (board[i][j].isMine) minesNegsCount++;
        }
    }

    return minesNegsCount;
}

function checkWinning() {
    if (gGame.shownCount + gGame.markedCount === gBoard.length ** 2) return true
}

function onGameOver(isWin = false) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j];

            if (currCell.isMine) {
                var elCell = document.querySelector(`.cell-${i}-${j}`);

                if (!isWin) {
                    elCell.classList.remove('hidden');
                    elCell.innerHTML = MINE_IMG
                    openModal('G A M E -I S- O V  E R')
                } else {
                    elCell.innerHTML = FLAG_IMG
                    openModal('Congratulations! You won')
                }

            }
        }
    }
    gGame.isOn = false;
}
