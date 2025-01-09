import { 
    ADD_TODO, 
    CANCEL_EDIT, 
    DELETE_TODO, 
    EDIT_TODO, 
    SET_TODO_INPUT, 
    TICK_TODO, 
    UPDATE_TODO 
} from "./constants";

let initInput = JSON.parse(localStorage.getItem("todoList")) ?? []
let initChoice = JSON.parse(localStorage.getItem("choiceList")) ?? []

// console.log(initInput, initChoice)

const initState = {
    todoInput: '',
    todos: initInput,
    choices: initChoice,
}

function reducer(state, action) {
    switch(action.type){
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: action.payload
            }
        case ADD_TODO:
            let newIndex = state.todos.length
            if(newIndex !== 0) newIndex = state.todos.at(-1).index + 1
            const newTodo = [...state.todos, {
                index: newIndex,
                content: action.payload
            }] 

            localStorage.setItem("todoList", JSON.stringify(newTodo))

            return {
                ...state,
                todos: newTodo
            }
        case TICK_TODO:
            let newChoice = [...state.choices]
            if (newChoice.includes(action.payload)) {
                newChoice = newChoice.filter(val => val !== parseInt(action.payload))
            } else {
                newChoice = [...newChoice, parseInt(action.payload)]
            }

            localStorage.setItem("choiceList", JSON.stringify(newChoice))

            return {
                ...state,
                choices: newChoice
            }
        case EDIT_TODO:
            let currentTodo = [...state.todos].find(todo => todo.index === action.payload)
            return {
                ...state,
                todoInput: currentTodo.content
            }
        case UPDATE_TODO:
            let newUpdateTodos = state.todos.find(todo => todo.index === action.payload);
            newUpdateTodos.content = state.todoInput

            localStorage.setItem("todoList", JSON.stringify(state.todos))

            return state
        case CANCEL_EDIT:
            return state
        case DELETE_TODO:
            let newDeleteTodos = [...state.todos]
            let newDeleteChoices = [...state.choices]

            if (newDeleteChoices.includes(action.payload)) {
                newDeleteChoices = newDeleteChoices.filter(idx => idx !== action.payload)
            }
            newDeleteTodos = newDeleteTodos.filter(todo => todo.index !== action.payload)

            localStorage.setItem("todoList", JSON.stringify(newDeleteTodos))
            localStorage.setItem("choiceList", JSON.stringify(newDeleteChoices))

            return {
                ...state,
                todos: newDeleteTodos,
                choices: newDeleteChoices
            }
        default:
            throw new Error('Too zesty to be true')
    }
}

export { initState }
export default reducer