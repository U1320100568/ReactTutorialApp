import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { thisExpression } from '@babel/types';

// class Square extends React.Component {
//     shouldComponentUpdate(nextProps,nextState){
//         if(nextProps.value !== this.props.value){
//             return true;
//         }
//         return false;
//     }
//     render() {
//         console.log("square render")
//       return (
//         <button 
//             className="square" 
//             onClick={() => this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//         );
//       }
//   }
function Square(props) {

  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const _squares = current.squares.slice();

    if (calculateWinner(_squares) || _squares[i]) { return; }

    _squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({ squares: _squares, }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }
  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    const moves = history.map((step, move) => {
      const desc = move ?
        'go to Step #' + move :
        'go to game start '
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner is : ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// =========================================
// practice extract component
class Picture extends React.Component {
  render() {
    return (
      <img
        src={this.props.user.PictureUrl}
        alt={this.props.user.name}
      ></img>
    );
  }
}
class UserInfo extends React.Component {
  render() {
    return (
      <div className="UserInfo">
        <Picture user={this.props.author}></Picture>
        <div className="UserInfo-name">
          {this.props.author.name}
        </div>
      </div>
    );
  }
}
class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        <UserInfo author={this.props.author}></UserInfo>
        <div className="Comment-text">
          {this.props.text}
        </div>
        <div className="Comment-date">
          {this.props.date}
        </div>
      </div>
    );
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  add() {
    this.setState({
      count: this.state.count + this.props.diff
    })
  }
  render() {
    return (
      <div>
        <span>
          {this.state.count}
        </span>
        <button onClick={() => this.add()}>+{this.props.diff}</button>
      </div>
    );
  }
}
class Adder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
  }

  render() {
    let { value } = this.state;
    return (
      <div>
        <h2>{value}</h2>
        <button onClick={this._add}>Add 2</button>
      </div>
    )
  }

  _add = () => {
    this.setState((state) => ({
      value: state.value + 1
    }))
    this.setState((state) => ({
      value: state.value + 1
    }))

    // 因為異步的批次修改所以fail
    // this.setState({
    //   value: this.state.value + 1
    // })
    // this.setState({
    //   value: this.state.value + 1
    // })
  }
}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString()
    }
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  }
  //component 建立完成
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick()
      , 1000);
  }
  //component 即將移除 
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <div>Time is {this.state.time}</div>
    )
  }
}
//conditional rendering
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    }
  }
  _toggleLoginButton = () => {
    this.setState((state) => ({
      isLogin: !state.isLogin
    }))
  }
  _buttonElement = () => {
    if (this.state.isLogin) {
      return (<button onClick={this._toggleLoginButton}>登出</button>)
    } else {
      return (<button onClick={this._toggleLoginButton}>登入</button>)
    }
  }
  render() {
    return (
      <div>
        {this.state.isLogin ? "welcome!" : "login please"}
        {this._buttonElement()}
      </div>
    )
  }
}

function ListItem(props){
  return (
    <li >{props.value}</li>
  );
}
function List (props){
  const nums = Array.from(Array(8).keys()).map( x => x+1);
  let list = nums.map(x => 
    <ListItem value={x} key={x}/> //  注意此處key
  )
  return (
    <ul>
      {list}
    </ul>
  )
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

var author = {
  name: 'Roy',
  PictureUrl: '/assets/Picture.jpg'
};
var text = 'Description';
var date = new Date().toDateString();



//test
ReactDOM.render(
  <div>

    <Comment author={author} text={text} date={date} />
    ----------------------------------------------------------
    <Counter diff={5} />
    ----------------------------------------------------------
    <Adder />
    ----------------------------------------------------------
    <Clock />
    ----------------------------------------------------------
    <Login />
    ----------------------------------------------------------
    <List/>
  </div>
  ,
  document.querySelector('#test')
);



//Helper
function calculateWinner(squares) {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (var i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}