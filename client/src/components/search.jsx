import { useState } from "react";
import FormData from 'form-data';
import todolistDataService from "../services/todolist";

export default function Search(props) {
    let initialTodoState = '';

    let editing = false;
    
    if(props.location.state && props.location.state.currentTodo) {
        editing = true;
        initialTodoState = props.location.state.currentTodo.text;
    }

    const [todo, setTodo] = useState(initialTodoState);
    const [file, setFile] = useState(null);

    const handleInputChange = event => {
        setTodo(event.target.value);
    }
    const handleFileChange = event => {
        setFile(event.target.files[0]);
    }
    
    let saveTodo = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('id', props.match.params.id);
        formData.append('text', todo)
        formData.append('file', file);

        
        if(editing){
            todolistDataService.updateTodo(formData, {
                headers:{ 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,}
              })
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }
        else{
            todolistDataService.createTodo(formData)
            .then(response => {
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
            <form onSubmit={saveTodo} encType="multipart/form-data">
                <div className="input_group">
                <div className="search-box">
                        <label htmlFor="image">image: </label>
                        <input 
                            id="image" 
                            type="file" 
                            name="file"
                            onChange={handleFileChange}/>
                    </div>
                </div>
                <div className="input_group">
                    <div className="search-box">
                        <input
                            className="input__box"
                            type="text"
                            placeholder="Type here..."
                            required
                            value={todo}
                            onChange={handleInputChange}/>
                        <button
                            className="btn"
                            type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}