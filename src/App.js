import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from "./Game";
import {setToState,getFromState} from "./allState";
import {calculateWinner, moveAI} from './computer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            switcher:0,
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleStart= this.handleStart.bind(this);
        this.handleCheck= this.handleCheck.bind(this);
        this.Winner= this.Winner.bind(this);                //receiving props from game table, declaring winner
        this.definePlayers= this.definePlayers.bind(this);
        this.reset= this.reset.bind(this);
    }
    handleChange(event) {
        console.log(1);
        const target=event.target;
        const name= target.name;
        this.setState({});
        setToState({[name]:event.target.value});
    }

    handleStart() {
        if(getFromState().fPlayer !== '' && getFromState().sPlayer !== '') {
            setToState({start: true, nextTurn: getFromState().defTurn});
            if ((getFromState().sComputer && getFromState().defTurn === 'O') ||( getFromState().fComputer && getFromState().defTurn === 'X')) {
                this.definePlayers(getFromState().fComputer);
                this.definePlayers(getFromState().sComputer);
            }
            this.setState({
                switcher: 1
            });
        }
        else {
            setToState({placeholder:'please fill out this fields'});
            this.setState({
               switcher:1
            });
        }
    }
    reset(){
        this.setState({
           switcher:0
        })
    }
    definePlayers(ai) {
        if (ai) {
            let newBoard = moveAI(getFromState().grids);
            this.Winner(newBoard);
            this.setState({});
            setToState({grids: newBoard});
        }
    }
    Winner(grids) { //starting after Game component initialise
        this.setState({});
        if(calculateWinner(grids,'X')) {
            let whoWin = 'X';
            this.stopGame(whoWin);
        }
            if (calculateWinner(grids, 'O')) {
                let whoWin='O';
                this.stopGame(whoWin);
            }
    }
    stopGame(whoWin) {
        let winner='';
        let fPlayer=getFromState().fPlayer;
        let sPlayer=getFromState().sPlayer;
        if (getFromState().fComputer){
             fPlayer= 'computer';
        }
        else if (getFromState().sComputer){
             sPlayer= 'computer';
        }
        if(whoWin ==='X') {
            winner=`${fPlayer}, who played for ${whoWin}, won`;
        }
        else if(whoWin ==='O') {
            winner=`${sPlayer}, who played for ${whoWin}, won`;
        }
        setToState({winner: winner});
        this.setState({});
    }
    handleCheck(event) {
        const target = event.target;
        const name = target.name;
        setToState({[name]: event.target.checked});
        this.setState({});
    }
  render() {
        let playerF,playerS; // i will replace section with componentDidUpdate
        if (getFromState().defTurn === 'X'){
            playerF='First Player';
            playerS='Second Player';
        }
        else {
            playerS='First Player';
            playerF='Second Player';
        }
        let hide='';
        let status;
        const winner=getFromState().winner;
        if(getFromState().start) {
            hide='disable';
        }
        else{
            hide='';
        }
        if (winner !== '') {
            status = 'Winner: ' + winner;
        }
        else if(getFromState().start){
            status= 'Next player: ' + (getFromState().nextTurn === 'X' ?
                getFromState().fPlayer:
                getFromState().sPlayer);
        }

      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"><a className='react-link' href={'https://reactjs.org'} >Welcome to React</a></h1>
        </header>
        <div className="container">
            {getFromState().start ?
                <Game Winner={this.Winner} reset={this.reset}/> :
                null
            }
            <div className="right-column">
                <div className="computer-box">
                    <div className="players">
                        <div className="checkbox-X">X<input type="checkbox"  name='fComputer'
                                                            className={`${hide}`}
                                                            checked={getFromState().fComputer}
                                                            onChange={ this.handleCheck}/>
                        </div>
                        <div className='computer-label'>Play vs computer</div>
                        <select className={`inputs ${hide}`} name="difficult" value={getFromState().difficult} onChange={this.handleChange}>
                            <option value={0} disabled > difficult</option>
                            <option value={1}>easy</option>
                            <option value={2}>normal</option>
                            <option value={3}>hard</option>
                            <option value={4}>new</option>
                        </select>
                        <div className="checkbox"><input type="checkbox"  name='sComputer'
                                                         className={`${hide}`}
                                                         checked={getFromState().sComputer}
                                                         onChange={this.handleCheck}/>O
                        </div>
                    </div>
                </div>
                <div className="players">
                    <label>{`${playerF}`}</label>
                    <input type="text" name="fPlayer" id='fReq' className={`inputs ${hide}`} placeholder={getFromState().placeholder}
                           maxLength={15} value={getFromState().fPlayer} onChange={this.handleChange}/>
                </div>
                <div className="players">
                    <label>{`${playerS}`}</label>
                    <input type="text"  name="sPlayer" id='sReq' className={`inputs ${hide}`} placeholder={getFromState().placeholder}
                           maxLength={15} value={getFromState().sPlayer} onChange={this.handleChange}/>
                </div>
                <div className="players">
                    <label>First move</label>
                    <div className={`radio ${hide}`}><input type="radio" name="defTurn"   defaultChecked value={'X'}
                                                  onChange={this.handleChange} />X</div>
                    <div className={`radio ${hide}`}><input type="radio" name="defTurn" value={'O'}
                                                  onChange={this.handleChange} />O</div>
                </div>
                <div className="players">
                    <label>Start game</label>
                        <button className="customButton" onClick={this.handleStart} >Start</button>
                </div>
                <div className="players">
                    <label id='status'>{status}</label>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
export default App;