import { useState } from "react";
import todolistDataService from "../services/todolist";

export default function Search(props) {
    let initialTodoState = '';

    let editing = false;
    
    if(props.location.state && props.location.state.currentTodo) {
        editing = true;
        initialTodoState = props.location.state.currentTodo.text;
    }

    const [todo, setTodo] = useState(initialTodoState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        setTodo(event.target.value);
    }
    
    let saveTodo = () => {
        var data = {
            id: props.match.params.id,
            text: todo
        }
        if(editing){
            todolistDataService.updateTodo(data)
            .then(response => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }
        else{
            todolistDataService.createTodo(data)
            .then(response => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }

        window.location.href = '/';
    };


    return(
        <div>
            <h6>{editing ? 'Edit' : 'Create'}</h6>
            <div className="search-box">
                <div className="input_group">
                    <input
                        className="input__box"
                        type="text"
                        placeholder="Type here..."
                        required
                        value={todo}
                        onChange={handleInputChange}/>
                    <button
                        onClick={saveTodo} 
                        className="btn"
                        type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}