import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getTodo, deleteTodo, addTodo, completeTodo, setTodo} from './reducer'

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            showTodo: false
        }
        // this.showTodo = this.showTodo.bind(this);
    }

    componentDidMount(){
        this.props.getTodo();
    }

    handleName(string){
        this.setState({name: string});
    }

    deleteTodo(id){
        this.props.deleteTodo(id);
    }

    addTodo(){
        if(this.state.name){
            this.props.addTodo(this.state.name);
            this.setState({name: ''});
        }
    }

    completeTodo(id){
        this.props.completeTodo(id);
    }

    setTodo(id){
        this.props.setTodo(this.props.todoItems[id]);
        localStorage.setItem('todo',JSON.stringify(this.props.todoItems));
    }

    showTodo(){
        this.setState({showTodo: !this.state.showTodo});
    }



    render(){
        let allTodos = 'loading';
        this.props.todoItems ? allTodos = this.props.todoItems.map((v, i, a) => {
            return (
                <div key={i} className={v.completed ? "completed-todo-item" : "todo-item"}>
                    <a href={`/#/todo/${i}`}><p className="todo-item-title" onClick={() => {this.setTodo(i)}}>{v.title}</p></a>
                    <div className="todo-complete-delete">
                        {v.completed ? null : <button className="todo-complete-button" onClick={() => this.completeTodo(v.id)}>Complete</button>}
                        <a className="delete-todo" onClick={() => this.deleteTodo(v.id)}>X</a>
                    </div>
                </div>
            )
        }) : "loading";

        return (
            <div className="body">
                <div className="header">
                    <h3 onClick={this.showTodo}>To-Do:</h3>
                    <input className="new-todo-input" value={this.state.name} defaultvalue="" onChange={ e => {this.handleName(e.target.value) }}/>
                    <button className="add-new-todo" onClick={() => this.addTodo()}>Add New Todo</button>
                </div>
                <div className="todo-items">
                    {allTodos}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        todoItems: state.todoItems
    }
}

export default connect(mapStateToProps, {getTodo, deleteTodo, addTodo, completeTodo, setTodo})(Home)