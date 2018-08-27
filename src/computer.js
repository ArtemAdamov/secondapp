import {getFromState, setToState} from "./allState";

export function moveAI(board) {
    const obj = {
        '1': () => randSteps(board),
        '2': () => normalAI(board),
        '3': () => moveMinimax(board),
    };
    const dif = getFromState().difficult;
    return obj[dif]();
}

export function randSteps(grids) {
    let m=randomInt(0,getFromState().fieldSize-1);
    let n=randomInt(0,getFromState().fieldSize-1);
    const turn= getFromState().nextTurn;
    if (boardNotFull(getFromState().grids)) {
        if ((grids[m][n] === '')) {
            grids[m][n] = turn;
            if (turn === 'X') {
                setToState({nextTurn: 'O', m: m});
            }
            else if (turn === 'O') {
                setToState({nextTurn: 'X', n: n});
            }
        }
        else {
            return randSteps(grids);
        }
    }
    return grids;
}
function randomInt(min, max) {
    let rand = min + Math.random() * (max+1 - min);
    rand = Math.floor(rand);
    return rand;
}
 export function boardNotFull(grids) {
    for (let i = 0; i < getFromState().fieldSize; i += 1) {
        for (let j = 0; j < getFromState().fieldSize; j += 1) {
            if (grids[i][j] === '') {
                return true
            }
        }
    }
    return false;
}
export function calculateWinner(grids,filledGrid) {
    let diagMain, diagSecond, line, col;
    for (let i = 0; i < getFromState().fieldSize; i += 1) {
        line = 0;
        col = 0;
        for (let j = 0; j < getFromState().fieldSize; j += 1) {
            if (grids[i][j] === filledGrid) {
                line++;
            }
            if (grids[j][i] === filledGrid) {
                col++;
            }
        }
        if (line === getFromState().fieldSize || col === getFromState().fieldSize) {
            return true;
        }
    }
    diagMain = 0;
    diagSecond = 0;
    for (let i = 0; i < getFromState().fieldSize; i += 1) {
        if (grids[i][i] === filledGrid) {
            diagMain++;
        }
        if (grids[i][getFromState().fieldSize - i - 1] === filledGrid) {
            diagSecond++;
        }
    }
    if (diagMain === getFromState().fieldSize || diagSecond === getFromState().fieldSize) {
        return true;
    }
    return false;
}
function normalAI(board) {
    let ifWin = false;
    let ai ,player;
    if (getFromState().nextTurn === 'X') {
        ai = 'X';
        player = 'O';
    } else {
        ai = 'O';
        player= 'X';
    }
    for (let i = 0; i < getFromState().fieldSize; i++) {
        for (let j = 0; j < getFromState().fieldSize; j++) {
            if (board[i][j] === '') {
                board[i][j] = player;
                ifWin = calculateWinner(board,player);
                //debugger;
                if (ifWin) {
                     board[i][j]= ai;
                     setToState({nextTurn: player});
                     return board;
                }
                board[i][j]= '';
            }
        }
    }
     return randSteps(board)
}
function moveMinimax (board) {
    let player= false;
    if (getFromState().nextTurn === 'X') {
        player = true;
    }
    const newBoard=[];
    for (let k = 0; k < getFromState().fieldSize; k += 1) {
        newBoard[k] = [];
        for (let j = 0; j < getFromState().fieldSize; j += 1) {
            if (board[k][j] === ''){
                newBoard[k][j] = null
            }
            if (board[k][j] === 'X'){
                newBoard[k][j] = true
            }
            if (board[k][j] === 'O'){
                newBoard[k][j] = false
            }
        }
    }
    let oldBoard=recurseMinimax(newBoard,player)[1];
    const newBoard1=[];
    for (let k = 0; k < getFromState().fieldSize; k += 1) {
        newBoard1[k] = [];
        for (let j = 0; j < getFromState().fieldSize; j += 1) {
            if (oldBoard[k][j] === null){
                newBoard1[k][j] = ''
            }
            if (oldBoard[k][j] === true){
                newBoard1[k][j] = 'X'
            }
            if (oldBoard[k][j] === false){
                newBoard1[k][j] = 'O'
            }
        }
    }
    if (getFromState().nextTurn === 'X') {
        setToState({nextTurn: 'O'});
    }
    else {
        setToState({nextTurn: 'X'});
    }
    return newBoard1;
}
function recurseMinimax(board, player) {
    let winner = getWinner(board);
    if (winner != null) {
        switch(winner) {
            case 1:
                return [1, board];
            case 0:
                return [-1, board];
            case -1:
                return [0, board];
                default :
        }
    } else {
        let nextVal = null;
        let nextBoard = null;
        for (let i = 0; i < getFromState().fieldSize; i++) {
            for (let j = 0; j < getFromState().fieldSize; j++) {
                if (board[i][j] === null) {
                    board[i][j] = player;
                    let value = recurseMinimax(board, !player)[0];
                    if (
                        (player && (nextVal === null || value > nextVal)) ||
                        (!player && (nextVal === null || value < nextVal))
                    ) {
                        nextBoard = board.map(function(arr) {
                            return arr.slice();
                        });
                        nextVal = value;
                    }
                    board[i][j] = null;
                }
            }
        }
        return [nextVal, nextBoard];
    }
}
function getWinner(board) {
    let vals = [true, false];
    let allNotNull = true;
    for (let k = 0; k < vals.length; k++) {
        let value = vals[k];

        // Check rows, columns, and diagonals
        let diagonalComplete1 = true;
        let diagonalComplete2 = true;
        for (let i = 0; i < getFromState().fieldSize; i++) {
            if (board[i][i] !== value) {
                diagonalComplete1 = false;
            }
            if (board[getFromState().fieldSize - 1 - i][i] !== value) {
                diagonalComplete2 = false;
            }
            let rowComplete = true;
            let colComplete = true;
            for (let j = 0; j < getFromState().fieldSize; j++) {
                if (board[i][j] !== value) {
                    rowComplete = false;
                }
                if (board[j][i] !== value) {
                    colComplete = false;
                }
                if (board[i][j] === null) { //==
                    allNotNull = false;
                }
            }
            if (rowComplete || colComplete) {
                return value ? 1 : 0;
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;
        }
    }
    if (allNotNull) {
        return -1;
    }
    return null;
}