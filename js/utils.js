// Utils functions - file.

'use strict';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function createMat() {
  var board = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
    board[i] = [];
    for (var j = 0; j < gLevel.SIZE; j++) {
      board[i][j] = {
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  return board;
}


function copyMat(mat) {
  var newMat = [];
  for (var i = 0; i < mat.length; i++) {
      newMat[i] = [];
      for (var j = 0; j < mat[0].length; j++) {
          newMat[i][j] = mat[i][j];
      }
  }
  return newMat;
}


function renderBoard(mat, selector) {

  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < mat.length; i++) {

      strHTML += '<tr>'
      for (var j = 0; j < mat[0].length; j++) {

          const cell = mat[i][j]
          const className = 'cell cell-' + i + '-' + j
          strHTML += `<td class="${className}">${cell}</td>`
      }
      strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'
  
const elContainer = document.querySelector(selector)
elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function countNegs(cellI, cellJ, mat) {
  var negsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= mat.length) continue;
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
          if (j < 0 || j >= mat[i].length) continue;
          if (i === cellI && j === cellJ) continue;
          // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++;
          if (mat[i][j]) negsCount++;
      }
  }
  return negsCount;
}

function renderCell(i, j, value) {
  var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
  elCell.innerText = value;
}