const route = [
    {text: 'tic tac toe',link: '#game'},
    {text: 'user information',link: '#'},
    {text: 'adder & clock',link: '#'},
    {text: 'conditional render',link: '#'},
    {text: 'list',link: '#'},
    {text: 'form',link: '#'},
    {text: 'temperature calculator',link: '#'},
    {text: 'filterable product table',link: '#filterTable'},
    {text: 'styled component',link: '#styled'},
  ];
const todos =[
    {
      id:1,
      text:'Go to school',
      completed:true
    },
    {
      id:2,
      text:'Eat lunch',
      completed:false
    },
    {
      id:3,
      text:'Transfer money to mom',
      completed:false
    },
    {
      id:4,
      text:'Book bus ticket',
      completed:false
    }
  ];
const winLine =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
const product = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];


const res = {
    getRoute : () => route,
    getTodos : () => todos,
    getWinLine : () => winLine,
    getProduct : () => product,
}
export default res