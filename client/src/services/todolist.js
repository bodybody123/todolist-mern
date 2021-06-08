import http from '../http-common';

class TodoDataService {
    getAll() {
        return http.get(`/`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    createTodo(data){
        return http.post('/todo', data);
    }
    updateTodo(data){
        return http.put('/todo', data);
    }
    deleteTodo(id){
        console.log(id);
        return http.delete(`/todo?id=${id}`);
    }
}

export default new TodoDataService();