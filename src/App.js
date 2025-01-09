import { useRef, useState } from "react";
import { actions, useStore } from './Store'
// import './Styles/lightdark.css'
import './Styles/App.css';
import Clock from "./Components/Clock";
import Footer from "./Components/Footer";


function App () {
    // document.documentElement.classList.toggle('dark')
    const [state, dispatch] = useStore()
    const { todoInput, todos, choices } = state
    const [editIndex, setEditIndex] = useState(null)
    const inputRef = useRef();

    const handleAdd = () => {
        dispatch(actions.addTodo(todoInput))
        dispatch(actions.setTodoInput(""))
        inputRef.current.focus()
    }

    const handleTick = (idx) => {
        dispatch(actions.tickTodo(idx))
    }

    const handleUpdate = (idx) => {
        dispatch(actions.updateTodo(idx))
        dispatch(actions.setTodoInput(""))
        setEditIndex(null)
        inputRef.current.focus()
    }

    const handleCancel = () => {
        dispatch(actions.cancelEdit())
        dispatch(actions.setTodoInput(""))
        setEditIndex(null)
        inputRef.current.focus()
    }

    const handleEdit = (idx) => {
        dispatch(actions.editTodo(idx))
        setEditIndex(idx)
        inputRef.current.focus()
    }

    const handleDelete = (idx) => {
        dispatch(actions.deleteTodo(idx))
        setEditIndex(null)
    }

    return (<>
        <div className="App">
            <Clock />
            <div className="input-wrapper">
                <div className="input-group">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="17" y1="10" x2="3" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />  
                        <line x1="21" y1="14" x2="3" y2="14" />  
                        <line x1="17" y1="18" x2="3" y2="18" />
                    </svg>
                    <input 
                        type="text"
                        className="input"
                        ref={inputRef}
                        value={todoInput}
                        placeholder="Add a task..."
                        onChange={e => {
                            dispatch(actions.setTodoInput(e.target.value))
                        }}
                    />
                </div>
                <div className="btn-group">
                    {
                        (editIndex === null) && 
                            <button
                                disabled={todoInput === ''}
                                onClick={handleAdd}
                            >
                                +
                            </button>
                    }
                    {
                        !(editIndex === null) && (
                            <>
                                <button
                                    onClick={() => handleUpdate(editIndex)}
                                >
                                    +
                                </button>
                                <button
                                    onClick={handleCancel}
                                >
                                    -
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
            


            <ul className="list">
                {todos.map(({ index, content }, id) => (
                    <li key={id}>
                        <div className="content-group">
                            <input 
                                type="checkbox" 
                                className="accent"
                                checked={choices.includes(index)}
                                onChange={() => handleTick(index)}
                            />
                            <span>
                                {content}
                            </span>
                        </div>
                        <div className="btn-group">
                            <button
                                className="btn-edit"
                                disabled={editIndex !== null}
                                onClick={() => handleEdit(index)}
                            >
                                {(editIndex === null) ? "Edit" : "Editing..."}
                            </button>
                            <button
                                className="btn-delete"
                                disabled={editIndex !== null}
                                onClick={() => handleDelete(index)}
                            >
                                &times;
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <Footer />
    </>)
}

export default App