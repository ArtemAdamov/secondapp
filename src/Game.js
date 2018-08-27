import React, {Component} from 'react';
import './App.css';
import {boardNotFull, moveAI} from "./computer";
import {getFromState, setToState, initTable} from "./allState";
class Game extends Component {
    constructor(props) {
        super(props);
        this.state= {
            switcher:0,
        };
        this.handleClick= this.handleClick.bind(this);
        this.handleReset= this.handleReset.bind(this);
    }
    componentDidMount() {
        this.intervalId = setInterval(this.computerPlay.bind(this), 500);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    handleClick(i) {
        const row = Number(i.target.parentNode.id.replace(/\D/gi, ''));
        const td = Number(i.target.id.replace(/\D/gi, ''));
        const grids =getFromState().grids;
        let turn= '';
        if((grids[row][td] === '')&& getFromState().winner === '') {
            if (getFromState().nextTurn === 'X') {
                grids[row][td] = 'X';
                turn = 'O';
            }
            else if (getFromState().nextTurn === 'O' ) {
                grids[row][td] = 'O';
                turn = 'X';
            }
            setToState({grids:grids, nextTurn: turn});
            this.props.Winner(grids);
            this.setState({});
        }
    }
    computerPlay () {
        if (getFromState().winner === '' && boardNotFull(getFromState().grids)) {
            if ((getFromState().nextTurn === 'X' && getFromState().fComputer)
                || (getFromState().sComputer && getFromState().nextTurn === 'O')){
                let newBoard = moveAI(getFromState().grids);
                setToState({ grids: newBoard});
                this.props.Winner(getFromState().grids);
            }
        }
        else clearInterval(this.intervalId);
    }
    handleReset() {
        setToState({grids:initTable(),
            nextTurn:getFromState().defTurn,
            winner: '',
            start: false,
            fComputer:false,
            sComputer:'',
            difficult: '1'
        });
        this.props.reset();
    }
    renderLine() {
        let tr = [],i=getFromState().fieldSize;
        for(let index = 0; index < i; index += 1) {
            const key = `${index}_tr`;
            tr.push(
                <tr key={key} id={key}>
                    {this.renderGrids(index)}
                </tr>
            );
        }
        return tr;
    }
    renderGrids(index) {
        let td = [],i=getFromState().fieldSize;
        for(let inOfTd = 0; inOfTd < i; inOfTd += 1) {
            const key = `${inOfTd}_td`;
            let draw = '';
            if (getFromState().grids[index][inOfTd].localeCompare('X')===0) {
                draw = "xclicked";
            }
            else if(getFromState().grids[index][inOfTd].localeCompare('O')===0){
                draw = "oclicked";
            }
            td.push(
                <td id={key} className={`grids-render ${draw}`} key={key} onClick={this.handleClick}>
                </td>
            );
        }
        return td;
    }
    render(){
        return(
            <div className="left-column">
                <table>
                    <tbody>
                    {this.renderLine()}
                    </tbody>
                </table>
               <div className="button">
                   <button className="customButton" onClick={this.handleReset} >Reset</button>
               </div>
            </div>

        );
    }
}
export default Game;