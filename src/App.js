import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            Fplayer:'',
            Splayer:'',
            Fmove: true,
            Smove:false,
            grids: this.initTable(),
            isNext: true
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleClick= this.handleClick.bind(this);
    }
    handleChange(event) {
        const target=event.target;
        const name= target.name;
        this.setState({[name]:event.target.value});
    }
    handleClick(i) {
        const td = Number(i.target.id.replace(/\D/gi, ''));
        const row = Number(i.target.parentNode.id.replace(/\D/gi, ''));
        const grids =this.state.grids;
        let switcher=false;
        if (this.state.isNext && grids[row][td]==='' ) {
            grids[row][td] = 'x';
            switcher=true;
        }
        else if (!this.state.isNext &&grids[row][td]==='') {
            grids[row][td] = 'o';
            switcher=true;
        }
         this.setState({
             grids: grids,
             isNext: switcher ?
                 !this.state.isNext:
                  this.state.isNext,

         });
    }
    initTable() {
        let n=3,m=3;
        const grids =[];
        for (let k = 0; k < n; k += 1) {
            grids[k] = [];
            for (let j = 0; j < m; j += 1) {
                grids[k][j] = '';
                // {/*<div className="xclicked" > </div>;*/
                // }
            }
        }
        return grids;
    }

    renderLine() {
        let tr = [];

        for(let index = 0; index < 3; index += 1) {
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
        let td = [];
           for(let indextd = 0; indextd < 3; indextd += 1) {
               const key = `${indextd}_td`;
               let draw = '';
               if (this.state.grids[index][indextd].localeCompare('x')===0) {
                   draw = "xclicked";
               }
               else if(this.state.grids[index][indextd].localeCompare('o')===0){
                   draw = "oclicked";
               }
               td.push(
                   <td id={key} className={`grids-render ${draw}`} key={key} onClick={this.handleClick}>
                   </td>
               );
    }
    return td;
    }

  render() {
        const winner=calculateWinner(this.state.grids);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else {
            status = 'Next player: ' + (this.state.isNext ?
                this.state.Fplayer:
                this.state.Splayer);
        }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
            <div className="left-column">
                <table>
                    <tbody>
                    {this.renderLine()}
                    </tbody>
                </table>
            </div>
            <div className="right-column">
                <div className="players">
                    <label>First player</label>
                    <input type="text" name="Fplayer" value={this.state.Fplayer} onChange={this.handleChange}/>
                </div>
                <div className="players">
                    <label>Second player</label>
                    <input type="text"  name="Splayer" value={this.state.Splayer} onChange={this.handleChange}/>
                </div>
                <div className="players">
                    <label>First move</label>
                    <div className="radio"><input type="radio" name="Fmove" value={this.state.Fmove}
                                                  onChange={this.handleChange} checked/>X</div>
                    <div className="radio"><input type="radio" name="Fmove" value={this.state.Smove}
                                                  onChange={this.handleChange} />O</div>
                </div>
                {/*<div className="switch">*/}
                    {/*<input type="checkbox" id="switch" className="switch-check"/>*/}
                    {/*<label htmlFor="switch" className="switch-label">*/}
                        {/*First step*/}
                        {/*<span className="switch-slider switch-slider-on"></span>*/}
                        {/*<span className="switch-slider switch-slider-"></span>*/}
                    {/*</label>*/}
                {/*</div>*/}
                <div className="status">
                {status}
                </div>
            </div>
        </div>
      </div>
    );
  }
}

 function calculateWinner(grids) {

    console.log(grids)
 }
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (grids[a] && grids[a] === grids[b] && grids[a] === grids[c]) {
//             return grids[a];
//         }
//     }
//     return console.log(grids);
// }
export default App;