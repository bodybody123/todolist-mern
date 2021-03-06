import todoListDataService from '../services/todolist.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Notes(props) {
    const initialTodoState = {
        id: null,
        text: "",
        date: {},
    }
    const [todo, setTodo] = useState(initialTodoState);

    const getTodo = (id) => {
        todoListDataService.get(id)
        .then(response => {
            console.log(response.data);
            setTodo(response.data);
        })
        .catch(e => {
            console.error(e);
        })
    }

    useEffect(() => {
        getTodo(props.match.params.id)
    },[props.match.params.id])

    const deleteTodo = (todoId) => {
        todoListDataService.deleteTodo(todoId);
    }

    return (
        <div className="note_list">
            <div className="note">
                <div className="note_text">
                    {todo.text}
                </div>
                <div className="ico_action">
                    <div className="ico ico__delete">
                        <Link
                            to='/'
                            className="btn"
                            onClick={() => {
                                deleteTodo(todo._id)
                            }}>
                            <svg className="delete__svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </Link>
                    </div>
                    <div className="ico ico__edit">
                        <Link to={
                            { pathname: `/todos/${todo.match.params.id}/update`,
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
        </div>
    );
}