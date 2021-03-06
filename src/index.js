import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.css';
import { tsExpressionWithTypeArguments } from '@babel/types';
import styled ,{keyframes} from 'styled-components';
import {TodoList} from './components/todo-list'
import res from './resource/resource'
import {StyleRoot,StyledButton,TomatoButton,StyledSubmit,ContentBox,ContentItem} from './styles/global'
// import { thisExpression } from '@babel/types';
function Navbar(){
  const links = res.getRoute();
  const linkElements = links.map(x => <li key={x.text}><a href={x.link}>{x.text}</a></li>)
  return (
    <div className="left">
      <ul>
        {linkElements}
      </ul>
    </div>
  )
}
//#region global style

// function ReverseButton(props){
//   const text = props.children.split('').reverse();
//   return <button >{text}</button>
// }

function ReverseButton(props){

  const Styled = styled.button`
    border-radius:3px;
    border:solid 2px lightslategray;
    color:lightslategray;
    padding: 0.5em 1em;
    margin: 0 1em;
    outline: 0;
  `;
  const Reserve = (props) =>{
    const text = props.children.split('').reverse();
    return <button >{text}</button>
  }

  return <Styled as={Reserve} {...props}></Styled>
}


//#region list
const StyleListParent = styled.ul`
  list-style-type: none;
  width:100px;
`;
const StyleListItem = styled.li`
  border-left: solid 2px chocolate;
  margin-bottom: 1em;
  padding: 0 1em;
  line-height:0.9;  
    &:hover {
      background-color: chocolate;
    }
    a {
      text-decoration: none;
      color: cadetblue;
    }
    a:hover {
      color:white;
    }
    & ~ &:hover{
      background-color: darkslateblue;

      ::after{
        font-size:1.4em;
        margin-left:0.25em;
        float:right;
        content:'🚀';
      }
    }
    
    & + &:hover{
      background-color: darkslategray;
    }
    .sunday &:hover {
      background-color: olive;  
    } 
`;
const SpecialListItem = styled.li`
    border-left: solid 2px chocolate;
    margin-bottom: 1em;
    padding: 0 1em;
    line-height:0.9;  
    a {
      color: goldenrod;
    }
`;
function Weekday(props){
  const link = '#'
  return (
    <StyleListParent>
      <StyleListItem><a href={link}>星期一</a></StyleListItem>
      <StyleListItem><a href={link}>星期二</a></StyleListItem>
      <StyleListItem><a href={link}>星期三</a></StyleListItem>
      <StyleListItem className="tomato"><a href={link}>星期四</a></StyleListItem>
      <SpecialListItem><a href={link}>星期五</a></SpecialListItem>
      <StyleListItem><a href={link}>星期六</a></StyleListItem>
      <div className="sunday"><StyleListItem><a href={link}>星期日</a></StyleListItem></div>
    </StyleListParent>
  )
}
//#endregion
//#region animation
const aniRotate = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  display:inline-block;
  padding:1em;
  font-size:1.5em;
  animation: ${aniRotate } 4s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
`;
//#endregion




//#endregion

//#region tutorail tic tac toe
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
          <StyledButton onClick={() => this.jumpTo(move)}>
            {desc}
          </StyledButton>
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
      <div className="game" id={this.props.id}>
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
//#endregion 
// =========================================
//#region practice extract component
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
//#endregion
//#region practice extract component 2 
function BoilingVerdict(props){
  if(props.celsius >= 100){
    return <p>The water would boil</p>
  }
  return <p>The water would not boil</p>
}

function toCelsius(fahrenheit){
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius){
  return (celsius * 9 / 5) + 32;
}
function tryConvert(value, converter){
  var parsed = parseFloat(value,10);
  return isNaN(parsed) ? '': converter(parsed);
}
class TemperatureInput extends React.Component{
  scaleName = {
    c : 'Celsius',
    f : 'Fehrenheit'
  }
  _handleChange = (event) => {
    this.props.onTemperatureChange(event.target.value)
  }
  
  render(){
    const scale = this.props.scale;
    const temperature = this.props.temperature

    return (
      <fieldset>
      <legend>Enter the temperature in {this.scaleName[scale]} :</legend>
      <input 
        type="text" 
        value={temperature}
        onChange={this._handleChange}
        />
    </fieldset>
    )
  }
}
class CalculateTemperature extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      temperature : '',
      scale : 'c'
    }
  }
  
  _handleFahrenheitChange = (value) => {
    this.setState({
      temperature: value,
      scale: 'f'
    })
  }
  _handleCelsiusChange = (value) => {
    this.setState({
      temperature: value,
      scale:'c'
    })
  }
  render(){
    const temperature = this.state.temperature;
    const fahrenheit = this.state.scale === 'c' ? tryConvert(temperature,toFahrenheit) : temperature;
    const celsius = this.state.scale === 'f' ? tryConvert(temperature,toCelsius) : temperature;
    return (
      <div>
        <TemperatureInput 
          scale="c"
          temperature= {celsius}
          onTemperatureChange ={this._handleCelsiusChange}/>
        <TemperatureInput 
          scale="f"
          temperature= {fahrenheit}
          onTemperatureChange ={this._handleFahrenheitChange}/>
        <BoilingVerdict celsius={celsius}/>
      </div>
    )
  }
}
//#endregion

//#region practice set state, life circle
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
        <StyledButton onClick={() => this.add()}>+{this.props.diff}</StyledButton>
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
        <StyledButton onClick={this._add}>Add 2</StyledButton>
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
//#endregion
//#region conditional rendering
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
      return (<StyledButton onClick={this._toggleLoginButton} text="">登出</StyledButton>)
    } else {
      return (<StyledButton onClick={this._toggleLoginButton}text="">登入</StyledButton>)
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
//#endregion
//#region practice list 
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
//#endregion
//#region practice form ,controlled element
class NameForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name : '',
      birthday:new Date('1990-01-01').toISOString().slice(0,10)
    }
  }
  _handleSubmit = (event) => {
    event.preventDefault();
    alert("wait !!");
  }
  _handleChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    switch (name){
      case "name":
        value = value.toUpperCase();
        break;
      case "birthday":
      default:
        break;
    }
    this.setState({
      [name] : value
    });
  }
  render(){
    return (
      <form onSubmit={this._handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} name="name" onChange={this._handleChange}/>
        </label>
        <label>
          Birth:
          <input type="date" value={this.state.birthday} name="birthday" onChange={this._handleChange}/>
        </label>
        <StyledSubmit type="submit" value="Submit" />
      </form>
    )
  }
}

class SelectForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fruit:'apple'
    }
  }
  _handleSubmit=(event) => {
    event.preventDefault();
  }
  _handleChange = (event) =>{
    this.setState({
      fruit:event.target.value
    })
  }
      
  render(){
    return (
    <form onSubmit={this._handleSubmit}>
      <label>
        <select value={this.state.fruit} onChange={this._handleChange}>
          <option value="apple" >APPLE</option>
          <option value="banana" >BANANA</option>
          <option value="peach">PEACH</option>
          <option value="watermelon">WATER MELON</option>
        </select>
      </label>
      <StyledSubmit type="submit" value="Submit"/>
    </form>
    )
  }
}
//#endregion
//#region Thinking of process
const products = res.getProduct();
class FilterableProductTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filterText:'',
      inStockOnly:false
    }
  }
  _handleStockCheck = (value) => {
    this.setState({
      inStockOnly:value
    })
  }
  _handleFilterTextChange = (value) => {
    this.setState({
      filterText: value
    })
  }
  render(){
    return (
    <div id={this.props.id}>
      <SearchBar 
        filterText={this.state.filterText} 
        inStockOnly={this.state.inStockOnly}
        handleStockCheck={this._handleStockCheck}
        handleFilterTextChange={this._handleFilterTextChange}/>
      <ProductTable 
        products={this.props.products} 
        filterText={this.state.filterText} 
        inStockOnly={this.state.inStockOnly}/>
    </div>
    );
  }
}
function SearchBar(props){
  let _onChange = (event) =>{
    props.handleFilterTextChange(event.target.value);
  }
  let _onCheck = (event) => {
    props.handleStockCheck(event.target.checked);
  }

  return (
    <div>
      <div>
        <input type="text" value={props.filterText} onChange={_onChange} placeholder="Search..."/>
      </div>
      <label>
        <input type="checkbox" checked={props.inStockOnly} onChange={_onCheck}/>
        only show the product in stock
      </label>
    </div>
  );
}
function ProductTable(props){
  const products = props.products;
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  const categories = products.map(x => x.category)
                              .filter((val,idx,self) =>{
                                return self.indexOf(val) === idx;
                              })
  let row = [];
  categories.forEach(x => {
    const categoryHead = (<ProductCategoryRow 
                            category={x} 
                            key={x}/>);
    
    const product = products.filter(y => y.category === x)
                            .filter(y => {
                              //filter search text
                              let text = y.name.indexOf(filterText) !== -1
                              //filter stock
                              let stock = inStockOnly ? y.stocked : true
                              return text && stock;
                            }) //filter
                            .reduce((el,y) => {
                              el.push(<ProductRow 
                                        product={y}
                                        key={y.name}/>)
                              return  el;
                            },[])
    if(typeof product !== 'undefined' && product.length > 0){
      row.push(categoryHead);
      row.push(product);
    }                

  })
  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Price</th></tr>
      </thead>
      <tbody>
        {row}
      </tbody>
    </table>
  );
  
}
function ProductCategoryRow(props){
  return (
    <tr>
      <td 
        colSpan="2"
        style={
          {fontWeight:"bolder"}
        }
      >{props.category}
      </td>
    </tr>
  );

}
function ProductRow(props){
  const {name,price,stocked} = props.product ;
  const _name = !stocked ? 
                <span style={{color:'red'}}>
                  {name}
                </span> 
                : name
  return (
    <tr><td>{_name}</td><td>{price}</td></tr>
  );

}
//#endregion
//#region Redux
function APP(){
  const onTodoClick = () => {
  }
  const todos = res.getTodos();
  return <TodoList
            onTodoClick={onTodoClick}
            todos={todos}
  ></TodoList>

}
//#endregion

  

// ========================================


//Data
var author = {
  name: 'Roy',
  PictureUrl: '/assets/Picture.jpg'
};
var text = 'Description';
var date = new Date().toDateString();



//DOM render
ReactDOM.render(
  <StyleRoot>
    <Navbar/>

    <ContentBox className="right">
      <ContentItem>
        <Game id="game"/>
      </ContentItem>
      
      <ContentItem>
        <Comment id="info" author={author} text={text} date={date} />
      </ContentItem>
      
      <ContentItem>
        <Counter id="adder-clock" diff={5} />
      </ContentItem>
      
      <ContentItem>
        <Adder />
      </ContentItem>
      
      <ContentItem>
        <Clock />
      </ContentItem>
      
      <ContentItem>
        <Login id="login"/>
      </ContentItem>
      
      <ContentItem>
        <List id="list"/>
      </ContentItem>
      
      <ContentItem>
        <NameForm id="form"/>
      </ContentItem>
      
      <ContentItem>
        <SelectForm />
      </ContentItem>
      
      <ContentItem>
        <CalculateTemperature id="temperature"/>
      </ContentItem>
      
      <ContentItem>
        <FilterableProductTable id="filterTable" products={products}/>
      </ContentItem>
      
      <ContentItem>
        <div id="styled">
          <StyledButton>normal</StyledButton><StyledButton primary>primary</StyledButton>
        </div>
        <div>
          <TomatoButton >tomato</TomatoButton><TomatoButton  primary>primary</TomatoButton>
        </div>
        <div>
          <ReverseButton>reverse</ReverseButton>
        </div>
      </ContentItem>
      <ContentItem>
        <Weekday/>
      </ContentItem>
      <ContentItem>
        Animation 
        <br/>
        <Rotate><span>🐋</span></Rotate>
      </ContentItem>
      <ContentItem>
        <APP/>
      </ContentItem>
      
    </ContentBox>
  </StyleRoot>

  ,
  document.querySelector('#root')
);



//Helper
function calculateWinner(squares) {
  const line = res.getWinLine();
  for (var i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}