import React, {Component} from 'react';
import './App.css';
import {randSteps, boardNotFull,miniMax} from "./computer";
import {getFromState, setToState, initTable} from "./allState";
class Game extends Component {
    constructor(props) {
        super(props);
        this.state= {
            switcher:0,
        };
        this.handleClick= this.handleClick.bind(this);
        this.handleReset= this.handleReset.bind(this);
        this.computerPlay= this.computerPlay.bind(this);
        this.moveAI=this.moveAI.bind(this);
    }
    componentDidMount() {
        this.intervalId = setInterval(this.computerPlay, 2000);
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
            this.setState({});
            setToState({grids:grids, nextTurn: turn});
            this.props.Winner(grids);
        }
         if (getFromState().ai === true) {
             this.moveAI();
         }
    }
    moveAI () {
        const grids = getFromState().grids;
        const ind = miniMax(grids, 0, 'O');
        grids[ind.i][ind.j] = 'O';
        setToState({grids: grids});
        this.setState({});
        console.log(grids);
    }
    handleReset() {
        setToState({grids:initTable(),
            nextTurn:getFromState().defTurn,
            winner: '',
            start: false,
            fComputer:'',
            sComputer:''
        });
        this.props.reset();
    }

    computerPlay() {
        console.log('s');
        this.setState({
        });
        if(getFromState().winner === '' && boardNotFull(getFromState().grids)){
            if(getFromState().fComputer === getFromState().nextTurn || getFromState().sComputer === getFromState().nextTurn)
                randSteps(getFromState().grids);
            this.props.Winner(getFromState().grids);
        }
            else
                clearInterval( this.intervalId)
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