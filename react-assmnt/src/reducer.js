import axios from 'axios';

const initialState = {
    todoItems: [],
    todo: {}
}

const GET_TODO = "GET_TODO";
const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SET_TODO = "SET_TODO"

export function getTodo(){
    const request = axios.get('https://practiceapi.devmountain.com/api/tasks')
    .then( res => {
        return res.data
    })
    return {
        type: GET_TODO,
        payload: request
    }
};

export function addTodo(string){
    const request = axios.post(`https://practiceapi.devmountain.com/api/tasks`, {"title": `${string}`})
    .then( res => {
        return res.data
    })
    return {
        type: ADD_TODO,
        payload: request
    }
};

export function editTodo(id, title, description) {
    const request = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {
        "title": `${title}`,
        "description":`${description}`
    })
    .then( res => {
        return res.data
    })
    return {
        type: EDIT_TODO,
        payload: request
    }
};

export function completeTodo(id) {
    const request = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: COMPLETE_TODO,
        payload: request
    }
};

export function deleteTodo(id){
    const request = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: DELETE_TODO,
        payload: request
    }
};

export function setTodo(obj){
    return {
        type: SET_TODO,
        payload: obj
    }
};

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_TODO + "_FULFILLED":
            return Object.assign({}, state, {todoItems: action.payload})
        case ADD_TODO + "_FULFILLED":
            return Object.assign({}, state, {todoItems: action.payload})
        case EDIT_TODO + "_FULFILLED":
            return Object.assign({}, state, {todoItems: action.payload})
        case COMPLETE_TODO + "_FULFILLED":
            return Object.assign({}, state, {todoItems: action.payload})
        case DELETE_TODO + "_FULFILLED":
            return Object.assign({}, state, {todoItems: action.payload})
        case SET_TODO + "_FULFILLED":
            return Object.assign({}, state, {todo: action.payload})
        default: return state;
    }
}