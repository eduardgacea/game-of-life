'use strict';

import { getCellNeighboursIdxs } from './utils.js';

const frameRate = 100;
const root = document.getElementById('root');
const form = document.getElementById('board-params-form');
const boardSizeEl = document.getElementById('board-size');
const runBtn = document.getElementById('run-btn');
runBtn.addEventListener('click', toggleSimulation);
const itrBtn = document.getElementById('itr-count');

let boardSize;
let board;
let intervalId;
let iteration = 0;

itrBtn.textContent = iteration;

function createBoard() {
  board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      const cell = {
        i: i,
        j: j,
        state: 0,
        liveNeighbours: 0,
      };
      row.push(cell);
    }
    board.push(row);
  }
}

function createBoardEl() {
  if (document.getElementById('boardEl')) document.getElementById('boardEl').remove();
  const boardEl = document.createElement('div');
  boardEl.classList.add('board');
  boardEl.id = 'boardEl';
  for (let i = 0; i < boardSize; i++) {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');
    rowEl.id = `row-${i}`;
    for (let j = 0; j < boardSize; j++) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.classList.add(`${board[i][j].state ? 'alive' : 'dead'}`);
      cellEl.id = `cell-${i}-${j}`;
      cellEl.addEventListener('click', () => {
        toggleCell(i, j);
      });
      rowEl.appendChild(cellEl);
    }
    boardEl.appendChild(rowEl);
  }
  root.appendChild(boardEl);
}

function toggleCell(i, j) {
  const targetCell = document.getElementById(`cell-${i}-${j}`);
  const neighboursIdx = getCellNeighboursIdxs(i, j, boardSize);
  if (board[i][j].state) {
    board[i][j].state = 0;
    for (let neighbour of neighboursIdx) {
      board[neighbour[0]][neighbour[1]].liveNeighbours--;
    }
  } else {
    board[i][j].state = 1;
    for (let neighbour of neighboursIdx) {
      board[neighbour[0]][neighbour[1]].liveNeighbours++;
    }
  }

  targetCell.classList.toggle('alive');
  targetCell.classList.toggle('dead');
}

function generateNeighbours() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      board[i][j].neighbours = getCellNeighboursIdxs(i, j, boardSize);
    }
  }
}

function toggleSimulation() {
  runBtn.textContent = intervalId ? 'RUN' : 'PAUSE';
  intervalId ? stopSimulation() : startSimulation();
}

function startSimulation() {
  if (!intervalId) {
    intervalId = setInterval(simulation, frameRate);
  }
}

function stopSimulation() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function simulation() {
  iteration++;
  itrBtn.textContent = iteration;
  const nextFrame = createBoardClone();
  board = JSON.parse(JSON.stringify(nextFrame));
  if (document.getElementById('boardEl')) document.getElementById('boardEl').remove();
  createBoardEl();
}

function createBoardClone() {
  const nextFrame = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      const cell = {
        i: board[i][j].i,
        j: board[i][j].j,
        state: board[i][j].state,
        liveNeighbours: 0,
        neighbours: [...board[i][j].neighbours],
      };

      if (board[i][j].state) {
        if (board[i][j].liveNeighbours < 2 || board[i][j].liveNeighbours >= 4) {
          cell.state = 0;
        } else cell.state = board[i][j].state;
      } else if (!board[i][j].state) {
        if (board[i][j].liveNeighbours === 3) {
          cell.state = 1;
        } else cell.state = board[i][j].state;
      }

      row.push(cell);
    }
    nextFrame.push(row);
  }
  for (let i = 0; i < nextFrame.length; i++) {
    for (let j = 0; j < nextFrame.length; j++) {
      for (let neighbour of nextFrame[i][j].neighbours) {
        nextFrame[i][j].liveNeighbours += nextFrame[neighbour[0]][neighbour[1]].state;
      }
    }
  }
  return nextFrame;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!intervalId) {
    iteration = 0;
    itrBtn.textContent = iteration;
    boardSize = parseInt(boardSizeEl.value);
    createBoard();
    generateNeighbours();
    createBoardEl();
  }
});
