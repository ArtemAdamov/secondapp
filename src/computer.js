import {getFromState, setToState} from "./allState";

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
export function miniMax(newBoard, depth, computer) {

    const gameState = calculateWinner(newBoard, 'O');
    if (gameState === false) {
        const values = [];
        for (let i = 0; i < getFromState().fieldSize; i += 1) {
            for (let j = 0; j < getFromState().fieldSize; j += 1) {
                const gridCopy = JSON.parse(JSON.stringify(newBoard));
                    //newBoard.slice();
                    // JSON.parse(JSON.stringify(newBoard));
                if (gridCopy[i][j] !== '') continue;
                gridCopy[i][j] = computer;
                //debugger;
                const value = miniMax(gridCopy, depth + 1, (computer === 'O') ? 'X': 'O');
                values.push({
                    cost: value,
                    cell: {
                        i: i,
                        j: j
                    }
                });
            }
        }
debugger;
        if (computer === 'X') {
            const max = values.find(x => x.cost === Math.max(...values.map(v => v.cost)));
            console.log('a',max);
            if (depth === 0) {
                return max.cell;
            }
            else {
                console.log(max.cell);
                return max.cost
            }
        }
        else {
            const min = values.find(x => x.cost === Math.min(...values.map(v => v.cost)));
            if (depth === 0) {
                return min.cell;
            }
            else {
                return min.cost
            }
        }
    }
    else if (boardNotFull(newBoard) === false) { // temporary x is a computer
        return 0;
    }
    else if (calculateWinner(newBoard,'X') === true) {
        return depth - 10;
    }
    else if (gameState === true) {
        return 10 - depth;
    }
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