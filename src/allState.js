
let sendToState={
    fieldSize: 3,
    defTurn: 'X',
    nextTurn: '',
    fPlayer:'first',
    sPlayer:'sec',
    fComputer: false,
    sComputer: false,
    start: null,
    winner:'',
    placeholder:'',
    grids: initTable(),
    difficult: '1'
};
export function initTable() {
    const grids =[];
    for (let k = 0; k < 3; k += 1) {
        grids[k] = [];
        for (let j = 0; j < 3; j += 1) {
            grids[k][j] = '';
        }
    }
    return grids;
}
export function getFromState() {
    return sendToState
}
export function setToState(state) {
    sendToState={
        ...sendToState,
        ...state
    };
    //console.log(getFromState());
}