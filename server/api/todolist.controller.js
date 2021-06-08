import TodoListDAO from '../dao/todolistDAO.js';

/**
 * * This Files controlls the Request from the client to the server
 * 
 * ! ERROR tracker
 * ! Unable to update
 */

export default class TodoListController {
    static async test(req, res) {
        res.json({ message: 'success'})
    }

    /**
     * * Control Request for Read for all
     */
    static async apiGetTodoList(req, res) {
        let response = {};

        const todoList = await TodoListDAO.getTodo();

        response = todoList;

        res.json(response);
    }

    static async apiGetTodoListById(req, res) {
        try{
            let id = req.params.id || {};
            let todoList = await TodoListDAO.getTodoById(id);
            if(!todoList){
                res.status(404).json({ error: 'ctrl not found' });
                return;
            }
            res.json(todoList);
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
      }  
    }
    /**
     * * Control Create request
     */
    static async apiPostTodoList(req, res) {
        try {
            const text = req.body.text;
            const date = new Date();

            const todoResponses = await TodoListDAO.addTodo(
                text,
                date
            );
            res.json({ status: 'success' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }

    /**
     * * Control Update request
     */
    static async apiUpdateTodoList(req, res) {
        try {
            const todoId = req.body.id;
            const text = req.body.text;
            const date = new Date();

            const todoResponse = await TodoListDAO.updateTodo(
                todoId,
                text, 
                date
            );
            
            console.log(`${req}`);
            var { error } = todoResponse;
            if(error){
                res.status(400).json({ error });
            }

            if (todoResponse.modifiedCount === 0) {
                throw new Error(
                  "unable to update todo - user may not be original poster",
                )
            }

            res.json({ status: 'success' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteTodoList(req, res) {
        try{
            const todoId = req.query.id;
            console.log(todoId);

            const deleteResponse = await TodoListDAO.deleteTodo(
                todoId,
            )
            res.json({ status: 'success' });
        }
        catch(e){
            res.status(500).json({ error: e.message });
        }
    }
}