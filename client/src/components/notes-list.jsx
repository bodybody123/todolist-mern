import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import todoListDataService from '../services/todolist.js';
import Search from './search.jsx';

export default function NotesList(props) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        retrieveTODO();
    }, [])

    const retrieveTODO = () => {
        todoListDataService.getAll()
        .then(response => {
            console.log(response.data);
            setTodos(response.data);
        })
        .catch(e => {
            console.error(e);
        })
    }

    const refreshList = () => {
        retrieveTODO();
    }

    const deleteTodo = (todoId) => {
        todoListDataService.deleteTodo(todoId)
        .then(() => {
            refreshList();
        })
    }

    return (
        <div className="note-list">
            {todos.map((todo, index) => {
                return(
                    todo ? (
                    <div key={index} className="note">
                        <div className="note_text">
                            {todo.text}
                        </div>
                        <div className="ico_action">
                            <div className="ico ico__delete">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        deleteTodo(todo._id)
                                    }}>
                                    <svg className="delete__svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                </button>
                            </div>
                            <div className="ico ico__edit">
                                <Link to={
                                    { pathname: `/todos/${todo._id}/update`,
                                      state: {
                                          currentTodo : todo,
                                      }
                                    }
                                    }>
                                    <svg className="edit__svg" xmlns="http://www.w3.org/2 000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div>
                            Create what to do now
                        </div>
                    )
                );
            })}

            <div className="add">
                <Link
                    to='/todos/create'
                    render={() => <Search/>}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </Link>
            </div>
        </div>
    );
}