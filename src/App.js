import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from "./Game";
import {setToState,getFromState} from "./allState";
import {calculateWinner,miniMax} from './computer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            switcher:0,
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleStart= this.handleStart.bind(this);
        this.Winner= this.Winner.bind(this);                //receiving props from game table, declaring winner
        this.reset= this.reset.bind(this);
        this.miniStart= this.miniStart.bind(this);
    }
    handleChange(event) {
        const target=event.target;
        const name= target.name;
        this.setState({});
        setToState({[name]:event.target.value});
    }
    miniStart () {
        setToState({start: true, ai: true});
        //miniMax(getFromState().grids,0,'O');
        this.setState({});
    }
    handleStart() {
        if(getFromState().fPlayer !== '' && getFromState().sPlayer !== '') {
            setToState({start: true, nextTurn: getFromState().defTurn});
            this.setState({
                switcher:1
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
        if (getFromState().fComputer !== ''){
             fPlayer=getFromState().fComputer;
        }
        else if (getFromState().sComputer !== ''){
             sPlayer=getFromState().sComputer;
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

  render() {
        let playerF,playerS;
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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
            {/*<FirstStep next={this.state.reset}/>*/}
            {getFromState().start ?
                <Game Winner={this.Winner} reset={this.reset}/> :
                null
            }
            <div className="right-column">
                <div className="players">
                    <label>{`${playerF}`}</label>
                    <input type="text" name="fPlayer" id='fReq' className={`inputs ${hide}`} placeholder={getFromState().placeholder}
                           maxLength={15} value={getFromState().fPlayer} onChange={this.handleChange}/>
                    <div className="checkbox"><input type="checkbox" value={'X'} name='fComputer' checked={getFromState().fComputer === 'X'} className={`${hide}`}
                                                     onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="players">
                    <label>{`${playerS}`}</label>
                    <input type="text"  name="sPlayer" id='sReq' className={`inputs ${hide}`} placeholder={getFromState().placeholder}
                           maxLength={15} value={getFromState().sPlayer} onChange={this.handleChange}/>
                    <div className="checkbox"><input type="checkbox" value={'O'} name='sComputer' checked={getFromState().sComputer === 'O'} className={`${hide}`}
                                                     onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="players">
                    <label>First move</label>
                    <div className={`radio ${hide}`}><input type="radio" name="defTurn" id='defTurn'  defaultChecked value={'X'}
                                                  onChange={this.handleChange} />X</div>
                    <div className={`radio ${hide}`}><input type="radio" name="defTurn" id='defTurn' value={'O'}
                                                  onChange={this.handleChange} />O</div>
                </div>
                <div className="players">
                    <label>Start game</label>
                        <button className="customButton" onClick={this.handleStart} >Start</button>
                </div>
                <div className="players">
                    <label id='status'>{status}</label>
                </div>
                <div className="players">
                    <button className='customButton' onClick={this.miniStart}>minimax</button>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
export default App;