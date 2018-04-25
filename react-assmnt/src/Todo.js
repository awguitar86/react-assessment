import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getTodo, deleteTodo, addTodo, completeTodo, editTodo} from './reducer'

class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: {}
        }
    }

    componentDidMount(){
        let cat = JSON.parse(localStorage.getItem('todo'));
        this.setState({todo: cat[this.props.match.params.id]});
    }

    handleTitle(string){
        let todo = this.state.todo;
        todo.title = string;
        this.setState({todo: todo});
    }

    handleDescription(string){
        let todo = this.state.todo;
        todo.description = string;
        this.setState({todo: todo});
    }

    deleteTodo(i){
        this.props.deleteTodo(i)
    }

    completeTodo(i){
        this.props.completeTodo(i);
    }

    editTodo(){
        this.props.editTodo(this.state.todo.id, this.state.todo.title, this.state.todo.description);
    }

    render(){
        return (
            <div className="todo-body">
                <div className="todo-wrap">
                    <a href="/#/">{'< Back to main page'}</a>
                    <div className="title">
                        <div className="todo-title-wrap">
                            <h5 className="todo-title">Task</h5>
                            <input className="todo-title-input" value={this.state.todo.title} onChange={e => {this.handleTitle(e.target.value)}}/>
                        </div>
                        {this.state.todo.completed ? null : <a href="/#/"><button className="complete-button" onClick={() => this.completeTodo(this.state.todo.id)}>Complete</button></a>}
                    </div>
                    <div className="description">
                        <h5 className="todo-description">Description</h5>
                        <input className="todo-description-input" value={this.state.todo.description} onChange={e => {this.handleDescription(e.target.value)}}/>
                    </div>
                    <div className="buttons">
                        <a href="/#/"><button className="save" onClick={() => this.editTodo()}>Save</button></a>
                        <a href="/#/"><button className="cancel">Cancel</button></a>
                        <a href="/#/"><button className="delete" onClick={() => this.deleteTodo(this.state.todo.id)}>Delete</button></a>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        todoItems: state.todos
    }
}

export default connect(mapStateToProps, {getTodo, deleteTodo, addTodo, completeTodo, editTodo})(Todo)