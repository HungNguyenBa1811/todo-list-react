import { ADD_TODO, CANCEL_EDIT, DELETE_TODO, EDIT_TODO, SET_TODO_INPUT, TICK_TODO, UPDATE_TODO } from "./constants";

export const setTodoInput = payload => ({
    type: SET_TODO_INPUT,
    payload
})

export const addTodo = payload => ({
    type: ADD_TODO,
    payload
})

export const tickTodo = payload => ({
    type: TICK_TODO,
    payload
})

export const editTodo = payload => ({
    type: EDIT_TODO,
    payload
})

export const updateTodo = payload => ({
    type: UPDATE_TODO,
    payload
})

export const cancelEdit = payload => ({
    type: CANCEL_EDIT,
    payload
})

export const deleteTodo = payload => ({
    type: DELETE_TODO,
    payload
})