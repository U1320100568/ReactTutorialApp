import React from 'react'
import PropTypes from 'prop-types'
import { link } from 'fs';
// import { on } from 'cluster';
const Todo = ({onClick, completed, text }) => {
    return (<li
    onClick={onClick}
    style={{
        textDecoration: completed ? 'line-through' : 'none'
    }}
    >{text}</li>);
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed : PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}
const TodoList = ({todos, onTodoClick}) => (
<ul>
    {
        todos.map(todo => (
            <Todo 
                onClick={onTodoClick}
                key={todo.id}
                {...todo}/>
        ))
    }
</ul>
) 
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.number.isRequired,
        text:PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })).isRequired,
    onTodoClick: PropTypes.func.isRequired
}
const Link = (active, children, onClick) => {
    const href="#";
    if(active){
        return (<span>{children}</span>)
    }
    return (<a href={href}
               onClick={e => {
                   e.preventDafault();
                   onClick();
               }} 
               >{children}</a>)
}
Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children:PropTypes.node.isRequired,
    onClick:PropTypes.func.isRequired
}
const Footer = () => (
    <p>
        {/* Show: 
        {" "}
        <FilterLink filter={SHOW_ALL}>
            ALL
        </FilterLink>
        {", "}
        <FilterLink filter={SHOW_ACTIVE}>
            ACTIVE
        </FilterLink>
        {", "}
        <FilterLink filter={SHOW_COMPLETE}>
            COMPLETE
        </FilterLink> */}
    </p>
)

export {Todo,TodoList,Link,Footer};

